import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from "../_services/session.service";
import { UserService } from "../_services/user.service";
import { ServiceService } from "../_services/service.service";
import { Service } from "../_models/service";
import { User } from "../_models/user";

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

    services: Service[];
    optimizedServices = [];
    servicesToDisplay = [];
    searchForm: FormGroup;
    searchTerm: string;
    searchedByTitle = [];
    searchedByTags = [];
    chips = [];
    searchType: string;
    tagsSearch: boolean;
    isLoggedIn: boolean;
    currentUser: User;

    constructor(
        private sessionService: SessionService,
        private userService: UserService,
        private serviceService: ServiceService
    ) {}

    ngOnInit() {

        // initalizing searchbars
        this.searchForm = new FormGroup({
            query: new FormControl(''),
            tags: new FormControl('')
        })

        this.searchTerm = this.searchForm.get('query').value;

        // getting all services from backend (not suitable for the future)
        this.serviceService.getServices().subscribe(
            (data) => {
                this.services = data;

                // wrapping service into an object which 'adds' the username field
                // to optimize backend calls.
                // optimizedServices.username now holds the username of the service-provider.
                // optimizedServices.service holds the service.
                this.services.forEach(service => {
                    this.userService.getUser(service.userId).subscribe(data => {
                        this.optimizedServices.push({ username: data.username, service: service });
                        this.searchedByTitle = this.optimizedServices;
                        this.searchedByTags = this.optimizedServices;
                        this.displayServices();
                    });
                });
            },
            (err) => {
                console.log("error message: " + err);
            }
        )

        this.searchType = "Title";
        this.tagsSearch = false;

        // checking if logged in.
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }
    }

    // filters our Array and then sets the services array to the services that are left matching the search
    // for now only compares on title
    filterByTitle (){

        this.searchTerm = this.searchForm.get('query').value;
        if (this.searchTerm === "") {
            this.searchedByTitle = this.optimizedServices;
        } else {
            this.searchedByTitle = this.optimizedServices.filter(serviceCard => {
                return (serviceCard.service.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
            });
        }

        this.displayServices();
    }

    // funtction to filter our list by given tags.
    filterByTags(){

        if (this.chips.length === 0) {
            // reset the filtered list if no tags are selected.
            this.searchedByTags = this.optimizedServices;
        } else {
            this.searchedByTags = this.optimizedServices.filter(serviceCard => {
                let hasChip = false;
                this.chips.forEach((chip) =>{
                    if (serviceCard.service.tags.includes(chip)) {
                        hasChip = true;
                    }
                });
                return hasChip;
            });
        }

        this.displayServices();
    }

    // compares both searched lists (title & tags).
    // stores the result of the comparison in servicesToDisplay.
    displayServices() {
        this.servicesToDisplay = this.searchedByTitle.filter(service => {
            return this.searchedByTags.includes(service);
        })
    }

    // parses a tag if a comma "," is found in the tags-searchbar
    tagsParser() {
        const input = this.searchForm.get('tags').value;
        if (input.slice(-1) === ",") {
            this.createChip(input.slice(0, -1));
            this.searchForm.get('tags').setValue("");
        }
    }

    // adds a chip to the local chips (filtered tags) array.
    createChip(chipToAdd) {
        if (!this.chips.includes(chipToAdd)) {
            this.chips.push(chipToAdd);
            this.filterByTags();
        }
    }

    // deletes a chip from the local chips (filtered tags) array.
    deleteChip(chipToDelete) {
        this.chips = this.chips.filter(chip => {
            return chip != chipToDelete;
        })
        this.filterByTags();
    }

    // clears the local chips (filtered tags) array.
    clearTags(){
        this.chips = [];
        this.filterByTags();
    }

    // clears the query-searchbar.
    clearSearch() {
        this.searchForm.get('query').setValue("");
        this.filterByTitle();
    }

    // switches the search mode and displays the according searchbar.
    switchSearch() {
        this.tagsSearch = !this.tagsSearch;
        this.searchType = (this.tagsSearch) ? "Tags" : "Title";
    }

}
