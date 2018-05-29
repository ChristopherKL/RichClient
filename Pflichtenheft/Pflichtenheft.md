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

BuyLocal soll nicht gewerblich verwendet werden, sondern ausschließlich von Privatkunden, die keinen dauerhaften Verkauf von Neuwaren betreiben.

BuyLocal soll eine sichere Anwendung sein. Die Informationen zwischen Server und Client dürfen nur über abgesicherte Verbindungen versendet werden und es ist eventuell notwendig eine seperate Verschlüsselung bereitzustellen. Das Selbe gilt auch für die über die App versendeten Nachrichten. Es soll dafür gesorgt werden, dass keine Drittpartei an die Suchen oder Nachrichten eines Nutzers kommt oder diese einfach herausfinden kann. 

# 2 Anforderungen

## 2.1 Funktionale Anforderungen

### Authentifizierung
![Authentifizierung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/UseCases/Authentifizierung.jpg)

### Suche
![Suche](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/UseCases/Suche.jpg)

### Angebote
![Angebote](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/UseCases/Angebote.jpg)

### Profil
![Profil](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/UseCases/Profil.jpg)

### Chat
![Chat](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/UseCases/Chat.jpg)

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
### Zustandsdiagramm
![Zustandsdiagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Zustandsdiagramm.jpg)
### Login
![Login](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Login.png)
### Register
![Register](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Login.png)
### Passwort vergessen
![Passwort vergessen](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/PasswortVergessen.png)
### Startseite
![Startseite](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Startseite.png)
### Startseite mit Dropdown Menü
![Startseite mit Dropdown Menue](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/StartseiteCopy.png)
### Neues Angebot
![Neues Angebot](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/NeuesAngebot.png)
### Neues Angebot mit Dropdown Menü
![Neues Angebot mit Dropdown Menue](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/NeuesAngebotCopy.png)
### Angebotsdetailansicht
![Angebotsdetailansicht](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/AngebotsdetailAnsicht.png)
### fremdes Nutzerprofil
![fremdes Nutzerprofil](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Nutzerprofil.png)
### eigenes Nutzerprofil
![eigenes Nutzerprofil](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/NutzerprofilEigenesProfil.png)
### profil ändern
![profil aendern](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/ProfilAendern.png)
### erweiterte Suche
![erweiterte Suche](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/ErweiterteSuche.png)
### Nutzerbewertungen
![Nutzerbewertungen](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Nutzerbewertungen.png)
### Suchergebnisse
![Suchergebnisse](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Suchergebnisse.png)
### Kartenansicht
![Kartenansicht](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Kartenansicht.png)
### Chat
![Chat](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Chat.png)
### Nachrichtenübersicht
![Nachrichtenuebersicht](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Nachrichtenuebersicht.png)
### Nutzer bewerten
![Nutzer bewerten](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/NutzerBewerten.png)






## 2.4 Anforderungen im Detail

### Authentifizierung
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | meine E-Mail-Adresse und mein Passwort im Loginformular eingeben | ich mich mit diesen Daten in der buyLocal App anmelden kann. | Nutzer kann seine Login-Daten eingeben und der Server liefert eine passende Rückmeldung zum Login. |
| Nutzer | meine E-Mail-Adresse in das Passwort-Vergessen-Formular eingeben | ich mein Passwort über meine E-Mail-Adresse zurücksetzen kann. | Nutzer kann seine E-Mail eingeben und die E-Mail mit dem Link zum Zurücksetzen des Passworts wird gesendet. |
| Nutzer | mich mit meiner E-Mail, einem Passwort und meinem Geburtsdatum registrieren | ich ein Konto für BuyLocal anlegen kann. | Nutzer kann mit seinen angegebenen Daten ein Konto anlegen. |

### Suche
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | die Ergebnisse einer Suchanfrage auf einer Karten dargestellt bekommen | ich die Orte zum Abholen der Produkte visuell besser einordnen kann. | Alle gefundenen Angebote im Umkreis von 50km zu einer Suchanfrage werden auf einer Karte angezeigt. |
| Nutzer | Produkte anhand von Tags, Kategorien oder Schlagwörtern suchen | ich schnell und einfach das finde, wonach ich suche. | Angebote können durch Tags, Kategorien und Schlagwörter gefiltert werden. |
| Nutzer | Suchanfragen speichern | ich benachrichtigt werde, wenn neue Angebote eingestellt werden, auf die diese Suchanfrage zutrifft. | Eine Push-Nachricht erscheint, sobald ein neues Angebot erstellt wurde, welches durch die gespeicherte Suchanfrage gefunden wird. |
| Nutzer | meine gespeicherten Suchen auf einer Karte anzeigen lassen | ich sehen kann, welche Angebote in meiner Nähe sind. | Angebote werden angezeigt. |

### Angebote
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | Angebote ansehen | ich den Verkäufer bei Interesse kontaktieren kann. | Nutzer kann sich ein beliebiges Angebot anzeigen. |
| Nutzer | Angebote melden | betrügerische oder irreführende Angebote entfernt werden können. | Nutzer kann Angebote anhand von vorgegebenen Kategorien melden und optional einen Text angeben. |
| Nutzer | Angebote erstellen können | ich meine Gegenstände verkaufen kann. | Eintragen der Angebotsdetails und Erstellung des Angebots auf dem Server. |
| Nutzer | Angebote löschen können | ich verkaufte Gegenstände aus meinen Angeboten entfernen kann | Nutzer kann seine eigenen Angebote löschen. |

### Profil
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | andere Nutzer bewerten | ich vor einem Kauf oder Verkauf weiß, wie vertrauenswürdig die andere Person ist. | Erstellung von Bewertungen von Nutzern für Nutzer mit 1-5 Sternen und optionalem Text. |
| Nutzer | mein Profil ändern | ich meine E-Mail-Adresse oder mein Passwort zu jeder Zeit ändern kann. | Nutzer kann seine E-Mail-Adresse und sein Passwort ändern. |
| Nutzer | mein Konto löschen | ich ,wenn ich BuyLocal nicht mehr nutzen möchte, mein Konto entfernen kann. | Nutzer hat die Möglichkeit, sein Konto zu löschen. |
| Nutzer | mein eigenes oder ein beliebiges fremdes Profil ansehen | ich die Bewertung des jeweiligen Nutzers und seine aktuellen Angebote ansehen kann. | Nutzerprofile werden mit Bewertung und aktuellen Angeboten angezeigt. |

### Chat
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | einen Verkäufer kontaktieren | ich ihm bei Interesse an einem seiner Angebote eine Nachricht senden kann. | Nutzer können Verkäufern Nachrichten senden. |
| Nutzer | einem Verkäufer/Käufer einen Preisvorschlag senden können | ich eine Möglichkeit habe, ihm meine Preisvorstellungen mitzuteilen. | Nutzer können Verkäufern Preisvorschläge senden. |
| Nutzer | einen Preisvorschlag, der mir gesendet wurde, annehmen oder ablehnen können | ich den Preisvorstellungen des Käufers/Verkäufers zustimmen oder weitere Presiverhandlungen führen kann. | Nutzer können Verkäufern Preisvorschläge senden.
| Nutzer | einen Nutzer blockieren | ich bei Konflikten, Spam oder Betrug eine Möglichkeit habe, mich vor dem blockierten Nutzer zu schützen. | Nachrichten vom blockierten Nutzer werden nicht mehr angezeigt. |
| Nutzer | einen Nutzer melden | ich bei Betrug oder Regelverletzung eine Möglichkeit habe, mich und andere Nutzer zu schützen. | Die Meldung wird zu einem Admin weitergeleitet. |

# 3 Technische Beschreibung


## 3.1 Systemübersicht
        - Systemarchitekturdiagramm ("Box-And-Arrow" Diagramm)
        - Schnittstellenbeschreibung
        - Kommunikationsprotokolle, Datenformate


## 3.2 Softwarearchitektur
        - Darstellung von Softwarebausteinen (Module, Schichten, Komponenten)


## 3.3 Datenmodell

### Konzeptionelles Analyseklassendiagramm
![Analyseklassendiagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/AnalyseKlassendiagramm.jpg)

### ER-Diagramm
![ER-Diagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/ER-Diagramm.jpeg)


## 3.4 Abläufe
        - Aktivitätsdiagramme für relevante Use Cases
        - Aktivitätsdiagramm für den Ablauf sämtlicher Use Cases
        
### Login
![Login](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Login.jpg)

### Profil ändern
![Profil ändern](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Profil%20%C3%A4ndern.jpg)


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
