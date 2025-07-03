import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Franchise } from 'app/liste-franchises/liste-franchises.component';
import { FranchiseService } from 'app/Services/franchise.service';
import * as html2pdf from 'html2pdf.js';

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
    private franchiseService: FranchiseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.franchiseService.getFranchiseById(id).subscribe(data => {
      this.franchise = data;
    });
  }

 envoyerMailConfirmation(): void {
    alert(`Un email de confirmation a été envoyé à ${this.franchise?.email}`);
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
