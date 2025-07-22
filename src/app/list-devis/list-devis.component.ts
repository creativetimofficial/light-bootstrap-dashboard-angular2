import { Component, OnInit } from '@angular/core';
import { DevisService } from 'app/Services/devis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnInit {
  etatsDisponibles: string[] = ['EnAttente', 'EnCours', 'Validé','Annulé'];

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
  onEtatSelected(nouvelEtat: string, devis: any) {
    if (nouvelEtat === devis.etat) return; // Pas de changement

    Swal.fire({
      title: 'Confirmation',
      text: `Voulez-vous vraiment changer l'état du devis en '${nouvelEtat}' ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then(result => {
      if (result.isConfirmed) {
        const nouvelEtatIndex = this.etatsDisponibles.indexOf(nouvelEtat);

        this.devisService.updateEtatDevis(devis.id, nouvelEtatIndex.toString()).subscribe({
          next: (updatedDevis) => {
            devis.etat = updatedDevis.etat; 
            Swal.fire('Succès', "L'état a été mis à jour.", 'success');
          },
          error: (err) => {
            Swal.fire('Erreur', "Impossible de mettre à jour l'état.", 'error');
          }
        });
      } else {
        
        devis.etat = devis.etat;
      }
    });
  }
}
