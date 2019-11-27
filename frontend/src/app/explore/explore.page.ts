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
        new Service(1, 1, 'John\'s failing business', 'Catering Service by John himself. All homecooked, but not that well.', 1000, ['yum', 'food']),
        new Service(2, 2, 'Jane\'s trashy food', 'Some pretty darn fine food made by Jane herself. Anyone who says something else on tripadvisor is lying.', 200, ['oldschool', 'dinner', 'food']),
        new Service(3, 1, 'Jim\'s clean up crew', 'Cleaning for your \"Party\" if you need any \"cleaning\" call Jim.', 300, ['clean', 'murder']),
        new Service(4, 2, 'Bulletti\'s Bulletten', 'Die besten Bulletten in der Stadt. Kommt und probiert Lucas\' saftige Bulletten.', 5, ['buns','bulletten', 'juicy']),
        new Service(5, 2, 'Yael\'s mad DJ-Set', 'DJ Yael an den Turntables. Beste DJ-Sets direkt hier.', 100, ['disco', 'mad','sick']),
        new Service(6, 1, 'Lino\'s Club', 'Coolest venue in town. We even have a shoecleaner.', 2000, ['sexy', 'fancy','place to be']),
        new Service(7, 1, 'Domi\'s Shoecleaners', 'Cleaning shoes is what I do.', 30, ['clean', 'shoes','spotless']),
        new Service(8, 1, 'Gelateria di Berna', 'Gelateria di Berna kommt bei dir vorbei. Geniesse alle unsere Sorten bequem von deiner Veranda aus.', 5, ['ice cream','tasty','Calories','tasty']),
        new Service(9, 1, 'Pitteria', 'Leckere Pittas in Bern.', 18, ['pitta', 'hummus','food']),
        new Service(10, 2, 'Baccardi Bar Services', 'Verschiedenste Barkeeper werden entzücken mit Mixkünsten der Extraklasse.', 2500, ['Cocktails','Fun','drinking','beer']),
        new Service(11, 1, 'Buffalow Wings', 'Get the spiciest Chicken-Wings at your party.', 150, ['spicy', 'chicken-wings','food']),
        new Service(12, 2, 'DJ Domi und die Funky Five', 'DJ Domi und die Funky Five treten bei euch zu Hause auf. Funky beats von DJ Domi mit harmonischen sounds der Funky Five.', 600, ['Funky','DJ', 'Musik']),
        new Service(13, 2, 'OpenCinemaCrew', 'Ihr privates Kino Erlebnis. Egal ob für Kindergeburtstage oder Firmenanlässe, wir zeigen Herr der Ringe überall.', 1000, ['Kino', 'cinema','LOTR','Hobbit']),
        new Service(14, 1, 'Lino\'s Taxi Service', 'Zu lange getanzt? Zu viel getrunken? Lass dich entspannt und gemütlich nach Hause chaufieren von Lino\'s Chauffeuren.', 20, ['safe', 'home','taxi']),
        new Service(15, 1, 'Guacamole Guapos', 'Ven a buscar la mejor guacamole en la ciudad. Guacamole por todo el mundo.', 8, ['guacamole', 'spicy','verde']),
        new Service(16, 1, 'Blossoming Flowers', 'Der Blumenlieferant für Grossanlässe in der Umgebung.', 200, ['Flowers','colorful','pretty'])
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
        if (this.chips.length > 0) {
            this.searchedList = this.searchedList.filter(service => {
                let hasChip = false;
                this.chips.forEach((chip) =>{
                    if (service.tags.includes(chip)) {
                        hasChip = true;
                    }
                });
                return hasChip;
            });
        }

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
