import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from "../_services/session.service";
import { UserService } from "../_services/user.service";
import { Service } from "../_models/service";
import { User } from "../_models/user";

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
        new Service(5, 1, 'Yael\'s mad DJ-Set', 'DJ Yael an den Turntables. Beste DJ-Sets direkt hier.', 100, ['party', 'disco', 'mad','sick']),
        new Service(6, 2, 'Lino\'s Club', 'Coolest venue in town. We even have a shoecleaner.', 2000, ['fancy','place to be']),
        new Service(7, 1, 'Domi\'s Shoecleaners', 'Cleaning shoes is what I do.', 30, ['clean', 'shoes','spotless']),
        new Service(8, 1, 'Gelateria di Berna', 'Gelateria di Berna kommt bei dir vorbei. Geniesse alle unsere Sorten bequem von deiner Veranda aus.', 5, ['ice cream','tasty','Calories']),
        new Service(9, 2, 'Pitteria', 'Leckere Pittas in Bern.', 18, ['pitta', 'hummus','food']),
        new Service(10, 2, 'Baccardi Bar Services', 'Verschiedenste Barkeeper werden entzücken mit Mixkünsten der Extraklasse.', 2500, ['Cocktails','Fun','drinking','beer']),
        new Service(11, 2, 'Buffalow Wings', 'Get the spiciest Chicken-Wings at your party.', 150, ['spicy', 'chicken-wings','food']),
        new Service(12, 1, 'DJ Domi und die Funky Five', 'DJ Domi und die Funky Five treten bei euch zu Hause auf. Funky beats von DJ Domi mit harmonischen sounds der Funky Five.', 600, ['Funky','DJ', 'party', 'Musik']),
        new Service(13, 2, 'OpenCinemaCrew', 'Ihr privates Kino Erlebnis. Egal ob für Kindergeburtstage oder Firmenanlässe, wir zeigen Herr der Ringe überall.', 1000, ['Kino', 'cinema','LOTR','Hobbit']),
        new Service(14, 1, 'Lino\'s Taxi Service', 'Zu lange getanzt? Zu viel getrunken? Lass dich entspannt und gemütlich nach Hause chaufieren von Lino\'s Chauffeuren.', 20, ['safe', 'home','taxi']),
        new Service(15, 2, 'Guacamole Guapos', 'Ven a buscar la mejor guacamole en la ciudad. Guacamole por todo el mundo.', 8, ['guacamole', 'spicy','verde']),
        new Service(16, 1, 'Blossoming Flowers', 'Der Blumenlieferant für Grossanlässe in der Umgebung.', 200, ['Flowers','colorful','pretty'])
    ];
    servicesToDisplay = [];
    tagsSearch: boolean = false;
    searchForm: FormGroup;
    searchedList = [];
    allServices = [];
    chips = [];
    isLoggedIn: boolean;
    currentUser: User;

    constructor(
        private sessionService: SessionService,
        private userService: UserService
    ) {}

    ngOnInit() {

        // initalizing searchbars
        this.searchForm = new FormGroup({
            query: new FormControl(''),
            tags: new FormControl('')
        })

        // wrapping service into an object which 'adds' the username field
        // to optimize backend calls.
        // allServices.username now holds the username of the service-provider.
        // allServices.service holds the service.
        this.services.forEach(service => {
            this.userService.getUser(service.userId).subscribe(data => {
                let optimizedService = { username: data.username, service: service };
                this.allServices.push(optimizedService);
            });
        })
        this.servicesToDisplay = this.allServices;

        // checking if logged in.
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }
    }
    //Function to load all our items so we can work localy (not meant for big lists!)
    initializeItems() {
        this.searchedList = this.allServices;
    }

    //filters our Array and then sets the services array to the services that are left matching the search
    // for now only compares on title
    filterByTitle (){
        this.initializeItems();
        const searchTerm = this.searchForm.get('query').value;
        if (!searchTerm) {
            this.servicesToDisplay = this.allServices;
            return;
        }
        //filtering our array of possible services by title
        this.searchedList = this.searchedList.filter(serviceCard => {
            if (serviceCard.service.title && searchTerm) {
                if (serviceCard.service.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        //setting services to searchresult
        this.servicesToDisplay = this.searchedList;
    }

    //funtction to filter our list by a given Tag (for now only one)
    filterByTags(){

        this.initializeItems();
        if (this.chips.length > 0) {
            this.searchedList = this.searchedList.filter(serviceCard => {
                let hasChip = false;
                this.chips.forEach((chip) =>{
                    if (serviceCard.service.tags.includes(chip)) {
                        hasChip = true;
                    }
                });
                return hasChip;
            });
        }

        this.servicesToDisplay = this.searchedList;
    }

    resetSearch(){
        this.servicesToDisplay = this.allServices;
        this.searchForm.get('query').setValue("");
    }

    tagsParser() {
        const input = this.searchForm.get('tags').value;
        if (input.slice(-1) === ",") {
            this.createChip(input.slice(0, -1));
            this.searchForm.get('tags').setValue("");
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
        this.servicesToDisplay = this.allServices;
        this.chips = [];
    }

    switchSearch() {
        this.tagsSearch = !this.tagsSearch;
    }

}
