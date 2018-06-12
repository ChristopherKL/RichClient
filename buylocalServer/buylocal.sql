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

--
-- Table structure for table `Angebot`
--

DROP TABLE IF EXISTS `Angebot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Angebot` (
  `AngebotID` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Preis` decimal(5,2) DEFAULT NULL,
  `Beschreibung` varchar(200) DEFAULT NULL,
  `Bild` varchar(200) DEFAULT NULL,
  `Anschrift` varchar(200) DEFAULT NULL,
  `Anbieter` int(11) DEFAULT NULL,
  PRIMARY KEY (`AngebotID`),
  KEY `fk_Angebot_1_idx` (`Anbieter`),
  CONSTRAINT `fk_Angebot_1` FOREIGN KEY (`Anbieter`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AngebotHashtag`
--

DROP TABLE IF EXISTS `AngebotHashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AngebotHashtag` (
  `AngebotID` int(11) NOT NULL,
  `HashtagName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AngebotID`),
  KEY `fk_AngebotHashtag_2_idx` (`HashtagName`),
  CONSTRAINT `fk_AngebotHashtag_1` FOREIGN KEY (`AngebotID`) REFERENCES `Angebot` (`AngebotID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_AngebotHashtag_2` FOREIGN KEY (`HashtagName`) REFERENCES `Hashtag` (`Name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AngebotKategorie`
--

DROP TABLE IF EXISTS `AngebotKategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AngebotKategorie` (
  `AngebotID` int(11) NOT NULL,
  `KategorieID` int(11) DEFAULT NULL,
  PRIMARY KEY (`AngebotID`),
  KEY `fk_AngebotKategorie_2_idx` (`KategorieID`),
  CONSTRAINT `fk_AngebotKategorie_1` FOREIGN KEY (`AngebotID`) REFERENCES `Angebot` (`AngebotID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_AngebotKategorie_2` FOREIGN KEY (`KategorieID`) REFERENCES `Kategorie` (`KategorieID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
  `Passwort` varchar(128) NOT NULL,
  `PublicKey` varchar(128) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`BenutzerID`),
  UNIQUE KEY `Mail_UNIQUE` (`Mail`)
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
  `Sterne` int(11) DEFAULT NULL,
  `Bewerter` int(11) DEFAULT NULL,
  `Bewerteter` int(11) DEFAULT NULL,
  `Text` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`BewertungID`),
  KEY `fk_Bewertung_1_idx` (`Bewerter`),
  KEY `fk_Bewertung_2_idx` (`Bewerteter`),
  CONSTRAINT `fk_Bewertung_1` FOREIGN KEY (`Bewerter`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bewertung_2` FOREIGN KEY (`Bewerteter`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `Kategorie`
--

DROP TABLE IF EXISTS `Kategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kategorie` (
  `KategorieID` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `UeberKategorie` int(11) DEFAULT NULL,
  PRIMARY KEY (`KategorieID`),
  KEY `fk_Kategorie_1_idx` (`UeberKategorie`),
  CONSTRAINT `fk_Kategorie_1` FOREIGN KEY (`UeberKategorie`) REFERENCES `Kategorie` (`KategorieID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `NachrichtID` int(11) NOT NULL,
  `Datum` datetime DEFAULT NULL,
  `Betreff` varchar(45) DEFAULT NULL,
  `Text` varchar(1000) DEFAULT NULL,
  `Gelesen` datetime DEFAULT '0000-00-00 00:00:00',
  `Absender` int(11) DEFAULT NULL,
  `Empfänger` int(11) DEFAULT NULL,
  PRIMARY KEY (`NachrichtID`),
  KEY `fk_Nachricht_2_idx` (`Empfänger`),
  KEY `fk_Nachricht_1` (`Absender`),
  CONSTRAINT `fk_Nachricht_1` FOREIGN KEY (`Absender`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Nachricht_2` FOREIGN KEY (`Empfänger`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Suchanfrage`
--

DROP TABLE IF EXISTS `Suchanfrage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Suchanfrage` (
  `SuchanfrageID` int(11) NOT NULL,
  `Ersteller` int(11) DEFAULT NULL,
  PRIMARY KEY (`SuchanfrageID`),
  KEY `fk_Suchanfrage_1_idx` (`Ersteller`),
  CONSTRAINT `fk_Suchanfrage_1` FOREIGN KEY (`Ersteller`) REFERENCES `Benutzer` (`BenutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SuchanfrageHashtag`
--

DROP TABLE IF EXISTS `SuchanfrageHashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SuchanfrageHashtag` (
  `SuchanfrageID` int(11) NOT NULL,
  `HashtagName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SuchanfrageID`),
  KEY `fk_SuchanfrageHashtag_2_idx` (`HashtagName`),
  CONSTRAINT `fk_SuchanfrageHashtag_1` FOREIGN KEY (`SuchanfrageID`) REFERENCES `Suchanfrage` (`SuchanfrageID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_SuchanfrageHashtag_2` FOREIGN KEY (`HashtagName`) REFERENCES `Hashtag` (`Name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SuchanfrageKategorie`
--

DROP TABLE IF EXISTS `SuchanfrageKategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SuchanfrageKategorie` (
  `SuchanfrageID` int(11) NOT NULL,
  `KategorieID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SuchanfrageID`),
  KEY `fk_SuchanfrageKategorie_2_idx` (`KategorieID`),
  CONSTRAINT `fk_SuchanfrageKategorie_1` FOREIGN KEY (`SuchanfrageID`) REFERENCES `Suchanfrage` (`SuchanfrageID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_SuchanfrageKategorie_2` FOREIGN KEY (`KategorieID`) REFERENCES `Kategorie` (`KategorieID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
