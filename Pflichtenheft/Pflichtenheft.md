# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")


BuyLocal, Karl Piplies, Stefan Schuck, Christopher Kluck, (Inhaltsverzeichnis)


# 1 Einführung


## 1.1 Beschreibung
BuyLocal bietet dem Nutzer die Möglichkeit, Gegenstände per App zu kaufen oder verkaufen. 
Die App funktioniert, sobald sich der Nutzer eingeloggt hat. Falls kein Account vorhanden ist, kann der Nutzer sich registrieren.
 Zum Verkauf inserierte Produkte werden nach Kategorien und/oder Tags sortiert, wodurch die Suche nach passenden Angeboten erleichtert wird.
 Käufer können sich anhand von Städtenamen oder Postleitzahlen Angebote in ihrer Nähe anzeigen lassen.
 BuyLocal stellt lediglich eine Umgebung für Selbstabholer bereit. Hat ein Käufer einen passenden Artikel gefunden, kann er den Verkäufer mit einer Nachricht kontaktieren.
 Sollte es zu einer Einigung kommen und der Artikel wird verkauft, kann der Verkäufer das Angebot löschen.


## 1.2 Ziele
BuyLocal soll ausschließlich für den Privat An- und Verkauf genutzt werden. Es stellt kein Zahlungssystem bereit, sondern bringt ausschließlich Käufer und Verkäufer in Kontakt. Es kann somit überall auf der Welt angewendet werden. BuyLocal stellt neben dem grundlegenden Inserieren und Suchen von Angeboten die Möglichkeit bereit, Verkäufer und Käufer zu bewerten. Angebote können nach Kategorien oder Tags eingeordnet werden und so leichter gefunden werden. Angebote können weiterhin auf einer Karte um seinen eigenen Standpunkt herum angezeigt werden. Bewerten kann man Käufer und Verkäufer mit einer Anzahl von Sternen und optional mit einem Text, dieser ist dann für alle anderen Besucher des jeweiligen Profils sichtbar.


Unsere App richtet sich an Privatpersonen ab 13 Jahren, die gebrauchte Gegenstände online kaufen oder verkaufen wollen. Der Bildungsstand der Nutzer ist für die Verwendung der App unerheblich. Eine grundlegende Erfahrung mit vergleichbaren Flohmarktapps könnte einem die Benutzung erleichtern, wird allerdings nicht vorausgesetzt. Wie auch auf einem Flohmarkt üblich, wird in der App um Preise verhandelt werden. Nutzer, die in diesem Bereich Kenntnisse haben, werden es bei den Preisverhandlungen leichter haben. Es kann nicht davon ausgegangen werden, dass Käufer und Verkäufer spezielle Sachkenntnisse über die angebotenen Gegenstände besitzen.


BuyLocal soll nicht gewerblich verwendet werden, das heißt ausschließlich von Privatkunden die keinen dauerhaften Verkauf von Neuwaren betreiben.


BuyLocal soll eine sichere Anwendung sein, die Informationen zwischen Server und Client dürfen nur über abgesicherte Verbindungen versendet werden und es ist eventuell notwendig eine seperate Verschlüsselung bereitzustellen. Das selbe gilt auch für die über die App versendeten Nachrichten. Es soll dafür gesorgt werden das keine Drittpartei an die Suchen oder Nachrichten eines Nutzers kommt oder diese einfach herausfinden kann. 






# 2 Anforderungen






## 2.1 Funktionale Anforderungen


        - Use-Case Diagramme
        Login
                Passwort vergessen
        Registrierung
        Profil ändern
                Profil löschen
        Profil ansehen (irgendeins)
                Nutzer melden (could have)
                Nutzer blockieren
        Produkt suchen
                Nach Tag
                Nach Kategorie
                Nach Schlagwort
                Suche speichern
                Suche auf Karte darstellen
        Angebot ansehen
                Verkäufer kontaktieren
                Angebot melden (could have)
        Kartenansicht anzeigen
                Nur gespeicherte Suchen
        Nutzer bewerten
                Mit Stern
                optional mit Text
        Angebot inserieren
        
        - Strukturierung der Diagramme in funktionale Gruppen


## 2.2 Nicht-funktionale Anforderungen


### 2.2.1 Rahmenbedingungen
        Die App soll durch React Native auf iOS wie auf Android funktionieren.
        - Normen, Standards, Protokolle, Hardware, externe Vorgaben


### 2.2.2 Betriebsbedingungen
        Die App wird mit React Native verwirklicht. Der Server nutzt Node.JS und MySQL um         JSON Daten für die App als API-Zugang bereitzustellen. Als ORM-Schicht zwischen         Node.JS und MySQL nutzen wir sequelizejs.


### 2.2.3 Qualitätsmerkmale
        Die Zuverlässigkeit hängt stark vom Online-Status des Servers ab, sollte dieser
        nicht erreichbar sein ist die App unbrauchbar. Die Performance der App hängt von der
        Latenz zum Backend-Server und der Leistung des Smartphones des Nutzers ab.
        
        - Externe Qualitätsanforderungen (z.B. Performance, Sicherheit, Zuverlässigkeit, Benutzerfreundlichkeit)


## 2.3 Graphische Benutzerschnittstelle
        - GUI-Mockups passend zu User Stories
        - Modellierung der Navigation zwischen den Screens der GUI-Mockups als Zustandsdiagramm


## 2.4 Anforderungen im Detail
        - User Stories mit Akzeptanzkritierien
        - Optional: Name (oder ID) und Priorität ("Must", "Should", "Could", "Won't")
        - Strukturierung der User Stories in funktionale Gruppen

### Schablone für User Stories

| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | die Ergebnisse einer Suchanfrage auf einer Karten dargestellt bekommen | ich die Orte zum Abholen der Produkte visuell besser einordnen kann. | Alle gefundenen Angebote im Umkreis von 50km zu einer Suchanfrage werden auf einer Karte angezeigt. |
| Nutzer | Angebote ansehen | ich den Verkäufer bei Interesse kontaktieren kann. | Nutzer kann sich ein beliebiges Angebot anzeigen. |
| Nutzer | Angebote melden | betrügerische oder irreführende Angebote entfernt werden können. | Nutzer kann Angebote anhand von vorgegebenen Kategorien melden und optional einen Text angeben. |
| Nutzer | meine gespeicherten Suchen auf einer Karte anzeigen lassen | ich sehen kann, welche Angebote in meiner Nähe sind. | Angebote werden angezeigt. |
| Nutzer | andere Nutzer bewerten | ich vor einem Kauf oder Verkauf weiß, wie vertrauenswürdig die andere Person ist. | Erstellung von Bewertungen von Nutzern für Nutzer mit 1-5 Sternen und optionalem Text. |
| Nutzer | Angebote erstellen können | ich meine Gegenstände verkaufen kann. | Eintragen der Angebotsdetails und Erstellung des Angebots auf dem Server. |
| Nutzer | meine E-Mail-Adresse und mein Passwort im Loginformular eingeben | ich mich mit diesen Daten in der buyLocal App anmelden kann. | Nutzer kann seine Login-Daten eingeben und der Server liefert eine passende Rückmeldung zum Login.
| Nutzer | meine E-Mail-Adresse in das Passwort-Vergessen-Formular eingeben | ich mein Passwort über meine E-Mail-Adresse zurücksetzen kann. | Nutzer kann seine E-Mail eingeben und die E-Mail mit dem Link zum Zurücksetzen des Passworts wird gesendet.
| Nutzer | mich mit meiner E-Mail, einem Passwort und meinem Geburtsdatum registrieren | ich ein Konto für buyLocal anlegen kann. | Nutzer kann mit seinen angegebenen Daten ein Konto anlegen.
| Nutzer | mein Profil ändern | ich meine E-Mail-Adresse oder mein Passwort zu jeder Zeit ändern kann. | Nutzer kann seine E-Mail-Adresse und sein Passwort ändern.
| Nutzer | mein Konto löschen | ich ,wenn ich BuyLocal nicht mehr nutzen möchte, mein Konto entfernen kann. | Nutzer hat die Möglichkeit, sein Konto zu löschen.
| Nutzer | mein eigenes oder ein beliebiges fremdes Profil ansehen | ich die Bewertung des jeweiligen Nutzers und seine aktuellen Angebote ansehen kann. | Nutzerprofile werden mit Bewertung und aktuellen Angeboten angezeigt.
| Nutzer | einen Nutzer melden | ich bei Betrug oder Regelverletzung eine Möglichkeit habe, mich und andere Nutzer zu schützen. | Die Meldung wird zu einem Admin weitergeleitet.
| Nutzer | einen Nutzer blockieren | ich bei Konflikten, Spam oder Betrug eine Möglichkeit habe, mich vor dem blockierten Nutzer zu schützen. | Nachrichten vom blockierten Nutzer werden nicht mehr angezeigt.
| Nutzer | Produkte anhand von Tags, Kategorien oder Schlagwörtern suchen | ich schnell und einfach das finde, wonach ich suche. | Angebote können durch Tags, Kategorien und Schlagwörter gefiltert werden.
| Nutzer | Suchanfragen speichern | ich benachrichtigt werde, wenn neue Angebote eingestellt werden, auf die diese Suchanfrage zutrifft. | Eine Push-Nachricht erscheint, sobald ein neues Angebot erstellt wurde, welches durch die gespeicherte Suchanfrage gefunden wird.


# 3 Technische Beschreibung


## 3.1 Systemübersicht
        - Systemarchitekturdiagramm ("Box-And-Arrow" Diagramm)
        - Schnittstellenbeschreibung
        - Kommunikationsprotokolle, Datenformate


## 3.2 Softwarearchitektur
        - Darstellung von Softwarebausteinen (Module, Schichten, Komponenten)


## 3.3 Datenmodell
        - Konzeptionelles Analyseklassendiagramm


## 3.4 Abläufe
        - Aktivitätsdiagramme für relevante Use Cases
        - Aktivitätsdiagramm für den Ablauf sämtlicher Use Cases


## 3.5 Entwurf
        - Detaillierte UML-Diagramme für relevante Softwarebausteine


# 4 Projektorganisation


## 4.1 Annahmen
        - Nicht durch den Kunden definierte spezifische Annahmen, Anforderungen und Abhängigkeiten
        - Verwendete Technologien (Programmiersprache, Frameworks, etc.)
        - Einschränkungen, Betriebsbedingungen und Faktoren, die die Entwicklung beeinflussen (Betriebssysteme, Entwicklungsumgebung)
        - Interne Qualitätsanforderungen (z.B. Softwarequalitätsmerkmale wie z.B. Erweiterbarkeit)


## 4.2 Verantwortlichkeiten
        - Zuordnung von Personen zu Softwarebausteinen aus Kapitel 3.1 und 3.2
        - Rollendefinition und Zuordnung


## 4.3 Grober Projektplan
        - Meilensteine


# 5 Anhänge


## 5.1 Glossar
        - Definitionen, Abkürzungen, Begriffe


## 5.2 Referenzen
        - Handbücher, Gesetze


## 5.3 Index
