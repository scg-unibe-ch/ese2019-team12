# Milestone 3

Fälligkeitsdatum: 4. Dezember

WICHTIG: Dieses Dokument ist ein WIP. Wem noch zusätzliche Tasks in den Sinn kommen, die implementiert werden sollen, der kann sie unten eintragen.

## Ziele des Milestones

### Im Frontend:

Erstellung der Businesslogik der verschiedenen Pages:

| **Page**                        | **Ziele**                                                    | **Erledigt**                                                 | **In Progress**                                              |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Explore-Page                    | 1. Implementierung einer Search-Bar, welche mithilfe von bestimmbaren Search-Parametern alle Services browst <br/> 2. Card-Ansicht (also minimierte Ansichten) von zufällig ausgewählten Services in einem Feed <br/> 3. Weiterleitung auf die Service-Page der angeklickten Service-Card | 1. Korrekte Verbindung ins Backend, um auf die Services zuzugreifen <br/>2. Hilfsfenster zur Setzung der Search-Parameter<br/>3. Erstellung der Search-Funktion <br/>4. Erstellung des Components der Card-Ansicht der Services<br/> 5. Routing |                                                              |
| Service-Detailansicht-Page      | 1. Button mit zwei Möglichkeiten: AddServiceToExistingEvent und AddServiceToNewEvent<br/>2. Popup_AddServiceToExistingEvent, wenn die erste Möglichkeit geklickt wird, Popup_AddServiceToNewEvent, wenn die zweite Möglichkeit geklickt wird<br/>3. Weiterleitung auf die Profile-Page des Serviceproviders, wenn man auf dessen Namen klickt | 1. Korrekte Verbindung ins Backend, um auf die Services zuzugreifen <br/>3. Routing | 2. Popups <br/>                                              |
| Popup_AddServiceToExistingEvent | 1. Wahl eines Events aus der Liste der Events des jeweiligen Users, bei welchem er den Service adden möchte <br/> |                                                              | 1. Korrekte Verbindung ins Backend, um auf die Events des Users zuzugreifen<br/>2. Abspeichern des neuen Services im Event |
| Popup_CreateNewEvent            | 1. Erstellung eines neuen Events, welcher dem User zugewiesen wird | 1. Korrekte Verbindung ins Backend, um den neuen Event beim User anzuspreichern <br/>2. Abspeichern des neuen Services im Event |                                                              |
| Profile-Page                    | 1. Darstellung der Personendaten mit Editierfunktionen dafür (Two-Way-Binding) (nur für die Proile-Page des eigenen Kontos)<br/> | 1. Korrekte Verbindung ins Backend, um auf die User-Inormationen zuzugreifen <br/>2. Anpassung der Oberfläche, sodass sie unterschiedlich ist für die Page des eigenen Kontos und derer anderer Users<br>3. Editierfunktion beim eigenen Profil |                                                              |

####  Siehe das File "Prototype_Buchung_Service" im Folder "prototypes" für mehr Details und eine bildliche Darstellung der Ziele oben

| **Page**          | **Ziele**                                                    | **Erledigt**                                                 | **In Progress** |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------- |
| Login-Page        | 1. Korrektes Fetching und Initialisierung des Users (User, der sich einloggt, soll an alle anderen Seiten jeweils weitergegeben werden ->Session) | 1. Korrekte Verbindung ins Backend, um den User zu fetchen   |                 |
| Registration-Page | 1. Korrekte Erstellung eines neuen Users                     | 1. Korrekte Verbindung ins Backend, um einen neuen User zu erstellen |                 |



### Im Backend:

| **Ziel**           | **Status**  | **Erledigt**          | In Progress        |
| ------------------ | ----------- | --------------------- | ------------------ |
| Events controller  | in Progress | Verlinken mit Service | Curl smoketest     |
| Message controller | in Progress |                       | Chat mit Socket.io |



Comment on the deadline of this milestone (4th Dec 2019):

Since Dominik is absent from 27th November to 6th December due to his military service, we were not able to complete every task of our milestone, namely the ones that need work in the backend. (Dominik is in charge of the backend).

As soon as he is back on Friday, we will finish the tasks above and complete the milestone. We will update this document accordingly.
