# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")

BuyLocal, Karl Piplies, Stefan Schuck, Christopher Kluck

(Inhaltsverzeichnis)

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
Die App soll durch React Native auf Android funktionieren.
## Sicherheit
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
Die App wird mit React Native verwirklicht. Der Server nutzt Node.JS und MySQL um 
JSON Daten für die App als API-Zugang bereitzustellen. Als ORM-Schicht zwischen 
Node.JS und MySQL nutzen wir sequelizejs.

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
| Nutzer | meine E-Mail-Adresse und mein Passwort im Loginformular eingeben | ich mich mit diesen Daten in der buyLocal App anmelden kann. | Ich kann meine Login-Daten eingeben und der Server liefert eine passende Rückmeldung zum Login. |
| Nutzer | meine E-Mail-Adresse in das Passwort-Vergessen-Formular eingeben | ich mein Passwort über meine E-Mail-Adresse zurücksetzen kann. | Ich kann meine E-Mail eingeben und die E-Mail mit dem Link zum Zurücksetzen des Passworts wird gesendet. |
| Nutzer | mich mit meiner E-Mail, einem Passwort und meinem Geburtsdatum registrieren | ich ein Konto für BuyLocal anlegen kann. | Ich kann mit meinen angegebenen Daten ein Konto anlegen. |

### Suche
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Käufer | die Ergebnisse einer Suchanfrage auf einer Karte dargestellt bekommen | ich die Orte zum Abholen der Produkte visuell besser einordnen kann. | Alle gefundenen Angebote im Umkreis von 50km zu einer Suchanfrage werden auf einer Karte angezeigt. |
| Käufer | Produkte anhand von Tags, Kategorien oder Schlagwörtern suchen | ich schnell und einfach ein passendes Produkt finde. | Angebote können durch Tags, Kategorien und Schlagwörter gefiltert werden. |
| Käufer | Suchanfragen speichern | ich benachrichtigt werde, wenn neue Angebote eingestellt werden, auf die eine meiner Suchanfrage zutrifft. | Eine Push-Nachricht erscheint, sobald ein neues Angebot erstellt wurde, welches die Kriterien einer gespeicherten Suchanfrage erfüllt. |
| Käufer | meine gespeicherten Suchen auf einer Karte anzeigen lassen | ich sehen kann, welche, für mich relevanten, Angebote in meiner Nähe sind. | Angebote werden auf einer passend skalierten oder skalierbaren Karte angezeigt. |

### Angebote
| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Käufer | Angebote ansehen | ich den Verkäufer bei Interesse kontaktieren kann. | Ich kann mir ein beliebiges Angebot im Detail anzeigen lassen. |
| Nutzer | Angebote melden | betrügerische oder irreführende Angebote entfernt werden können. | Ich kann Angebote anhand von vorgegebenen Kategorien melden und optional einen Text angeben. |
| Verkäufer | Angebote erstellen können | ich ein Produkt verkaufen kann. | Ich kann ein Angebit mit Details eintragen und das Angebot auf dem Server erstellen. |
| Verkäufer | Angebote löschen können | ich verkaufte oder anderweitig nicht mehr zum verkaufstehende Produkte aus meinen Angeboten entfernen kann | Ich kann Angebote löschen, so dass Sie nicht mehr auf dem Server vorhanden sind und keinem Interessenten mehr angezeigt werden. |

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
| Käufer | einen Verkäufer kontaktieren | ich ihm bei Interesse an einem seiner Angebote eine Nachricht senden kann. | Ich kann dem Verkäufer Nachrichten senden. |
| Nutzer | einem Verkäufer/Käufer einen Preisvorschlag senden können | ich eine Möglichkeit habe, ihm meine Preisvorstellungen mitzuteilen. | Ich kann Preisvorschläge zu einem Produkt an die Verhandlungspartei senden. |
| Nutzer | einen Preisvorschlag, der mir gesendet wurde, annehmen oder ablehnen können | ich den Preisvorstellungen des Käufers/Verkäufers zustimmen oder weitere Presiverhandlungen führen kann. | Ich kann Presivorschläge akzeptieren oder ablehnen und meiner Verhandlungspartei wird dies mitgeteilt.
| Nutzer | einen Nutzer blockieren | ich bei Konflikten, Spam oder Betrug eine Möglichkeit habe, mich vor dem blockierten Nutzer zu schützen. | Nachrichten vom blockierten Nutzer werden nicht mehr angezeigt. |
| Nutzer | einen Nutzer melden | ich bei Betrug oder Regelverletzung eine Möglichkeit habe, mich und andere Nutzer zu schützen. | Ich kann einen Nutzer melden und diese Meldung wird im System verarbeitet. |

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
### Sequenzdiagramm der Chatverschlüsselung
![Chatverschluesselung](https://github.com/ChristopherKL/RichClient/blob/master/Pflichtenheft/SequenzdiagrammChat.jpg)

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
## Public Key Verfahren
Werden genutzt um Nachrichten asymmetrisch zu verschlüsseln dabei wird der öffentliche Schlüssel genutzt um eine Nachricht zu verschlüsseln,
und der private Schlüssel um diese Nachricht wieder zu entschlüsseln.
Der öffentliche Schlüssel kann eine Nachricht nicht wieder entschlüsseln, sondern ist eine Einwegfunktion und kann lediglich verschlüsseln

## RSA
Ist ein asymmetrisches Verschlüsselungsverfahren entwickelt von Rivest, Shamir und Adleman.
Es nutzt die mathematischen Probleme der Primzahlbestimmung und des Faktorisierens um Sicherheit zu erzeugen.
Ist eines der gängigsten Verfahren der heutigen Zeit.

## PBKDF2
Password-Based Key Derivation Function 2
ist ein Verfahren um aus einem geeigneten Passwort einen Pseudozufallszahlen-Stream zu erzeugen.
ist von RSA Laboratories entwickelt worden.
## SHA512
Ist eine Kryptographische Hashfunktion, die den Hashwert eines Eingabewortes als 512 Byte String sichert.
Gehört zur SHA 2 Familie an Hashfunktionen und ist eine der verbreiteten Funktionen zum rückspeichern von Passwörtern in Datenbanken

    
        - Definitionen, Abkürzungen, Begriffe


## 5.2 Referenzen
        - Handbücher, Gesetze


## 5.3 Index
