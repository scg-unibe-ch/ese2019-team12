# Milestone 3

Fälligkeitsdatum: 4. Dezember

WICHTIG: Dieses Dokument ist ein WIP. Wem noch zusätzliche Tasks in den Sinn kommen, die implementiert werden sollen, der kann sie unten eintragen.

## Ziele des Milestones
### Im Frontend:
Erstellung der Businesslogik der verschiedenen Pages:

| **Page** | **Ziele** | **Erledigt** | **In Progress** |
| -------------------------- | ---------- | ---------- | ---------- |
| Explore-Page  | 1. Implementierung einer Search-Bar, welche mithilfe von bestimmbaren Search-Parametern alle Services browst <br/> 2. Card-Ansicht (also minimierte Ansichten) von zufällig ausgewählten Services in einem Feed <br/> 3. Weiterleitung auf die Service-Page der angeklickten Service-Card | 1. Korrekte Verbindung ins Backend, um auf die Services zuzugreifen <br/>4. Erstellung des Components der Card-Ansicht der Services<br/> 5. Routing | 2. Hilfsfenster zur Setzung der Search-Parameter<br/>3. Erstellung der Search-Funktion <br/> |
| Service-Detailansicht-Page  | 1. Button mit zwei Möglichkeiten: AddServiceToExistingEvent und AddServiceToNewEvent<br/>2. Popup_AddServiceToExistingEvent, wenn die erste Möglichkeit geklickt wird, Popup_AddServiceToNewEvent, wenn die zweite Möglichkeit geklickt wird<br/>3. Weiterleitung auf die Profile-Page des Serviceproviders, wenn man auf dessen Namen klickt | 1. Korrekte Verbindung ins Backend, um auf die Services zuzugreifen <br/> | 2. Popups <br/>3. Routing |
| Popup_AddServiceToExistingEvent  | 1. Wahl eines Events aus der Liste der Events des jeweiligen Users, bei welchem er den Service adden möchte <br/>2. |  | 1. Korrekte Verbindung ins Backend, um auf die Events des Users zuzugreifen<br/>2. Abspeichern des neuen Services im Event |
| Popup_CreateNewEvent  | 1. Erstellung eines neuen Events, welcher dem User zugewiesen wird | | 1. Korrekte Verbindung ins Backend, um den neuen Event beim User anzuspreichern <br/>2. Abspeichern des neuen Services im Event |
| Profile-Page  | 1. Darstellung der Personendaten mit Editierfunktionen dafür (Two-Way-Binding) (nur für die Proile-Page des eigenen Kontos)<br/> | 1. Korrekte Verbindung ins Backend, um auf die User-Inormationen zuzugreifen <br/>2. Anpassung der Oberfläche, sodass sie unterschiedlich ist für die Page des eigenen Kontos und derer anderer Users | 3. Editierfunktion beim eigenen Profil |

####  Siehe das File "Prototype_Buchung_Service" im Folder "prototypes" für mehr Details und eine bildliche Darstellung der Ziele oben

| **Page** | **Ziele** | **Erledigt** | **In Progress** |
| -------------------------- | ---------- | ---------- | ---------- |
| Login-Page | 1. Korrektes Fetching und Initialisierung des Users (User, der sich einloggt, soll an alle anderen Seiten jeweils weitergegeben werden ->Session) | 1. Korrekte Verbindung ins Backend, um den User zu fetchen | |
| Registration-Page | 1. Korrekte Erstellung eines neuen Users | 1. Korrekte Verbindung ins Backend, um einen neuen User zu erstellen ||



### Im Backend:
| **Ziel** | **Status** | **Zu erledigen** |
| -------------------------- | ---------- | ---------- |
| Events controller | in Progress | * Curl smoketests
                                    * Verlinken mit Service | 
| Message controller | TBD | * Chat mit Socket.io |
