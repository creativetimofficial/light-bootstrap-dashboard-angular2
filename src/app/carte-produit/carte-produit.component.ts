import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { environment } from 'environments/environment';

@Component({
  selector: 'app-carte-produit',
  templateUrl: './carte-produit.component.html',
  styleUrls: ['./carte-produit.component.css']
})
export class CarteProduitComponent {
  @Input() titre: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() categorie: string = '';
  @Input() id: number;
  @Input() caracteristiques: { texte: string }[] = [];

  apiBaseUrl = environment.baseUrl

  constructor(private router: Router) {}

  hover: boolean = false;
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  allerAuFormulaire() {
    this.closeModal();
    this.router.navigate(['/formulaireiotit'], {
      queryParams: {
        type: 'iot',                
        produitId: this.id,
        titre: this.titre
      }
    });
  }
 getImageUrl(imagePath: string): string {
  if (imagePath.startsWith('/assets')) {
    return imagePath;
  }
  return this.apiBaseUrl + imagePath;
}

}

