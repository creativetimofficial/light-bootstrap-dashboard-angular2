import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-carte-produit-nodevis',
  templateUrl: './carte-produit-nodevis.component.html',
  styleUrls: ['./carte-produit-nodevis.component.css']
})
export class CarteProduitNodevisComponent {
  @Input() titre: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() categorie: string = '';
  @Input() prix: string = '';
  @Input() caracteristiques: string[] = [];

  apiBaseUrl = environment.baseUrl


  hover: boolean = false;
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  getImageUrl(imagePath: string): string {
  if (imagePath.startsWith('/assets')) {
    return imagePath;
  }
  return this.apiBaseUrl + imagePath;
}

}
