import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from 'app/Services/devis.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-devis-detail',
  templateUrl: './devis-detail.component.html',
  styleUrls: ['./devis-detail.component.scss']
})
export class DevisDetailComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  devis: any;

  constructor(private route: ActivatedRoute, private devisService: DevisService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.devisService.getDevisById(+id).subscribe({
        next: (data) => {
          this.devis = data;
        },
        error: (err) => console.error('Erreur lors du chargement du devis', err)
      });
    }
  }

  envoyerMailConfirmation() {
    console.log('Envoi du mail de confirmation pour le devis', this.devis);
  }
  today = new Date();
  genererPdf() {
   const logoPath = '/assets/img/logoTunav.png'; 

    const htmlContent = `
      <div style="max-width: 800px; margin: auto; font-family: Arial, sans-serif; color: #333;">

        <header style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #357; padding-bottom: 15px; margin-bottom: 30px;">
          <img src="${logoPath}" alt="Logo" style="height: 60px;">
          <div style="text-align: right;">
            <h2 style="color: #357; margin: 0;">Tunav It Group</h2>
            <p style="margin: 0;">Adresse complète</p>
            <p style="margin: 0;">Téléphone : +216 71807667</p>
            <p style="margin: 0;">Email : Tunav@tunav.com</p>
          </div>
        </header>

        <h1 style="text-align: center; color: #357; margin-bottom: 40px;">Devis N°: <span style="font-weight: normal;">${this.devis.id}</span></h1>

        <section style="margin-bottom: 30px;">
          <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #555;">Informations Client</h3>
          <p><strong>Nom :</strong> ${this.devis.nom} ${this.devis.prenom}</p>
          <p><strong>Entreprise :</strong> ${this.devis.entreprise}</p>
          <p><strong>Email :</strong> ${this.devis.email}</p>
        </section>

        <section style="margin-bottom: 30px;">
          <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #555;">Détails du devis</h3>
          <p><strong>Message :</strong></p>
          <p style="font-style: italic; color: #357;">${this.devis.message}</p>
          <p><strong>Quantité :</strong> ${this.devis.quantite}</p>
        </section>

        <section>
          <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #555; margin-bottom: 10px;">Produit concerné</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #357; color: white;">
                <th style="padding: 10px; text-align: left;">Catégorie</th>
                <th style="padding: 10px; text-align: left;">Description</th>
                <th style="padding: 10px; text-align: left;">Titre</th>
                <th style="padding: 10px; text-align: left;">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${this.devis.produitDevis.titre}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${this.devis.produitDevis.description}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${this.devis.produitDevis.categorie}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                  <img src="${this.devis.produitDevis.imagePath}" alt="Produit" style="max-width: 100px; border-radius: 5px;" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer style="margin-top: 50px; border-top: 1px solid #ddd; padding-top: 15px; font-size: 0.9rem; color: #555; display: flex; justify-content: space-between;">
          <div>
            <p>Date : ${this.today.toLocaleDateString()}</p>
          </div>
          <div style="text-align: right;">
            <p>Signature</p>
            <br><br>
            <p style="border-top: 1px solid #357; width: 150px; margin: auto;"></p>
          </div>
        </footer>

      </div>
    `;
    const options = {
      margin: 0.5,
      filename: `Devis_${this.devis.nom}_${this.devis.prenom}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(htmlContent).save();
  }

}
