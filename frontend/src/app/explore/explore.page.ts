import { Component, OnInit } from '@angular/core';
import {Service} from "../_models/service";

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
        new Service(4, 1, 'john\'s security crew', 'Security', 5, ['safe AF'])
    ];
    searchedList = [];
    searchQuery = "";
    allServices = [];

    //Function to load all our items so we can work localy (not meant for big lists!)
    initializeItems() {
        this.searchedList = this.allServices; //this.allServices to be replaced with call to backend
    }


    //filters our Array and then sets the services array to the services that are left matching the search
    // for now only compares on title
    filterData (){
        this.initializeItems();

        const searchTerm = this.searchQuery;
        if (!searchTerm) {
            this.services = this.allServices;
            return;
        }


        //filtering our array of possible services by title
        this.searchedList = this.searchedList.filter(Service => {
            if (Service.title && searchTerm) {
                if (Service.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });

        //setting services to searchresult
        this.services = this.searchedList;

    }

    constructor() {}

    ngOnInit() {
        this.allServices = this.services;

    }

}
