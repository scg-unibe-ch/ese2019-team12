import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';
import { ServiceService } from '../_services/service.service';
import { Service } from '../_models/service';
import { User } from '../_models/user';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

    /**
     * isLoggedIn: boolean, is true if a user is logged in while viewing this page.
     * services: Service[], stores the services fetched from the API.
     * servicesToDisplay: [], stores the services after the searchfilters have been applied.
     * searchForm: FormGroup, the searchbar input.
     * searchTerm: string, the string inputted into the searchbar.
     * searchedByTitle: [], the services resulting from the title filter.
     * searchedByTags: [], the services resulting from the tags filter.
     * chips: [], the tags inputted to display.
     * searchType: string, describes the type of search performed.
     * tagsSearch: boolean, is true if searching by tags.
     * currentUser: User, the user currently logged in.
     * updateMasonryLayout: boolean, to trigger an update on the masonry grid.
     */
    isLoggedIn: boolean;
    services: Service[];
    servicesToDisplay = [];
    searchForm: FormGroup;
    searchTerm: string;
    searchedByTitle = [];
    searchedByTags = [];
    chips = [];
    searchType: string;
    tagsSearch: boolean;
    currentUser: User;
    updateMasonryLayout: boolean;

    constructor(
        private sessionService: SessionService,
        private userService: UserService,
        private serviceService: ServiceService
    ) {}

    ngOnInit() {
        // checking if logged in.
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }

        this.updateMasonryLayout = false;

        // initalizing searchbars
        this.searchForm = new FormGroup({
            query: new FormControl(''),
            tags: new FormControl('')
        });

        // sets searchterm to ''
        this.searchTerm = this.searchForm.get('query').value;

        this.searchType = 'Title';
        this.tagsSearch = false;
    }

    // getting all services from backend (not suitable for the future)
    getServices() {
        this.serviceService.getServices().subscribe(
            (data) => {
                this.services = data;
                this.searchedByTitle = this.services;
                this.searchedByTags = this.services;
                this.displayServices();
            },
            (err) => {
                console.log('error message: ' + err);
            }
        );
    }

    /**
     * filters out the services according to inputted title.
     */
    filterByTitle() {

        this.searchTerm = this.searchForm.get('query').value;
        if (this.searchTerm === '') {
            this.searchedByTitle = this.services;
        } else {
            this.searchedByTitle = this.services.filter(service => {
                return (service.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
            });
        }

        this.displayServices();
    }

    /**
     * filters out the services according to inputted tags.
     */
    filterByTags() {

        if (this.chips.length === 0) {
            // reset the filtered list if no tags are selected.
            this.searchedByTags = this.services;
        } else {
            this.searchedByTags = this.services.filter(service => {
                let hasChip = false;
                this.chips.forEach((chip) => {
                    if (service.tags.includes(chip)) {
                        hasChip = true;
                    }
                });
                return hasChip;
            });
        }

        this.displayServices();
    }

    /**
     * compares both searched lists (title & tags).
     * stores the result of the comparison in servicesToDisplay.
     */
    displayServices() {
        this.servicesToDisplay = this.searchedByTitle.filter(service => {
            return this.searchedByTags.includes(service);
        });
        this.updateMasonryLayout = true;
    }

    /**
     * parses a tag if a comma "," is found in the tags-searchbar.
     */
    tagsParser() {
        const input = this.searchForm.get('tags').value;
        if (input.slice(-1) === ',') {
            this.createChip(input.slice(0, -1));
            this.searchForm.get('tags').setValue('');
        }
    }

    /**
     * adds a chip to the local chips (filtered tags) array.
     * @param  chipToAdd string value of the chip to add.
     */
    createChip(chipToAdd) {
        if (!this.chips.includes(chipToAdd)) {
            this.chips.push(chipToAdd);
            this.filterByTags();
        }
    }

    /**
     * deletes a chip from the local chips (filtered tags) array.
     * @param  chipToDelete the chip to remove.
     */
    deleteChip(chipToDelete) {
        this.chips = this.chips.filter(chip => {
            return chip !== chipToDelete;
        });
        this.filterByTags();
    }

    /**
     * clears the local chips (filtered tags) array.
     * @return [description]
     */
    clearTags() {
        this.chips = [];
        this.filterByTags();
    }

    /**
     * clears the query-searchbar.
     * @return [description]
     */
    clearSearch() {
        this.searchForm.get('query').setValue('');
        this.filterByTitle();
    }

    /**
     * switches the search mode and displays the according searchbar.
     * @return [description]
     */
    switchSearch() {
        this.tagsSearch = !this.tagsSearch;
        this.searchType = (this.tagsSearch) ? 'Tags' : 'Title';
    }

    /**
     * fetches services (again) when view is entered.
     */
    ionViewDidEnter() {
        this.updateMasonryLayout = true;
        this.getServices();
    }
}
