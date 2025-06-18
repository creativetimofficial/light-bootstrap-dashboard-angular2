import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }
 produitsIot = [
  {
    id: 1,
    nom: 'Capteur Température',
    description: 'Mesure en temps réel la température ambiante.',
    prix: 120,
    image: '/assets/img/Camtrack.jpg'
  },
  {
    id: 2,
    nom: 'Caméra HD',
    description: 'Caméra connectée avec vision nocturne.',
    prix: 300,
    image: '/assets/img/Camtrack.jpg'
  }
];

produitsGps = [
  {
    id: 101,
    nom: 'GPS Tracker A1',
    description: 'Dispositif de géolocalisation précis.',
    prix: 150,
    image: '/assets/img/Camtrack.jpg'
  },
  {
    id: 102,
    nom: 'Balise GPS Pro',
    description: 'Balise longue autonomie.',
    prix: 250,
    image: '/assets/img/Camtrack.jpg'
  }
];

  editIot(id: number) {
    this.router.navigate(['/update-product', id]);
  }

  editGps(id: number) {
    this.router.navigate(['/update-product', id]);
  }

  deleteIot(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce produit IoT ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#369',   
      cancelButtonColor: '#888',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitsIot = this.produitsIot.filter(p => p.id !== id);
        Swal.fire('Supprimé !', 'Le produit IoT a été supprimé.', 'success');
      }
    });
  }

  deleteGps(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce produit GPS ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#369',   
      cancelButtonColor: '#888',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitsGps = this.produitsGps.filter(p => p.id !== id);
        Swal.fire('Supprimé !', 'Le produit GPS a été supprimé.', 'success');
      }
    });
  }
  searchTerm: string = '';
  searchIot: string = '';
  searchGps: string = '';
  get filteredIot() {
    if (!this.searchTerm) return this.produitsIot;
    const term = this.searchTerm.toLowerCase();
    return this.produitsIot.filter(p =>
      p.nom.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }

  get filteredGps() {
    if (!this.searchTerm) return this.produitsGps;
    const term = this.searchTerm.toLowerCase();
    return this.produitsGps.filter(p =>
      p.nom.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }
  /*
   get filteredIot() {
    if (!this.searchIot) return this.produitsIot;
    const term = this.searchIot.toLowerCase();
    return this.produitsIot.filter(p =>
      p.nom.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }

  get filteredGps() {
    if (!this.searchGps) return this.produitsGps;
    const term = this.searchGps.toLowerCase();
    return this.produitsGps.filter(p =>
      p.nom.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }*/
}
