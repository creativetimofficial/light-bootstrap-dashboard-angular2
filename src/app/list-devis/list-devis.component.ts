import { Component, OnInit } from '@angular/core';
import { DevisService } from 'app/Services/devis.service';

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnInit {

  devisList: any[] = [];

  constructor(private devisService: DevisService) {}

  ngOnInit(): void {
    this.getAllDevis();
  }
  getAllDevis() {
    this.devisService.getAllDevis().subscribe({
      next: (data) => {
        this.devisList = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des devis', error);
      }
    });
  }
}
