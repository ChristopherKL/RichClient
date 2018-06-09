# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")

## Projekname: BuyLocal
## Beteiligte Personen: Karl Piplies, Stefan Schuck, Christopher Kluck

- [1 Einführung](#1-einführung)
  * [1.1 Beschreibung](#11-beschreibung)
  * [1.2 Ziele](#12-ziele)
- [2 Anforderungen](#2-anforderungen)
  * [2.1 Funktionale Anforderungen](#21-funktionale-anforderungen)
    + [Authentifizierung](#authentifizierung)
    + [Suche](#suche)
    + [Angebote](#angebote)
    + [Profil](#profil)
    + [Chat](#chat)
  * [2.2 Nicht-funktionale Anforderungen](#22-nicht-funktionale-anforderungen)
    + [2.2.1 Rahmenbedingungen](#221-rahmenbedingungen)
    + [Sicherheit](#sicherheit)
    + [2.2.2 Betriebsbedingungen](#222-betriebsbedingungen)
    + [2.2.3 Qualitätsmerkmale](#223-qualitätsmerkmale)
  * [2.3 Graphische Benutzerschnittstelle](#23-graphische-benutzerschnittstelle)
    + [Zustandsdiagramm](#zustandsdiagramm)
    + [Login](#login)
    + [Registrierung](#registrierung)
    + [Passwort vergessen](#passwort-vergessen)
    + [Startseite](#startseite)
    + [Startseite mit Dropdown Menü](#startseite-mit-dropdown-menü)
    + [Neues Angebot](#neues-angebot)
    + [Neues Angebot mit Dropdown Menü](#neues-angebot-mit-dropdown-menü)
    + [Angebotsdetailansicht](#angebotsdetailansicht)
    + [fremdes Nutzerprofil](#fremdes-nutzerprofil)
    + [eigenes Nutzerprofil](#eigenes-nutzerprofil)
    + [Profil ändern](#profil-ändern)
    + [erweiterte Suche](#erweiterte-suche)
    + [Nutzerbewertungen](#nutzerbewertungen)
    + [Suchergebnisse](#suchergebnisse)
    + [Kartenansicht](#kartenansicht)
    + [Chat](#chat-1)
    + [Nachrichtenübersicht](#nachrichtenübersicht)
    + [Nutzer bewerten](#nutzer-bewerten)
  * [2.4 Anforderungen im Detail](#24-anforderungen-im-detail)
    + [Authentifizierung](#authentifizierung-1)
    + [Suche](#suche-1)
    + [Angebote](#angebote-1)
    + [Profil](#profil-1)
    + [Chat](#chat-2)
- [3 Technische Beschreibung](#3-technische-beschreibung)
  * [3.1 Systemübersicht](#31-systemübersicht)
  * [3.2 Softwarearchitektur](#32-softwarearchitektur)
  * [3.3 Datenmodell](#33-datenmodell)
    + [Konzeptionelles Analyseklassendiagramm](#konzeptionelles-analyseklassendiagramm)
    + [ER-Diagramm](#er-diagramm)
  * [3.4 Abläufe](#34-abläufe)
    + [Login](#login-1)
    + [Passwort zurücksetzen](#passwort-zurücksetzen)
    + [Registrierung](#registrierung-1)
    + [Angebot suchen](#angebot-suchen)
    + [neues Angebot](#neues-angebot)
    + [Suche speichern](#suche-speichern)
    + [Kartenansicht](#kartenansicht-1)
    + [Angebot melden](#angebot-melden)
    + [Profil ändern](#profil-ändern-1)
    + [Verkäufer kontaktieren](#verkäufer-kontaktieren)
    + [Nutzer bewerten](#nutzer-bewerten-1)
    + [Nutzer melden](#nutzer-melden)
  * [3.5 Entwurf](#35-entwurf)
    + [Sequenzdiagramm der Chatverschlüsselung](#sequenzdiagramm-der-chatverschlüsselung)
- [4 Projektorganisation](#4-projektorganisation)
  * [4.1 Annahmen](#41-annahmen)
  * [4.2 Verantwortlichkeiten](#42-verantwortlichkeiten)
  * [4.3 Grober Projektplan](#43-grober-projektplan)
- [5 Anhänge](#5-anhänge)
    + [5.1 Glossar](#51-glossar)
    + [Public Key Verfahren](#public-key-verfahren)
    + [RSA](#rsa)
    + [PBKDF2](#pbkdf2)
    + [SHA512](#sha512)
  * [5.2 Referenzen](#52-referenzen)
    + [Datenschutz-Grundverordnung](#datenschutz-grundverordnung)

# 1 Einführung

## 1.1 Beschreibung
BuyLocal bietet dem Nutzer die Möglichkeit, Gegenstände per App zu kaufen oder zu verkaufen. 
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
Wir gehen davon aus, dass die App auf iPhones und beliebigen androidfähigen Smartphones ausgeführt wird. Das bedeutet, dass die App sowohl für verschiedene Betriebssysteme, Betriebssystemversionen und Bildschirmgrößen angepasst werden muss.

### Sicherheit
Um Angreifern die Möglichkeit zu nehmen Chatverläufe oder Suchanfragen eines Kunden von unserem Server in Erfahrung zu bringen,
speichern wir alle den Kunden betreffenden Daten nur verschlüsselt auf unserem Server, darunter speziell zu nennen sind die Chatverläufe.
Um die Kommunikation unter den Kunden zu ermöglichen Nutzen wir RSA als asymmetrische Verschlüsselung und das dazugehörige Public Key Verfahren.
Die privaten Schlüssel werden nur auf den Endgeräten auf denen sich der Nutzer anmeldet gespeichert und auf dem Server wird lediglich der dazugehörige Public Key gespeichert,
dieser wird dann vom Kommunikationspartner erfragt und für die Verschlüsselung genutzt.
Um zu bewerkstelligen, dass jeder Nutzer auf jedem Endgerät seiner Wahl den selben privaten Schlüssel erhält nutzen wir PBKDF2, mit dessen Hilfe wir einen Strom an Pseudozufallszahlen erzeugen können der auf dem Passwort des Nutzers beruht
und dadurch nicht von Gerät zu Gerät wechselt, mit diesen Zufallszahlen generieren wir dann ein RSA-Schlüsselpaar, dass für jedes Gerät gleich ist.
Das Passwort eines Nutzers wird ebenfalls nur anhand eines Hash-Wertes auf dem Server rückgespeichert, dafür verwenden wir SHA512.
Die Suchanfragen die ein Nutzer für sich formuliert hat werden ebenfalls, mit dem öffentlichen Schlüssel verschlüsselt auf dem Server hinterlegt, damit er diese abrufen und mit seinem privaten Schlüssel wieder entschlüsseln kann,
dadurch kann selbst wenn ein Angreifer vom Server Daten stiehlt sichergestellt werden das er keine Informationen aus ihnen gewinnen kann.


### 2.2.2 Betriebsbedingungen
Die App soll auf iOS wie auf Android lauffähig sein. Dafür wird das Framework React Native verwendet. Der API-Server läuft auf Linux mit NodeJS und MySQL. Als ORM-Schicht wird SequelizeJS verwendet. Als IDE wird Mircrosot Visual Studio Code verwendet von allen Entwicklern verwendet, die Versionskrontrolle findet über Github statt. 

### 2.2.3 Qualitätsmerkmale
Die Zuverlässigkeit der App hängt stark von der Verfügbarkeit des Servers ab. Ohne eine Internetverbindung funktioniert die App nicht. Die Kommunikation zwischen Server uund App ist mit SSL (HTTPS) gesichert. Die Authentifizierung findet mit Hilfe von Tokens statt.

## 2.3 Graphische Benutzerschnittstelle
### Zustandsdiagramm
![Zustandsdiagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Zustandsdiagramm.jpg)

Anmerkung: Der Nutzer kann über die Navigationsleiste von jedem Zustand aus jeden Zustand erreichen, der vom Zustand "Startseite" erreicht werden kann. Aus Gründen der Übersichtlichkeit haben wir uns dafür entschieden, diese Verbindungen der Zustände nicht in das Zustandsdiagramm aufzunehmen.

### Login
![Login](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Login.png)
### Registrierung
![Register](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Mockups/Register.png)
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
### Profil ändern
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
| Nutzer | meine E-Mail-Adresse und mein Passwort im Loginformular eingeben | ich mich mit diesen Daten in der buyLocal App anmelden kann. | Ich kann meine Login-Daten eingeben und der Server liefert eine passende Rückmeldung zum Login. |
| Nutzer | meine E-Mail-Adresse in das Passwort-Vergessen-Formular eingeben | ich mein Passwort über meine E-Mail-Adresse zurücksetzen kann. | Ich kann meine E-Mail eingeben und die E-Mail mit dem Link zum Zurücksetzen des Passworts wird gesendet. |
| Nutzer | mich mit meiner E-Mail, einem Passwort und meinem Geburtsdatum registrieren | ich ein Konto für BuyLocal anlegen kann. | Ich kann mit meinen angegebenen Daten ein Konto anlegen. |

### Suche
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | die Ergebnisse einer Suchanfrage auf einer Karte dargestellt bekommen | ich die Orte zum Abholen der Produkte visuell besser einordnen kann. | Alle gefundenen Angebote im Umkreis von 50km zu einer Suchanfrage werden auf einer Karte angezeigt. |
| Nutzer | Produkte anhand von Tags, Kategorien oder Schlagwörtern suchen | ich schnell und einfach ein passendes Produkt finde. | Angebote können durch Tags, Kategorien und Schlagwörter gefiltert werden. |
| Nutzer | Suchanfragen speichern | ich benachrichtigt werde, wenn neue Angebote eingestellt werden, auf die eine meiner Suchanfrage zutrifft. | Eine Push-Nachricht erscheint, sobald ein neues Angebot erstellt wurde, welches die Kriterien einer gespeicherten Suchanfrage erfüllt. |
| Nutzer | meine gespeicherten Suchen auf einer Karte anzeigen lassen | ich sehen kann, welche, für mich relevanten, Angebote in meiner Nähe sind. | Angebote werden auf einer passend skalierten oder skalierbaren Karte angezeigt. |

### Angebote
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | Angebote ansehen | ich den Verkäufer bei Interesse kontaktieren kann. | Ich kann mir ein beliebiges Angebot im Detail anzeigen lassen. |
| Nutzer | Angebote melden | betrügerische oder irreführende Angebote entfernt werden können. | Ich kann Angebote anhand von vorgegebenen Kategorien melden und optional einen Text angeben. |
| Nutzer | Angebote erstellen können | ich ein Produkt verkaufen kann. | Ich kann ein Angebit mit Details eintragen und das Angebot auf dem Server erstellen. |
| Nutzer | Angebote löschen können | ich verkaufte oder anderweitig nicht mehr zum verkaufstehende Produkte aus meinen Angeboten entfernen kann | Ich kann Angebote löschen, so dass Sie nicht mehr auf dem Server vorhanden sind und keinem Interessenten mehr angezeigt werden. |

### Profil
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | andere Nutzer bewerten | ich meine Zufriedenheit über die Verhandlung und/oder das Produkt mitteilen kann und andere Nutzer über diese informieren kann. | Ich kann Bewertungen von Nutzern für Nutzer mit 1-5 Sternen und optionalem Text erstellen. |
| Nutzer | mein Profil ändern | ich meine E-Mail-Adresse oder mein Passwort zu jeder Zeit ändern kann. | Ich kann meine E-Mail-Adresse und mein Passwort ändern. |
| Nutzer | mein Konto löschen | ich ,wenn ich BuyLocal nicht mehr nutzen möchte, mein Konto entfernen kann. | Ich kann mein Konto löschen und meine gespeicherten Informationen werden aus dem System entfernt. |
| Nutzer | mein eigenes oder ein beliebiges fremdes Profil ansehen | ich die Bewertung des jeweiligen Nutzers und seine aktuellen Angebote ansehen kann. |  Ich kann mir ein Nutzerprofil und dessen Bewertungen und Angebote anzeigen lassen. |

### Chat
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | einen Verkäufer kontaktieren | ich ihm bei Interesse an einem seiner Angebote eine Nachricht senden kann. | Ich kann dem Verkäufer Nachrichten senden. |
| Nutzer | einem Verkäufer/Käufer einen Preisvorschlag senden können | ich eine Möglichkeit habe, ihm meine Preisvorstellungen mitzuteilen. | Ich kann Preisvorschläge zu einem Produkt an die Verhandlungspartei senden. |
| Nutzer | einen Preisvorschlag, der mir gesendet wurde, annehmen oder ablehnen können | ich den Preisvorstellungen des Käufers/Verkäufers zustimmen oder weitere Presiverhandlungen führen kann. | Ich kann Presivorschläge akzeptieren oder ablehnen und meiner Verhandlungspartei wird dies mitgeteilt.
| Nutzer | einen Nutzer blockieren | ich bei Konflikten, Spam oder Betrug eine Möglichkeit habe, mich vor dem blockierten Nutzer zu schützen. | Nachrichten vom blockierten Nutzer werden nicht mehr angezeigt. |
| Nutzer | einen Nutzer melden | ich bei Betrug oder Regelverletzung eine Möglichkeit habe, mich und andere Nutzer zu schützen. | Ich kann einen Nutzer melden und diese Meldung wird im System verarbeitet. |

# 3 Technische Beschreibung


## 3.1 Systemübersicht
![Architekturdiagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Systemarchitektur.jpg)

## 3.2 Softwarearchitektur
![Softwarebausteine](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Softwarebausteine.jpg)

## 3.3 Datenmodell

### Konzeptionelles Analyseklassendiagramm
![Analyseklassendiagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/AnalyseKlassendiagramm.jpg)

### ER-Diagramm
![ER-Diagramm](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/ER-Diagramm.jpeg)


## 3.4 Abläufe

### Login
![Login](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Login.jpg)

### Passwort zurücksetzen
![Passwort zurücksetzen](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Passwort%20zur%C3%BCcksetzen.jpg)

### Registrierung
![Registrierung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Registrierung.jpg)

### Angebot suchen
![Angebot suchen](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Angebot%20suchen.jpg)

### neues Angebot
![neues Angebot](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/neues%20Angebot.jpg)

### Suche speichern
![Suche speichern](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Suche%20speichern.jpg)

### Kartenansicht
![Kartenansicht](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Kartenansicht.jpg)

### Angebot melden
![Angebot melden](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Angebot%20melden.jpg)

### Profil ändern
![Profil ändern](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Profil%20%C3%A4ndern.jpg)

### Verkäufer kontaktieren
![Verkäufer kontaktieren](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Verk%C3%A4ufer%20kontaktieren.jpg)

### Nutzer bewerten
![Nutzer bewerten](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Nutzer%20bewerten.jpg)

### Nutzer melden
![Angebot melden](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/Activity/Nutzer%20melden.jpg)


## 3.5 Entwurf
### Sequenzdiagramm der Chatverschlüsselung
![Chatverschluesselung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/SequenzdiagrammChat.jpg)
### Sequenzdiagramm der sicheren Registrierung
    Die bei der Registrierung und dem Login verwendeten 16 Zufallszeichen dienen dazu,
    den übertragenen Hash so zu verändern, dass selbst ein dazwischengeschalteter Mithörer nach mehrmaligen Mithören, den Hash nicht erraten kann.
    Das wird erreicht dadurch, dass die übertragenen Daten durch die Zufallszeichen jedes Mal anders aussehen.
![Chatverschluesselung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/SequenzdiagrammRegister.jpg)
### Sequenzdiagramm des sicheren Login
Der beim Login generierte Token ist nur eine gewisse Zeit gültig und wird dann vom Server wieder verändert, während der Gültigkeit des Tokens, kann der Nutzer sich mit diesem Token authentifizieren.
![Chatverschluesselung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/SequenzdiagrammLogin.jpg)
### Sequenzdiagramm anderer sicherer Anfragen
![Chatverschluesselung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/SequenzdiagrammAnfragen.jpg)


# 4 Projektorganisation


## 4.1 Annahmen
Das Projekt wird mithilfe von React Native in der Entwicklungsumgebung Visual Studio Code umgesetzt. Dem React Native Framework liegt die JavaScript Bibliothek React zugrunde. Die Nutzung dieses Frameworks hätte es uns erlaubt, eine App sowohl für Android als auch iOS Geräte zu entwickeln. Während der Konzeptionierung der App stellte sich allerdings heraus, dass man für eine iOS App einen Rechner benötigt, der macOS als Betriebssystem hat. Da keiner der am Projekt beteiligten Personen Zugang zu so einem Rechner hat, können wir keine iOS App entwickeln. Als Datenbankmanagmentsystem kommt in diesem Projekt MySQL zum Einsatz, das durch die mit SequelizeJS dargestellte ORM-Schicht mit dem NodeJS Server verbunden ist. Die Navigation der App wird mit React Native Navigation umgesetzt und als State Container dient React Redux. Damit die App auf die Fotos und Kamera des Nutzers zugreifen kann, verwenden wir die React Native Image Picker Bibliothek.

An erster Stelle der internen Qualitätsanforderungen steht die Verständlichkeit des Codes. Der Code wird logisch durch gut lesbaren Code aufgebaut, damit jedes Teammitglied schnell und sicher Änderungen umsetzen kann. Das System muss außerdem eine gewisse Veränderbarkeit aufweisen, so dass Veränderungen des einen Teammitglieds an einer bestimmten Stelle sich nicht auf  Teile eines anderen Teammitglieds auswirken. Um den durch die App belegten Speicherplatz so gering wie möglich zu halten, wird darauf geachtet, den Code redundanzfrei zu halten.

## 4.2 Verantwortlichkeiten
Legende: C - Christopher K - Karl S - Stefan


| **Modul** | **App** | **API** |
| :------ | :----- | :------ |
| Tokens | K | S
| Login | K | S
| Logout | K | S
| Profil (Anzeigen, ändern) | C, K | S
| Angebot (Erstellen, anzeigen, melden) | C | S, K
| Nachrichten (Anzeigen, schicken) | C, K | S,K
| Suchanfragen | C, K | k
| Live-Abfrage  / Push-Nachricht | C, K | S, K 



## 4.3 Grober Projektplan
28.05: SQL-Datenbank erstellt<br />
31.05: Pflichtenheft Abgabe<br />
07.06: App - Login, Registrierung, Profil anzeigen, Profil ändern<br />
14.06: API + App - Tokens, Login, Registrierung, Profil anzeigen, Profil ändern<br />
21.06: API + App - Angebot erstellen, Angebot ansehen<br />
28.06: API + App - Nachrichten ansehen, Nachrichten verschicken, Angebot Melden<br />
05.07: API + App - Suchanfragen ausführen, Suchanfragen speichern, Push-Nachrichten (Nur App), kontinuierliche Abfragen<br />
12.07: Test API, möglicherweise auch App<br />


# 5 Anhänge


### 5.1 Glossar
### Public Key Verfahren
Werden genutzt um Nachrichten asymmetrisch zu verschlüsseln dabei wird der öffentliche Schlüssel genutzt um eine Nachricht zu verschlüsseln,
und der private Schlüssel um diese Nachricht wieder zu entschlüsseln.
Der öffentliche Schlüssel kann eine Nachricht nicht wieder entschlüsseln, sondern ist eine Einwegfunktion und kann lediglich verschlüsseln

### RSA
Ist ein asymmetrisches Verschlüsselungsverfahren entwickelt von Rivest, Shamir und Adleman.
Es nutzt die mathematischen Probleme der Primzahlbestimmung und des Faktorisierens um Sicherheit zu erzeugen.
Ist eines der gängigsten Verfahren der heutigen Zeit.

### PBKDF2
Password-Based Key Derivation Function 2
ist ein Verfahren um aus einem geeigneten Passwort einen Pseudozufallszahlen-Stream zu erzeugen.
ist von RSA Laboratories entwickelt worden.
### SHA512
Ist eine Kryptographische Hashfunktion, die den Hashwert eines Eingabewortes als 512 Byte String sichert.
Gehört zur SHA 2 Familie an Hashfunktionen und ist eine der verbreiteten Funktionen zum rückspeichern von Passwörtern in Datenbanken


## 5.2 Referenzen
### Datenschutz-Grundverordnung
https://www.datenschutz-grundverordnung.eu/
