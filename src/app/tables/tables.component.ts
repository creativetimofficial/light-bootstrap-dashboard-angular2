import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProduitSansDevisService, ProduitSansDevis } from '../Services/ProduitSansDevisService';
import { ProduitAvecDevisService, ProduitAvecDevis } from '../Services/ProduitAvecDevisService';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  apiBaseUrl = environment.baseUrl
  produitsIot: ProduitAvecDevis[] = [];
  produitsGps: ProduitSansDevis[] = [];

  searchTerm: string = '';
  searchIot: string = '';
  searchGps: string = '';

  constructor(
    private router: Router,
    private produitSansDevisService: ProduitSansDevisService,
    private produitAvecDevisService: ProduitAvecDevisService
  ) {}

  ngOnInit(): void {
    this.loadProduitsIot();
    this.loadProduitsGps();
  }

  loadProduitsIot(): void {
    this.produitAvecDevisService.getAllProduits().subscribe({
      next: (data) => this.produitsIot = data,
      error: (err) => console.error('Erreur chargement produits IoT :', err)
    });
  }

  loadProduitsGps(): void {
    this.produitSansDevisService.getAllProduits().subscribe({
      next: (data) => this.produitsGps = data,
      error: (err) => console.error('Erreur chargement produits GPS :', err)
    });
  }

  editIot(id: number) {
    this.router.navigate(['/update-product', id], { queryParams: { type: 'iot' } });
  }

editGps(id: number) {
    this.router.navigate(['/update-product', id], { queryParams: { type: 'gps' } });
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
        this.produitAvecDevisService.delete(id).subscribe(() => {
          this.produitsIot = this.produitsIot.filter(p => p.id !== id);
          Swal.fire('Supprimé !', 'Le produit IoT a été supprimé.', 'success');
        });
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
        this.produitSansDevisService.delete(id).subscribe(() => {
          this.produitsGps = this.produitsGps.filter(p => p.id !== id);
          Swal.fire('Supprimé !', 'Le produit GPS a été supprimé.', 'success');
        });
      }
    });
  }

  get filteredIot() {
    const term = this.searchIot || this.searchTerm;
    if (!term) return this.produitsIot;
    return this.produitsIot.filter(p =>
      p.titre.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
    );
  }

  get filteredGps() {
    const term = this.searchGps || this.searchTerm;
    if (!term) return this.produitsGps;
    return this.produitsGps.filter(p =>
      p.titre.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
    );
  }

 getImageUrl(imagePath: string): string {
  if (imagePath.startsWith('/assets')) {
    return imagePath;
  }
  return this.apiBaseUrl + imagePath;
}

  ajouterProduit(type: 'iot' | 'gps') {
    this.router.navigate(['/add-product'], { queryParams: { type } });
  }

  voirDetailsIot(id: number) {
    this.router.navigate(['/produit-iot', id]);
  }

  voirDetailsGps(id: number) {
    this.router.navigate(['/produit-gps', id]);
  }

}

