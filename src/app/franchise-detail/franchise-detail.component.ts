import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Franchise } from 'app/liste-franchises/liste-franchises.component';
import { FranchiseService } from 'app/Services/franchise.service';
import * as html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { EmailjsService } from 'emailJs/email.service';
@Component({
  selector: 'app-franchise-detail',
  templateUrl: './franchise-detail.component.html',
  styleUrls: ['./franchise-detail.component.scss']
})
export class FranchiseDetailComponent implements OnInit {

  franchise?: Franchise;
 @ViewChild('pdfContent') pdfContent!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private franchiseService: FranchiseService,
    private emailjsService: EmailjsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.franchiseService.getFranchiseById(id).subscribe(data => {
      this.franchise = data;
    });
  }

 envoyerMailConfirmation() {
    Swal.fire({
      title: 'Confirmer l\'envoi ?',
      text: 'Voulez-vous vraiment envoyer un mail de confirmation à ' + this.franchise.nom + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, envoyer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {

        const params = {
          nom: this.franchise.nom,
          prenom: this.franchise.prenom,
          to_email: this.franchise.email,
        };

        this.emailjsService.sendFranchiseConfirmation(params)
          .then(() => {
            Swal.fire('Succès', 'L\'email a été envoyé avec succès.', 'success');
          })
          .catch(() => {
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'envoi.', 'error');
          });

      } else {
        Swal.fire('Annulé', 'L\'email n\'a pas été envoyé.', 'info');
      }
    });
  }


 genererPdf() {
  const logoUrl = '/assets/img/logoTunav.png'; 
  const franchise = this.franchise;

  const content = `
    <div style="font-family: Arial; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Logo" style="width: 120px; margin-bottom: 10px;" />
        <h2 style="color: #01b4ff;">Fiche Franchise - TUNAV</h2>
      </div>
      <div style="font-size: 14px; color: #000;">
        <p><strong>Nom :</strong> ${franchise?.nom || ''}</p>
        <p><strong>Prénom :</strong> ${franchise?.prenom || ''}</p>
        <p><strong>Email :</strong> ${franchise?.email || ''}</p>
        <p><strong>Téléphone :</strong> ${franchise?.telephone || ''}</p>
        <p><strong>Profession actuelle :</strong> ${franchise?.professionActuelle || 'Non spécifiée'}</p>
        <p><strong>Expérience IT/IoT/GPS :</strong> ${franchise?.experienceIotGps || 'Non spécifiée'}</p>
        <p><strong>Entreprise dirigée :</strong> ${franchise?.entrepriseDirige || 'Non spécifiée'}</p>
        <p><strong>Motivation :</strong><br>${franchise?.motivation || ''}</p>
      </div>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: `Fiche_Franchise_${franchise?.nom}_${franchise?.prenom}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  const element = document.createElement('div');
  element.innerHTML = content;

html2pdf().set(opt).from(element).save();
}


}
