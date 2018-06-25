export const CATEGORIES = ['Auto, Rad & Boot', 'Dienstleistungen', 'Eintrittskarten & Tickets', 'Elektronik',
'Familie, Kind & Babie', 'Freizeit, Hobby & Nachbarschaft', 'Haus & Garten', 'Haustiere', 'Immobilien', 'Jobs',
'Mode & Beauty', 'Musik, Filme & Bücher', 'Unterricht & Kurse', 'Zu veschenken & Tauschen'];

//Auto, Rad & Boot
export const SUBCATEGORIES0 = ['Autos','Autoteile & Reifen','Boote & Bootszubehör','Fahrräder & Zubehör','Motorräder & Motorroller',
'Motoradteile & Zubehör','Nutzfahrzeuge & Anhänger','Wohnwagen & -mobile','Weiteres'];

//Dienstleistungen
export const SUBCATEGORIES1 = ['Altenpflege','Auto, Rad & Boot','Babysitter & Kinderbetreuung','Elektronik','Haus & Garten','Künstler & Musiker',
'Reise & Event','Tierbetreuung & Training','Umzug & Transport','Weitere'];

//Eintrittskarten & Tickets
export const SUBCATEGORIES2 = ['Bahn & ÖPNV','Comedy & Kabarett','Gutscheine','Kinder','Konzerte','Sport','Theater & Musical','Weitere'];

//Elektronik
export const SUBCATEGORIES3 = ['Audio & Hifi','Foto','Handy & Telefon','Haushaltsgeräte','Konsolen',
'Notebooks','PCs','PC-Zubehör & Software','Tablets & Reader','TV & Video','Videospiele','Weiteres'];

//Familie, Kind & Baby
export const SUBCATEGORIES4 = ['Baby- & Kinderbekleidung','Baby- & Kinderschuhe','Baby-Ausstattung',
'Babyschalen & Kindersitze','Kinderwagen & Buggys','Kinderzimmermöbel','Spielzeug','Weiteres'];

//Freizeit, Hobby & Nachbarschaft
export const SUBCATEGORIES5 = ['Esoterik & Spirituelles','Essen & Trinken','Freizeitaktivitäten','Handarbeit, Basteln & Kunsthandwerk',
'Kunst & Antiquitäten','Künstler & Musiker','Modellbau','Reise & Eventservices','Sammeln','Sport & Camping','Trödel',
'Verloren & Gefunden', 'Weiteres'];

//Haus & Garten
export const SUBCATEGORIES6 = ['Badezimmer','Büro','Dekorationen','Gartenzubehör & Pflanzen','Heimtextilien'
,'Heimwerken','Küche & Esszimmer','Lampen & Licht','Schlafzimmer','Wohnzimmer','Weiteres'];

//Haustiere
export const SUBCATEGORIES7 = ['Fische','Hunde','Katzen','Kleintiere','Pferde','Reptilien','Vermisste Tiere','Vögel','Zubehör','Weiteres'];

//Immobilien
export const SUBCATEGORIES8 = ['Auf Zeit & WG','Eigentumswohnungen','Ferien- & Auslandsimmobilien','Garagen & Stellplätze',
'Gewerbeimmobilien','Grundstücke & Gärten','Häuser zum Kauf','Häuser zur Miete','Mietwohnungen','Weitere'];

//Jobs
export const SUBCATEGORIES9 = ['Ausbildung','Bau, Handwerk & Produktion','Büroarbeit & Verwaltung','Gastronomie & Tourismus',
'Kundenservice & Call Center','Mini- & Nebenjobs','Praktika','Sozialer Sektor & Pflege','Transport, Logistik & Verkehr',
'Vertrieb, Einkauf & Verkauf','Weitere'];

//Mode & Beauty
export const SUBCATEGORIES10 = ['Accessoires & Schmuck','Beauty & Gesundheit','Damenbekleidung','Damenschuhe','Herrenbekleidung',
'Herrenschuhe','Weiteres'];

//Musik, Filme & Bücher
export const SUBCATEGORIES11 = ['Bücher & Zeitschriften','Büro & Schreibwaren','Comics','Fachbücher, Schule & Studium','Film & DVD',
'Musik & CDs','Musikinstrumente','Weitere'];

//Unterricht & Kurse
export const SUBCATEGORIES12 = ['Beauty & Gesundheit','Computerkurse','Esoterik & Spirituelles','Kochen & Backen','Kunst & Gestaltung',
'Musik & Gesang','Sportkurse','Sprachkurse','Tanzkurse','Weiterbildung','Weitere'];

//Zu veschenken & Tauschen
export const SUBCATEGORIES13 = ['Tauschen', 'Verleihen', 'Zu verschenken'];

export function subcategorieToID(cat,subcat){
    switch (cat) {
        case 'Auto, Rad & Boot':
            switch (subcat) {
                case 'Autos','Autoteile & Reifen':
                    return 11;
                case 'Boote & Bootszubehör':
                    return 12;
                case 'Fahrräder & Zubehör':
                    return 13;
                case 'Motorräder & Motorroller':
                    return 14;
                case 'Motoradteile & Zubehör':
                    return 15;
                case 'Nutzfahrzeuge & Anhänger':
                    return 16;
                case 'Wohnwagen & -mobile':
                    return 17;
                case 'Weiteres':
                    return 18;
                default:
                    return -1;
            }
        case 'Dienstleistungen':
            switch (subcat) {
                case 'Altenpflege':
                    return 21;
                case 'Auto, Rad & Boot':
                    return 22;
                case 'Babysitter & Kinderbetreuung':
                    return 23;
                case 'Elektronik':
                    return 24;
                case 'Haus & Garten':
                    return 25;
                case 'Künstler & Musiker':
                    return 26;
                case 'Reise & Event':
                    return 27;
                case 'Tierbetreuung & Training':
                    return 28;
                case 'Umzug & Transport':
                    return 29;
                case 'Weitere':
                    return 210;
                default:
                    return -1;
            }
        case 'Eintrittskarten & Tickets':
            switch (subcat) {
                case 'Bahn & ÖPNV':
                    return 31;
                case 'Comedy & Kabarett':
                    return 32;
                case 'Gutscheine':
                    return 34;
                case 'Kinder':
                    return 35;
                case 'Konzerte':
                    return 36;
                case 'Sport':
                    return 37;
                case 'Theater & Musical':
                    return 38;
                case 'Weitere':
                    return 39;
                default:
                    return -1;
            }
        case 'Elektronik':
            switch (subcat) {
                case 'Audio & Hifi':
                    return 41;
                case 'Foto','Handy & Telefon':
                    return 42;
                case 'Haushaltsgeräte':
                    return 43;
                case 'Konsolen':
                    return 44;
                case 'Notebooks':
                    return 45;
                case 'PCs':
                    return 46;
                case 'PC-Zubehör & Software':
                    return 47;
                case 'Tablets & Reader':
                    return 48;
                case 'TV & Video':
                    return 49;
                case 'Videospiele':
                    return 410;
                case 'Weiteres':
                    return 411;
                default:
                    return -1;
            }
        case 'Familie, Kind & Babie':
            switch (subcat) {
                case 'Baby- & Kinderbekleidung':
                    return 51;
                case 'Baby- & Kinderschuhe':
                    return 52;
                case 'Baby-Ausstattung':
                    return 53;
                case 'Babyschalen & Kindersitze':
                    return 54;
                case 'Kinderwagen & Buggys':
                    return 55;
                case 'Kinderzimmermöbel':
                    return 56;
                case 'Spielzeug':
                    return 57;
                case 'Weiteres':
                    return 58;
                default:
                    return -1;
            }
        case 'Freizeit, Hobby & Nachbarschaft':
            switch (subcat) {
                case 'Esoterik & Spirituelles':
                    return 61;
                case 'Essen & Trinken':
                    return 62;
                case 'Freizeitaktivitäten':
                    return 63;
                case 'Handarbeit, Basteln & Kunsthandwerk':
                    return 64;
                case 'Kunst & Antiquitäten':
                    return 65;
                case 'Künstler & Musiker':
                    return 66;
                case 'Modellbau':
                    return 67;
                case 'Reise & Eventservices':
                    return 68;
                case 'Sammeln':
                    return 69;
                case 'Sport & Camping':
                    return 610;
                case 'Trödel':
                    return 611;
                case 'Verloren & Gefunden':
                    return 612;
                case 'Weiteres':
                    return 613;
                default:
                    return -1;
            }
        case 'Haus & Garten':
            switch (subcat) {
                case 'Badezimmer':
                    return 71;
                case 'Büro':
                    return 72;
                case 'Dekorationen':
                    return 73;
                case 'Gartenzubehör & Pflanzen':
                    return 74;
                case 'Heimtextilien':
                    return 75;
                case 'Heimwerken':
                    return 76;
                case 'Küche & Esszimmer':
                    return 77;
                case 'Lampen & Licht':
                    return 78;
                case 'Schlafzimmer':
                    return 79;
                case 'Wohnzimmer':
                    return 710;
                case 'Weiteres':
                    return 711;
                default:
                    return -1;
            }
        case 'Haustiere':
            switch (subcat) {
                case 'Fische':
                    return 81;
                case 'Hunde':
                    return 82;
                case 'Katzen':
                    return 83;
                case 'Kleintiere':
                    return 84;
                case 'Pferde':
                    return 85;
                case 'Reptilien':
                    return 86;
                case 'Vermisste Tiere':
                    return 87;
                case 'Vögel':
                    return 88;
                case 'Zubehör':
                    return 89;
                case 'Weiteres':
                    return 810;
                default:
                    return -1;
            }
        case 'Immobilien':
            switch (subcat) {
                case 'Auf Zeit & WG':
                    return 91;
                case 'Eigentumswohnungen':
                    return 92;
                case 'Ferien- & Auslandsimmobilien':
                    return 93;
                case 'Garagen & Stellplätze':
                    return 94;
                case 'Gewerbeimmobilien':
                    return 95;
                case 'Grundstücke & Gärten':
                    return 96;
                case 'Häuser zum Kauf':
                    return 97;
                case 'Häuser zur Miete':
                    return 98;
                case 'Mietwohnungen':
                    return 99;
                case 'Weitere':
                    return 910;
                default:
                    return -1;
            }
        case 'Jobs':
            switch (subcat) {
                case 'Ausbildung':
                    return 101;
                case 'Bau, Handwerk & Produktion':
                    return 102;
                case 'Büroarbeit & Verwaltung':
                    return 103;
                case 'Gastronomie & Tourismus':
                    return 104;
                case 'Kundenservice & Call Center':
                    return 105;
                case 'Mini- & Nebenjobs':
                    return 106;
                case 'Praktika':
                    return 107;
                case 'Sozialer Sektor & Pflege':
                    return 108;
                case 'Transport, Logistik & Verkehr':
                    return 109;
                case 'Vertrieb, Einkauf & Verkauf':
                    return 1010;
                case 'Weitere':
                    return 1011;
                default:
                    return -1;
            }
        case 'Mode & Beauty':
            switch (subcat) {
                case 'Accessoires & Schmuck':
                    return 111;
               case 'Beauty & Gesundheit':
                    return 112;
                case 'Damenbekleidung':
                    return 113;
                case 'Damenschuhe':
                    return 114;
                case 'Herrenbekleidung':
                    return 115;
                case 'Herrenschuhe':
                    return 116;
                case 'Weiteres':
                    return 117;
                default:
                    return -1;
            }
        case 'Musik, Filme & Bücher':
            switch (subcat) {
                case 'Bücher & Zeitschriften':
                    return 121;
                case 'Büro & Schreibwaren':
                    return 122;
                case 'Comics':
                    return 123;
                case 'Fachbücher, Schule & Studium':
                    return 124;
                case 'Film & DVD':
                    return 125;
                case 'Musik & CDs':
                    return 126;
                case 'Musikinstrumente':
                    return 127;
                case 'Weitere':
                    return 128;
                default:
                    return -1;
            }
        case 'Unterricht & Kurse':
            switch (subcat) {
                case 'Beauty & Gesundheit':
                    return 131;
                case 'Computerkurse':
                    return 132;
                case 'Esoterik & Spirituelles':
                    return 133;
                case 'Kochen & Backen':
                    return 134;
                case 'Kunst & Gestaltung':
                    return 135;
                case 'Musik & Gesang':
                    return 136;
                case 'Sportkurse':
                    return 137;
                case 'Sprachkurse':
                    return 138;
                case 'Tanzkurse':
                    return 139;
                case 'Weiterbildung':
                    return 1310;
                case 'Weitere':
                    return 1311;
                default:
                    return -1;
            }
        case 'Zu veschenken & Tauschen':
            switch (subcat) {
                case 'Tauschen':
                    return 141;
                case 'Verleihen':
                    return 142;
                case 'Zu verschenken':
                    return 143;
                default:
                    return -1;
            }
        default:
            return -1;
    }
}