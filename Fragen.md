# Statemanagement
- Ich gehe davon aus, das die Kommunikation zwischen App und DB über den Statemanager passiert?
- Wie kann ich das machen
- Wird das die ganze geschicht des fetchens aus den Components nehmen, weil ich dann auf den State zurückgreife?

# Allgemeine Fragen
- Items die ich als "editierbar" gekennzeichnet habe und speichere sind beim reload bzw. nächsten Seitenaufruf weiterhin editierbar, obwohl editMode beim Speichern auf false setze. Was läuft da schief?
- In `src/App.vue` die Struktur. Sollte nicht alles in `<router-view>` sein? Weis nun leider nicht mehr, warum ich das so gemacht habe.
- Fontawesome einbinden funktioniert nicht über npm -> wegen auth von Firma?

# Inventory List
- da hab ich eine Blockade wie ich das am besten aufbaue.
- Ist die .json Struktur so überhaupt richtig?
- Die soll bei den Desk zur Auswahl stehen und auch als eigenständige Liste zum erweitern

# User Account/Login
- Der ganze Prozess ist mir noch nicht so ganz klar wie das ablaufen wird
- Wie passiert das prüfen ob Admin oder nicht -> Statemanagement?
- Wie klappen dann Seitenwechsel, wie behält die App diesen Benutzer als eingeloggt/isAdmin?

# Aufteilung Components
Am Beispiel Desks
- Teilt man DeskList.vue auch noch auf und es sollte eine Desk.vue geben und diese Component sollte dann ind DeskList.vue eingebunden werden? 

# Löschen
- `src/views/components/DesksList.vue` hier hab ich das Löschen soweit wohl hinbekommen. Wie kann ein rerender provozieren?



# API
- Directus CMS
- Payload CMS