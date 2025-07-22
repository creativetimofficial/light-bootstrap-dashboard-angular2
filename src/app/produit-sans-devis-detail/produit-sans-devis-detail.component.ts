import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitSansDevisService, ProduitSansDevis } from '../Services/ProduitSansDevisService';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-produit-sans-devis-detail',
  templateUrl: './produit-sans-devis-detail.component.html',
  styleUrls: ['./produit-sans-devis-detail.component.scss']
})
export class ProduitSansDevisDetailComponent implements OnInit {
  produit!: ProduitSansDevis;
  apiBaseUrl = environment.baseUrl;

  constructor(private route: ActivatedRoute, private produitService: ProduitSansDevisService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.getById(id).subscribe({
      next: (data) => this.produit = data,
      error: (err) => console.error('Erreur chargement produit GPS :', err)
    });
  }

  getImageUrl(imagePath: string): string {
    return imagePath.startsWith('/assets') ? imagePath : this.apiBaseUrl + imagePath;
  }
}
