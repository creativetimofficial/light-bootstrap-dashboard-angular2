import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitAvecDevisService, ProduitAvecDevis } from '../Services/ProduitAvecDevisService';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-produit-avec-devis-detail',
  templateUrl: './produit-avec-devis-detail.component.html',
  styleUrls: ['./produit-avec-devis-detail.component.scss']
})
export class ProduitAvecDevisDetailComponent implements OnInit {
  produit!: ProduitAvecDevis;
  apiBaseUrl = environment.baseUrl;

  constructor(private route: ActivatedRoute, private produitService: ProduitAvecDevisService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.getById(id).subscribe({
      next: (data) => this.produit = data,
      error: (err) => console.error('Erreur chargement produit IoT :', err)
    });
  }

  getImageUrl(imagePath: string): string {
    return imagePath.startsWith('/assets') ? imagePath : this.apiBaseUrl + imagePath;
  }
}
