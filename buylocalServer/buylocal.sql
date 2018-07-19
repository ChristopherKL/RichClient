-- MySQL dump 10.13  Distrib 5.5.59, for debian-linux-gnu (armv7l)
--
-- Host: localhost    Database: buylocal
-- ------------------------------------------------------
-- Server version	5.5.59-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

--
-- Table structure for table `Kategorie`
--

DROP TABLE IF EXISTS `Kategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kategorie` (
  `KategorieID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `UeberKategorie` int(11) DEFAULT NULL,
  PRIMARY KEY (`KategorieID`),
  KEY `fk_Kategorie_1_idx` (`UeberKategorie`),
  CONSTRAINT `fk_Kategorie_1` FOREIGN KEY (`UeberKategorie`) REFERENCES `Kategorie` (`KategorieID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (1,"Elektronik");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (2,"Haustiere");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (3,"Haus & Garten");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (4,"Familie,Kind & Baby");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (5,"Freizeit, Hobby & Nachbarschaft");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (6,"Immobilien");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (7,"Auto, Rad & Boot");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (8,"Jobs");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (9,"Musik, Filme & Bücher");
INSERT INTO `Kategorie` (`KategorieID`,`Name`) VALUES (10,"Eintrittskarten & Tickets");

INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (11,"Handy & Telefon",1);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (12,"Haushaltsgeräte",1);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (21,"Hunde",2);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (22,"Katzen",2);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (31,"Küche & Esszimmer",3);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (32,"Wohnzimmer",3);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (41,"Baby- & Kinderkleidung",4);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (42,"Kinderwagen & Buggys",4);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (51,"Kunst & Antiquitäten",5);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (52,"Sammeln",5);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (61,"Gewerbeimmobilien",6);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (62,"Häuser zum Kauf",6);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (71,"Autos",7);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (72,"Fahrräder & Zubehör",7);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (81,"Gastronomie & Tourismus",8);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (82,"Bau, Handwerk & Produktion",8);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (91,"Bücher & Zeitschriften",9);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (92,"Film & DVD",9);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (101,"Konzerte",10);
INSERT INTO `Kategorie` (`KategorieID`,`Name`,`UeberKategorie`) VALUES (102,"Bahn",10);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Benutzer`
--

DROP TABLE IF EXISTS `Benutzer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Benutzer` (
  `BenutzerID` int(11) NOT NULL AUTO_INCREMENT,
  `BenutzerName` varchar(45) NOT NULL,
  `Mail` varchar(45) NOT NULL,
  `Passwort` varchar(64) NOT NULL,
  `PublicKey` varchar(512) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`BenutzerID`),
  UNIQUE KEY `Mail_UNIQUE` (`Mail`),
  UNIQUE KEY `BenutzerName_UNIQUE` (`BenutzerName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `Angebot`;

--
-- Table structure for table `Angebot`
--

/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Angebot` (
  `AngebotID` int(11) NOT NULL AUTO_INCREMENT,
  `Titel` varchar(45) NOT NULL,
  `Preis` decimal(10,2) DEFAULT NULL,
  `Beschreibung` varchar(512) DEFAULT NULL,
  `Bild1` LONGTEXT NOT NULL,
  `Bild2` LONGTEXT DEFAULT NULL,
  `Bild3` LONGTEXT DEFAULT NULL,
  `Bild4` LONGTEXT DEFAULT NULL,
  `Bild5` LONGTEXT DEFAULT NULL,
  `PLZ` varchar(10) NOT NULL,
  `Straße` varchar(128) DEFAULT NULL,
  `Hausnummer` varchar(10) DEFAULT NULL,
  `BenutzerID` int(11) NOT NULL,
  `KategorieID`int(11) NOT NULL,
  `reg_date` datetime NOT NULL,
  `lon` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AngebotID`),
  KEY `fk_Angebot_1_idx` (`BenutzerID`),
  CONSTRAINT `fk_Angebot_1` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Angebot_2` FOREIGN KEY (`KategorieID`) REFERENCES `Kategorie` (`KategorieID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AngebotHashtag`
--

DROP TABLE IF EXISTS `AngebotHashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AngebotHashtag` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AngebotID` int(11) NOT NULL,
  `HashtagName` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_AngebotHashtag_2_idx` (`HashtagName`),
  CONSTRAINT `fk_AngebotHashtag_1` FOREIGN KEY (`AngebotID`) REFERENCES `Angebot` (`AngebotID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_AngebotHashtag_2` FOREIGN KEY (`HashtagName`) REFERENCES `Hashtag` (`Name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Verhandlung`
--

DROP TABLE IF EXISTS `Verhandlung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Verhandlung` (
  `VerhandlungID` int(11) NOT NULL AUTO_INCREMENT,
  `AngebotID` int(11) DEFAULT NULL,
  `Betreff` varchar(45) NOT NULL,
  `Absender` int(11) DEFAULT NULL,
  `Empfänger` int(11) DEFAULT NULL,
  `EmpfängerCheck` boolean DEFAULT NULL,
  `AbsenderCheck` boolean DEFAULT NULL,
  `AbsenderSchlüssel` varchar(1000) NOT NULL,
  `EmpfängerSchlüssel` varchar(1000) NOT NULL,
  PRIMARY KEY (`VerhandlungID`),
  KEY `fk_Verhandlung_2_idx` (`Empfänger`),
  KEY `fk_Verhandlung_1_idx` (`Absender`),
  KEY `fk_Verhandlung_0_idx` (`AngebotID`),
  CONSTRAINT `fk_Verhandlung_1` FOREIGN KEY (`Empfänger`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Verhandlung_2` FOREIGN KEY (`Absender`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_AngebotVerhandlung_1` FOREIGN KEY (`AngebotID`) REFERENCES `Angebot` (`AngebotID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Bewertung`
--

DROP TABLE IF EXISTS `Bewertung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bewertung` (
  `BewertungID` int(11) NOT NULL AUTO_INCREMENT,
  `Datum` datetime DEFAULT NULL,
  `Sterne` double(3,1) DEFAULT NULL,
  `Bewerter` int(11) DEFAULT NULL,
  `Bewerteter` int(11)NOT NULL,
  `Text` varchar(200) DEFAULT NULL,
  `VerhandlungID` int(11) DEFAULT NULL,
  PRIMARY KEY (`BewertungID`),
  KEY `fk_Bewertung_1_idx` (`Bewerter`),
  KEY `fk_Bewertung_2_idx` (`Bewerteter`),
  CONSTRAINT `fk_Verhandlung` FOREIGN KEY (`VerhandlungID`) REFERENCES `Verhandlung` (`VerhandlungID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bewertung_1` FOREIGN KEY (`Bewerter`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bewertung_2` FOREIGN KEY (`Bewerteter`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Hashtag`
--

DROP TABLE IF EXISTS `Hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hashtag` (
  `Name` varchar(30) NOT NULL,
  `NutzungsAnz` int(11) DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Meldung`
--

DROP TABLE IF EXISTS `Meldung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Meldung` (
  `MeldungID` int(11) NOT NULL,
  `Datum` datetime DEFAULT NULL,
  `Grund` varchar(200) DEFAULT NULL,
  `Melder` int(11) DEFAULT NULL,
  `Angebot` int(11) DEFAULT NULL,
  PRIMARY KEY (`MeldungID`),
  KEY `fk_Meldung_1_idx` (`Melder`),
  KEY `fk_Meldung_2_idx` (`Angebot`),
  CONSTRAINT `fk_Meldung_1` FOREIGN KEY (`Melder`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meldung_2` FOREIGN KEY (`Angebot`) REFERENCES `Angebot` (`AngebotID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Nachricht`
--

DROP TABLE IF EXISTS `Nachricht`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Nachricht` (
  `NachrichtID` int(11) NOT NULL AUTO_INCREMENT,
  `VerhandlungID` int(11) NOT NULL,
  `Datum` datetime NOT NULL,
  `Text` varchar(1000) NOT NULL,
  `Gelesen` timestamp DEFAULT 0,
  `Absender` int(11) NOT NULL,
  PRIMARY KEY (`NachrichtID`),
  CONSTRAINT `fk_Nachricht_1` FOREIGN KEY (`VerhandlungID`) REFERENCES `Verhandlung` (`VerhandlungID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BereitsAngezeigt`
--

DROP TABLE IF EXISTS `BereitsAngezeigt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BereitsAngezeigt` (
  `BereitsAngezeigtID` int(11) NOT NULL AUTO_INCREMENT,
  `SuchanfrageID` int(11) NOT NULL,
  `AngebotID` int(11) NOT NULL,
  PRIMARY KEY (`BereitsAngezeigtID`),
  CONSTRAINT `fk_BereitsAngezeigt_1` FOREIGN KEY (`SuchanfrageID`) REFERENCES `Suchanfrage` (`SuchanfrageID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_BereitsAngezeigt_2` FOREIGN KEY (`AngebotID`) REFERENCES `Angebot` (`AngebotID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Suchanfrage`
--

DROP TABLE IF EXISTS `Suchanfrage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Suchanfrage` (
  `SuchanfrageID` int(11) NOT NULL AUTO_INCREMENT,
  `BenutzerID` int(11) DEFAULT NULL,
  `AnfrageDaten` LONGTEXT DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SuchanfrageID`),
  KEY `fk_Suchanfrage_1_idx` (`BenutzerID`),
  CONSTRAINT `fk_Suchanfrage_1` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-29 10:28:55
