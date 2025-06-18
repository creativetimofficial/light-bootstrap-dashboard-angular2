import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 

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
  @Input() caracteristiques: string[] = [];

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
    this.router.navigate(['/formulaireiotit']);
  }
}

