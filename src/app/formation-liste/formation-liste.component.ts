import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formation-liste',
  templateUrl: './formation-liste.component.html',
  styleUrls: ['./formation-liste.component.css']
})
export class FormationListeComponent implements OnInit {
  // Variables pour la table
  tableData = {
    headerRow: ['ID', 'Titre', 'Date Début', 'Date Fin', 'Durée (jours)', 'Domaine', 'Formateur', 'Budget (€)', 'Participants'],
    dataRows: [
      ['F001', 'Angular Avancé', '10/05/2025', '15/05/2025', '5', 'Développement Web', 'Dupont Jean', '3500', '15'],
      ['F002', 'React Fondamentaux', '01/06/2025', '05/06/2025', '5', 'Développement Web', 'Martin Sophie', '3000', '12'],
      ['F003', 'Management d\'équipe', '15/06/2025', '17/06/2025', '3', 'Management', 'Dubois Pierre', '2500', '8'],
      ['F004', 'Excel Avancé', '20/06/2025', '21/06/2025', '2', 'Bureautique', 'Leroy Marie', '1200', '20']
    ]
  };

  // Variables pour les modals
  showFormationModal = false;
  showDeleteModal = false;
  showEmailModal = false;
  showCertificatModal = false;
  isEditMode = false;
  selectedFormation: any = null;
  selectedIndex: number = -1;

  // Listes pour les select
  domaines = ['Développement Web', 'Management', 'Bureautique', 'Communication', 'Marketing Digital', 'Data Science'];
  formateurs = ['Dupont Jean', 'Martin Sophie', 'Dubois Pierre', 'Leroy Marie', 'Garcia Thomas'];
  participants = [
    { id: 'P001', nom: 'miladi', prenom: 'imen', email: 'miladiphg@gmail.com' },
    { id: 'P002', nom: 'Moreau', prenom: 'Thomas', email: 'thomas.moreau@example.com' },
    { id: 'P003', nom: 'Petit', prenom: 'Sophie', email: 'sophie.petit@example.com' },
    { id: 'P004', nom: 'Bernard', prenom: 'Luc', email: 'luc.bernard@example.com' },
    { id: 'P005', nom: 'Durant', prenom: 'Emma', email: 'emma.durant@example.com' }
  ];

  // Form Group
  formationForm: FormGroup;
  emailForm: FormGroup;
  certificatForm: FormGroup;
  
  // Liste des participants sélectionnés pour la formation en cours d'édition
  selectedParticipants: any[] = [];
  
  constructor(private fb: FormBuilder) {
    this.formationForm = this.fb.group({
      id: ['', Validators.required],
      titre: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      duree: ['', [Validators.required, Validators.min(1)]],
      domaine: ['', Validators.required],
      formateur: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      participants: [[]]
    });
    
    this.emailForm = this.fb.group({
      objet: ['Convocation à la formation', Validators.required],
      message: ['', Validators.required],
      destinataires: [[], Validators.required]
    });
    
    this.certificatForm = this.fb.group({
      titre: ['Certificat de réussite', Validators.required],
      dateGeneration: [new Date().toISOString().split('T')[0], Validators.required],
      participants: [[], Validators.required]
    });
  }

  ngOnInit() {
    // Initialisation des données si nécessaire
  }

  // Méthodes pour la gestion des formations
  openAddModal() {
    this.isEditMode = false;
    this.formationForm.reset();
    this.generateNewId();
    this.selectedParticipants = [];
    this.showFormationModal = true;
    
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedIndex = index;
    const formation = this.tableData.dataRows[index];
    
    // Simulation des participants pour l'édition
    this.selectedParticipants = this.participants.slice(0, parseInt(formation[8]));
    
    this.formationForm.patchValue({
      id: formation[0],
      titre: formation[1],
      dateDebut: this.formatDateForInput(formation[2]),
      dateFin: this.formatDateForInput(formation[3]),
      duree: formation[4],
      domaine: formation[5],
      formateur: formation[6],
      budget: formation[7],
      participants: this.selectedParticipants.map(p => p.id)
    });
    
    this.showFormationModal = true;
  }

  closeFormationModal() {
    this.showFormationModal = false;
    this.formationForm.reset();
  }

  saveFormation() {
    const formValues = this.formationForm.value;
    const formationData = [
      formValues.id,
      formValues.titre,
      this.formatDateForDisplay(formValues.dateDebut),
      this.formatDateForDisplay(formValues.dateFin),
      formValues.duree.toString(),
      formValues.domaine,
      formValues.formateur,
      formValues.budget.toString(),
      this.selectedParticipants.length.toString()
    ];
    
    if (this.isEditMode) {
      this.tableData.dataRows[this.selectedIndex] = formationData;
    } else {
      this.tableData.dataRows.push(formationData);
    }
    
    this.closeFormationModal();
  }

  deleteFormation(index: number) {
    this.selectedIndex = index;
    this.selectedFormation = this.tableData.dataRows[index];
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedFormation = null;
  }

  confirmDelete() {
    this.tableData.dataRows.splice(this.selectedIndex, 1);
    this.closeDeleteModal();
  }
  
  // Méthodes pour l'envoi d'email
  openEmailModal(index: number) {
    this.selectedIndex = index;
    this.selectedFormation = this.tableData.dataRows[index];
    
    // Simulation des destinataires pour l'email
    const nbParticipants = parseInt(this.selectedFormation[8]);
    const destinataires = this.participants.slice(0, nbParticipants);
   
    const formationTitle = this.selectedFormation[1];
    const startDate = this.selectedFormation[2];
    
    this.emailForm.patchValue({
      objet: `Convocation à la formation "${formationTitle}"`,
      message: `Bonjour,\n\nVous êtes convoqué(e) à la formation "${formationTitle}" qui débutera le ${startDate}.\nVoici le lien google meet de la formation https://meet.google.com/landing\nCordialement,\nLe service formation`,
      destinataires: destinataires.map(p => p.id)
    });
    
    this.showEmailModal = true;
  }
  
  closeEmailModal() {
    this.showEmailModal = false;
  }
  
  sendEmail() {
    // Simulation d'envoi d'email
    console.log('Email envoyé !', this.emailForm.value);
    alert('Les emails ont été envoyés avec succès !');
    this.closeEmailModal();
  }
  
  // Méthodes pour la génération de certificats
  openCertificatModal(index: number) {
    this.selectedIndex = index;
    this.selectedFormation = this.tableData.dataRows[index];
    
    // Simulation des participants pour les certificats
    const nbParticipants = parseInt(this.selectedFormation[8]);
    const participantsForCert = this.participants.slice(0, nbParticipants);
    
    this.certificatForm.patchValue({
      titre: `Certificat de réussite - ${this.selectedFormation[1]}`,
      participants: participantsForCert.map(p => p.id)
    });
    
    this.showCertificatModal = true;
  }
  
  closeCertificatModal() {
    this.showCertificatModal = false;
  }
  
  generateCertificats() {
    // Simulation de génération de certificats
    console.log('Certificats générés !', this.certificatForm.value);
    alert('Les certificats ont été générés avec succès !');
    this.closeCertificatModal();
  }
  
  // Gestion des participants
  toggleParticipant(participant: any) {
    const index = this.selectedParticipants.findIndex(p => p.id === participant.id);
    
    if (index === -1) {
      this.selectedParticipants.push(participant);
    } else {
      this.selectedParticipants.splice(index, 1);
    }
    
    this.formationForm.patchValue({
      participants: this.selectedParticipants.map(p => p.id)
    });
  }
  
  isParticipantSelected(participant: any): boolean {
    return this.selectedParticipants.some(p => p.id === participant.id);
  }
  
  // Utilitaires
  generateNewId() {
    // Génère un ID basé sur le nombre de formations existantes
    const newNum = this.tableData.dataRows.length + 1;
    const id = 'F' + newNum.toString().padStart(3, '0');
    this.formationForm.patchValue({ id });
  }
  
  formatDateForInput(dateStr: string): string {
    // Convertit DD/MM/YYYY en YYYY-MM-DD pour les inputs de type date
    const parts = dateStr.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
  formatDateForDisplay(dateStr: string): string {
    // Convertit YYYY-MM-DD en DD/MM/YYYY pour l'affichage
    const parts = dateStr.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  
  calculateDuration() {
    // Calcule automatiquement la durée entre les dates
    const dateDebut = this.formationForm.get('dateDebut')?.value;
    const dateFin = this.formationForm.get('dateFin')?.value;
    
    if (dateDebut && dateFin) {
      const start = new Date(dateDebut);
      const end = new Date(dateFin);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le jour de début
      
      this.formationForm.patchValue({ duree: diffDays });
    }
  }
}