import { Component, OnInit } from '@angular/core';
import { FranchiseService } from 'app/Services/franchise.service';
export interface Franchise {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  professionActuelle: string;
  experienceIotGps: string;
  entrepriseDirige: string;
  motivation: string;
}

@Component({
  selector: 'app-liste-franchises',
  templateUrl: './liste-franchises.component.html',
  styleUrls: ['./liste-franchises.component.scss']
})

export class ListeFranchisesComponent implements OnInit {
  
 franchises: Franchise[] = [];

  constructor(private franchiseService: FranchiseService) {}

  ngOnInit(): void {
    this.loadFranchises();
  }

  loadFranchises(): void {
    this.franchiseService.getFranchises().subscribe({
      next: (data) => this.franchises = data,
      error: (err) => console.error('Erreur lors du chargement des franchises', err)
    });
  }

}
