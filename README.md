# ACARA

ACARA (malay for 'event') is a platform for event organisers on one end and event service providers on the other. It is a web-based app designed to run on any device.

Our goal is to provide our registered users an interactive interface where they can either login as an event organiser or as a service provider.

Event organisers will be able to create their upcoming events and the required services that come with it, and they will be able to browse our provider database in order to find the ones best suited for the tasks at hand. The organisers can then establish contact with said providers.

**Note**: For a more detailed explanation of the code and its features, as well as information on its creative process, the challenges its creators faced and the learning outcomes they had, and any recommendations concerning this project/similar projects in general, please refer to the Wiki.

## Installation

Before you can do anything with our app you will have to download

### `node.js`

The newest Version is ready to be downloaded at: https://nodejs.org/en/download/

For the installation follow the instructions on the site or from the installer.

After installing node.js  and before running the script to this application you have to install the different modules used. Open your desired Terminal and go to the directory, where you have saved the application. Now you will have to enter the frontend and backend folder, each individually and enter:

### `npm install`

Wait for the terminal to load the different modules.

### Backend

#### The Database

This server uses an sqlite3 database. It is stored in the file `db.sqlite`

To fill the database with test data enter:

### `npm run db_init`

## Running the application

### Frontend

After the modules have loaded you can start the application in the frontend by entering the frontend folder and running:

### `ionic serve` or `ionic serve --lab`

This Runs the app in the development mode.<br>

Wait for the code to be compiled and your standard browser to open a new page on http://localhost:8100/. If this does not happen automatically you can enter the address into your browser manually to view the application in the browser. Use the `--lab` extension to get a mobile platform view.

The page will reload if you make edits.

Alternatively, you can run just 

### `ng serve` 

for a dev server. Navigate to http://localhost:4200/. 

### Backend

Run

##  `npm start`.

The server will be served on `localhost:3000`

## Further available scripts

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `ionic build`

The build artefacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. This `dist` folder is used to put on production server. More information [here](https://ionicframework.com/docs/cli/commands/build).

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Compatability

This web-application is built with Ionic and Angular. As such it is working on most new web-browser and also on mobile-devices with Android and iOS.

## Usage

Once you have installed the different modules and have managed to start the application there are many different things you can do.

### Explore-page

The landing-page of the web application is also the Explore-page. Here you will find most services that are provided by the service providers.

To interact with those services first you will have to generate an account or login.

The login and registration panels can be found in the menu which can be found in the upper right corner.

Once that has been done the explore-page is the go-to standard if yo want to find any services and the like.

The different services display in the cards can be browsed manually by just scrolling through them or can be searched with our search bar which lets you enter different search terms and also multiple tags to search for. Depending on what you want to enter, just toggle the button to either search by `Title` or search by `Tag`.

Once you have found the service you are looking for, simply click on the card and get all the info you need.

### Service cards

The offered services are displayed by using so called cards. These cards hold the information about the services, such as the title, a description, prices and some defining tags.

As well as two buttons that allow you to add the service to an existing event or create  a new event and then adding the desired service to it.

### Creating an event

There are two ways to create an event.

1. You can go to your profile and simply click on the `ADD AN EVENT`button.
2. Chose a service, click on the service, click on `ADD TO NEW EVENT`

Once either of these buttons have been clicked you will be prompted to fill out the form, with a bit more information about your event.

The created events can then be found on your profile.

### Menu

The Menu is a small button in the right upper corner, which when clicked shows you a list of the different pages, you can access given your login status.

Also if you want to log out the option can be found in the menu list.

As such you will find most of the pages you need directly in the menu.

### Profile

You can find the way to your profile in the menu, or by clicking on the small avatar with your username right next to the menu button.

On your profile page you will find a quick overview about you, your services and your events. Each of those can be managed and edited directly from your profile page.

### Add Service

The `ADD SERVICE` button can be used to create new services you would like to offer and to become a service provider. After clicking the button you will be prompted to fill out the form giving some specific information about your service. This will be the information you see displayed on the service cards.

## Authors

This application has been made by CS students of the university Bern. 

Created by:

Luca Bulletti

Dominik Fischli

Yael van Dok

Lino Hess

## Learn More

You can learn more about Angular [here](https://angular.io/).

To find out more about Ionic, check out the [ionic webpage](https://ionicframework.com/).
