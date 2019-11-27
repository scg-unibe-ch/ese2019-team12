import { Component, OnInit } from '@angular/core';
import { Service } from "../_models/service";

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
    // Placeholder for services that will be read from the database
    services = [
        new Service(1, 1, 'john\'s failing business', 'Catering', 1000, ['yum', 'food']),
        new Service(2, 2, 'jane\'s trashy food', 'Catering', 200, ['sexy', 'trashy']),
        new Service(3, 1, 'jim\'s clean up crew', 'Cleaning', 300, ['clean', 'murder']),
        new Service(4, 2, 'Bulletti\'s Bulletten', 'Catering', 5, ['buns','bulletten', 'juicy']),
        new Service(5, 2, 'Yael\'s mad DJ-Set', 'Entertainment', 1000, ['disco', 'mad','sick']),
        new Service(6, 1, 'Lino\'s Club', 'Venue', 2000, ['sexy', 'fancy','place to be']),
        new Service(7, 1, 'Dominik\'s Shoecleaners', 'Cleaning', 30, ['clean', 'shoes','spotless']),
        new Service(8, 1, 'Gelateria di Berna', 'Catering', 5, ['Ice cream','tasty'])
    ];
    tempArray = [];
    searchedList = [];
    searchQuery = "";
    allServices = [];
    chips = [];
    searchTags = "";

    constructor() {}

    ngOnInit() {
        this.allServices = this.services;   //allServices can be replaced by top100 or something the like once it gets too big

    }
    //Function to load all our items so we can work localy (not meant for big lists!)
    initializeItems() {
        this.searchedList = this.allServices; //this.allServices to be replaced with call to backend
    }
    //filters our Array and then sets the services array to the services that are left matching the search
    // for now only compares on title
    filterByTitle (){
        this.initializeItems();
        const searchTerm = this.searchQuery;
        if (!searchTerm) {
            this.services = this.allServices;
            return;
        }
        //filtering our array of possible services by title
        this.searchedList = this.searchedList.filter(service => {
            if (service.title && searchTerm) {
                if (service.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }return false;
            }
        });
        //setting services to searchresult
        this.services = this.searchedList;
    }
    //funtction to filter our list by a given Tag (for now only one)
    filterByTags(){

        this.initializeItems();

        console.log(this.chips);
        this.searchedList = this.searchedList.filter(service => {
            let hasChip = false;
            this.chips.forEach((chip) =>{
                  if (service.tags.includes(chip)) {
                      hasChip = true;
                  }
            });
            return hasChip;
        });
        // this.chips.forEach((chip) =>{
        //     //filtering our array by tags
        //        this.searchedList = this.searchedList.filter(service => {
        //
        //        });
        //        return
        // })

        this.services = this.searchedList;
    }
    resetSearch(){
        this.services = this.allServices;
        this.searchQuery = '';
    }
    tagsParser() {
        const input = this.searchTags;
        if (input.slice(-1) === ",") {
            this.createChip(input.slice(0, -1));
            this.searchTags = '';
        }
    }
    createChip(chipToAdd) {
        if (!this.chips.includes(chipToAdd)) {
            this.chips.push(chipToAdd);
        }
        this.filterByTags()
    }
    deleteChip(chipToDelete) {
        this.chips = this.chips.filter(chip => {
            return chip != chipToDelete;
        })
        this.filterByTags();
    }
    clearTags(){
        this.services = this.allServices;
        this.chips = [];
    }

}
