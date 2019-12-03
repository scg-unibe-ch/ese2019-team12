# ESE: Usability Test

#### Luca Bulletti, Lino Hess, Dominik Fischli, Yael van Dok (Team 12)

This document holds all the information about the Usability Tests that were conducted of our ESE project (event management app) on 27th November 2019.

Testers: Patrick, Pascal

### Description of our project

Our app aims to be a platform where people who wish to employ certain services such as catering, cleaning, security, entertainment et cetera for their events come into contact with providers of said services.

We accomplish this by allowing our users to register into our app, browse the explore page where available services by other users are located, and add the ones they wish to employ to their own events. Events are private and can be created by the user. They hold certain information like name, date, location and a list of employed services. 

Additionally, if a user wants to provide their own services, they are able to do so by adding their services to their profile. The newly created service will be added to the explore page and can be browsed by other users.

As soon as a user adds a certain service to one of their events, the service provider will be notified that the user expresses interest in said service. Provider and user will subsequently be able to get into contact through our in-built messaging system where they can discuss an eventual employment of the service.

### Status of our project

With our app in its current state, it is possible to 

- sign up or login into our app
- browse available services on our explore page (these services are each provided by a user) and searching for specific ones by filtering name and tags
- view the details of each service on its own page
- view one's profile page and the profile pages of other users
- add a service to one's profile (this will display the service on the user's profile page and on the explore page where it can be searched for via name and/or tags)

## Preparation

We decided to create a fairly long test with individual steps that guide the testers through the app. We will urge the testers to give us their feedback on how intuitive the GUI is, how easily they can locate the features and if they think that certain elements are missing from the GUI to guarantee a pleasant user experience.

### Test

1. Find the menu.
2. Register a new user.
3. Visit your profile page.
4. Create a new service with up to three tags
5. Visit the explore page.
6. Search for services with the tags 'party' and 'fancy'.
7. Clear your marked tags.
8. Search for the service 'Gelateria di Berna'.
9. Visit the provider's page of 'Gelateria di Berna'.
10. Log out.

## Execution

We will give the testers a quick overview of what our app does, and then we will have them complete the test.

For each step, we will document the users' experiences with our app according to the following structure:

| **Step** | **Was the user able to complete the step without asking for help and in a reasonably short amount of time?** | **Does the user think that the GUI used to complete the task is intuitive?** | Additional feedback and ideas for improvement |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------- |
|          |                                                              |                                                              |                                               |

## Documentation

#### Tester: Pascal

| **Step** | **Was the user able to complete the step without asking for help and in a reasonable amount of time?** | **Does the user think that the GUI used to complete the task is intuitive?** | Additional feedback and ideas for improvement                |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1        | Yes. The design is simple and seems pretty standard.         | Yes.                                                         |                                                              |
| 2        | Yes. You can find it easily.                                 | Yes.                                                         | - Support for special characters in names<br>+ Good feedback if the input is invalid |
| 3        | Yes.                                                         | Yes.                                                         |                                                              |
| 4        | Yes.                                                         | Yes.                                                         |                                                              |
| 5        | Yes.                                                         | Yes.                                                         |                                                              |
| 6        | No.                                                          | No. The tester intuitively used the normal search bar.       | - Improve the layout of the  tag search (maybe incorporate it in the search bar via a dropdown menu that lets you specify whether you want to filter tags or names) |
| 7        | Yes.                                                         | Yes.                                                         |                                                              |
| 8        | Yes.                                                         | Yes.                                                         |                                                              |
| 9        | Yes.                                                         | Yes.                                                         |                                                              |
| 10       | Yes.                                                         | Yes.                                                         |                                                              |

#### General feedback

App: Good design, generally very intuitive and simple.

#### Tester: Patrick

| **Step** | **Was the user able to complete the step without asking for help and in a reasonable amount of time?** | **Does the user think that the GUI used to complete the task is intuitive?** | Additional feedback and ideas for improvement                |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1        | Yes.                                                         | Yes. Patrick expected it to be in the top right corner, where it is. Pretty standard. |                                                              |
| 2        | Yes and no. Patrick quickly found the 'Login or register' item in the menu, but was confused when he was routed to the 'Login' page (the link to the 'Register' page is at the bottom of the login page.<br><br>When he filled out the form, he entered an invalid username (with numbers) and was confused. We told him that numbers weren't allowed and he corrected it. | No. Patrick said that the normal user will not read that the menu item reads 'Login AND Register' and will be confused when he is directly routed to the 'Login' page. | -Improve the menu items by splitting the 'Login and Register' item into a 'Login' item and a 'Register' item<br>- Communicate to the user that usernames cannot have numbers or special characters |
| 3        | Yes.                                                         | Yes. Patrick expected it to be in the menu.                  |                                                              |
| 4        | Yes.                                                         | Yes, though Patrick was wondering if the tags were pre-defined. | - Communicate to the user that tags are not pre-defined      |
| 5        | Yes.                                                         | Yes. He intuitively open the menu.                           |                                                              |
| 6        | No. Patrick intuitively used the normal search bar to search for the tags and was confused when the search didn't yield any results. We told him that he should use the search underneath the bar, but he was further confused as to where he should enter the input. | No. Patrick said that as a user, you're always intuitively going to use the search bar on top. | - Improve the layout of the  tag search by either clarifying the design and clearly showing where the input goes, or by getting incorporating the tag search in the search bar (intelligent search bar) (alternatively implement a dropdown menu in the bar that lets you specify whether you want to filter tags or names) |
| 7        | Yes.                                                         | Yes.                                                         |                                                              |
| 8        | Yes.                                                         | Yes. He intuitively used the search bar.                     |                                                              |
| 9        | No. Patrick first clicked on the card itself and got routed to the detail page of the card. We told him that this was the wrong page and he eventually clicked the username and was routed to the correct page. | No.                                                          | - Improve the design of the service card to make it clear which part routs you to the detail page and which part routs you to the profile of the provider<br><br>(It is possible that our test example was a bit confusing name-wise and that's why Patrick was confused at first) |
| 10       | Yes.                                                         | Yes.                                                         |                                                              |

#### General feedback

Test: Good steps, good guidance through the steps.

App: Generally good design, though some improvements are necessary (see above). Patrick said that we should try to think more like users than developers when designing the GUI.

## Interpretation of Results

We discussed the feedback from the assistants and decided to implement the following/improve our code in the following way:

- We implemented support for "special" Latin characters (such as "é", "è", "ä", "ü", etc.) in first names and last names 
- We improved the tag search and clarified the design. It now features only one search bar where you can specify whether you want to search for tags or for names. You can also stack searches thereby simultaneously search for tags and names
- We now allow usernames to have numbers, underscores and dashes
