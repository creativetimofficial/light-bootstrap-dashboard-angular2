import { Component ,HostListener} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = offset > 300; 
  }
  allProduitsNodevis = [
    { 
      id: 1,
      titre: 'ET6_KIT',
      description: 'Ce produit est un traceur GPS de haute précision, idéal pour la géolocalisation de véhicules.',
      image: 'assets/img/ET6_KIT.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GPRS',
        'SMS - ADVANCED AUTOMOTIVE'
      ],
      prix:'495,000DT'
    },
    {
      id: 2,
      titre: 'ET8_KIT',
      description: 'Un modèle avancé de traceur GPS, avec connectivité améliorée et autonomie prolongée.',
      image: 'assets/img/ET8_KIT.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GPRS',
        'SMS - ETANCHE AUTOMOTIVE'
        
      ],
      prix:'435,000DT'
    },
    {
      id: 3,
      titre: 'ETBLE_KIT',
      description: 'Traceur GPS avec technologie BLE pour un suivi en temps réel via smartphone.',
      image: 'assets/img/ETBLE_KIT.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GPRS',
        'SMS - AUTOMOTIVE'
      ],
      prix: '345,000 DT'
    },
    {
      id: 4,
      titre: 'ETX_KIT',
      description: 'Traceur GPS robuste conçu pour les environnements difficiles et les flottes.',
      image: 'assets/img/ETX_KIT.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GPRS',
        'SMS - AUTOMOTIVE'
      ],
      prix: '195,000DT'
    },
    {
      id: 5,
      titre: 'ETCAN_KIT',
      description: 'Traceur GPS avancé conçu pour les véhicules lourds et la gestion de flotte, avec surveillance du carburant et connectivité BUSCAN.',
      image: 'assets/img/ETCAN_KIT.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GPRS',
        'SMS - BUSCAN',
        'CARBURANT AUTOMOTIVE'
      ],
      prix: '695,000DT'
    },
    {
      id: 6,
      titre: 'MiniTrace_KIT',
      description: 'Un mini traceur GPS compact pour les objets personnels ou petits véhicules.',
      image: 'assets/img/MiniTrace_ KIT.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GPRS',
        'SMS - PORTABLE'
      ],
      prix: '695,000DT'
    },
    {
      id: 7,
      titre: 'Camtrack',
      description: 'Caméra de surveillance avec GPS intégré pour le suivi vidéo et géographique.',
      image: 'assets/img/Camtrack.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'DASHCAM GPS 4G 3CH',
        'FRONT CAM INSIDE CAM',
        'WIFI,MICRO&SPEAKER, SOS, ADAS, DMS - OPTIONAL EXT CAM, OBD, RFID, ',
        'TF CARD'
      ],
      prix: '1 195,000DT'
    },
    {
      id: 8,
      titre: 'SMART_LOCK',
      description: 'Serrure connectée avec traçabilité GPS pour les containers et accès sécurisés.',
      image: 'assets/img/SMART_lo.png',
      categorie: 'GPS TRACKER',
      caracteristiques: [
        'KIT TRACKING GPS',
        'GRPS',
        'SMS - TRAILER SMART LOCK',
      ],
      prix: '1 195,000DT'
    }

  ];
  
  allProduitsAvecDevis = [
    {
      id: 9,
      titre: 'DISJONCTEUR INTELLIGENT',
      description: 'Système de disjoncteur connecté permettant la surveillance et le contrôle à distance.',
      image: 'assets/img/disjoncteur_intelligent.png',
      categorie: 'IOT',
      caracteristiques: [
        'Fermer à distance n importe quel disjoncteur.',
        'Planifier l arrêt et le démarrage automatiques des machines.',
        'Mesurer la tension électronique à distance.',
      ],
    },
    {
      id: 10,
      titre: 'TAGIT RFID',
      description: 'Solution RFID intelligente pour la gestion et l’identification automatisée des actifs.',
      image: 'assets/img/tagit_rfid.png',
      categorie: 'IOT',
      caracteristiques: [
        'traçabilité et sécurisation de vos biens',
        'Données en temps réel'
      ],
    },
    {
      id: 11,
      titre: 'EASY 360',
      description: 'Système IoT complet pour le suivi énergétique et la gestion des bâtiments intelligents.',
      image: 'assets/img/easy_360.png',
      categorie: 'IOT',
      caracteristiques: [
        'surveillance en temps réel des niveaux d’oxygène, de l’humidité, de la température, de la pression, intégrant le GPS, le WiFi, le Bluetooth',
        'compatible avec les protocoles de communication Modbus RS485 et RS422'
      ],
    },
    {
      id: 12,
      titre: 'FUEL RESCUE',
      description: 'Système IoT complet pour le suivi énergétique et la gestion des bâtiments intelligents.',
      image: 'assets/img/FUEL_RESCUE.png',
      categorie: 'IOT',
      caracteristiques: [
        'Détecte rapidement les anomalies telles que le vol de carburant, envossie des alertes', 
        'suit l’activité du réservoir', 'enregistre les pleins et les retraits',
        'simulation et reconstitution de trajets'
      ],
    }
  ];

  produits_nodevis = [...this.allProduitsNodevis];
  produits_avecdevis = [...this.allProduitsAvecDevis];

  petitsCadres = [
    { label: 'Tous', active: true },
    { label: 'GPS Trackers', active: false },
    { label: 'Solutions IoT', active: false },
    { label: 'Solutions IT', active: false }
  ];

  setActive(label: string) {
    this.petitsCadres.forEach(c => c.active = (c.label === label));

    if (label === 'Tous') {
      this.produits_nodevis = [...this.allProduitsNodevis];
      this.produits_avecdevis = [...this.allProduitsAvecDevis];
    } else if (label === 'GPS Trackers') {
      this.produits_nodevis = this.allProduitsNodevis.filter(p => p.categorie.toUpperCase().includes('GPS'));
      this.produits_avecdevis = [];
    } else if (label === 'Solutions IoT') {
      this.produits_avecdevis = this.allProduitsAvecDevis.filter(p => p.categorie.toUpperCase().includes('IOT'));
      this.produits_nodevis = [];
    } else if (label === 'Solutions IT') {
      this.produits_avecdevis = [];
      this.produits_nodevis = [];
    }
  }
  isSolutionsITSelected(): boolean {
  return this.petitsCadres.find(c => c.label === 'Solutions IT')?.active || false;
}

}

