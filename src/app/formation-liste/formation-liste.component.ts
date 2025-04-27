import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationListService } from 'app/services/formation-list.service';
import { ParticipantListService } from 'app/services/participant-list.service';
import { FormateurListService } from 'app/services/formateur-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-liste',
  templateUrl: './formation-liste.component.html',
  styleUrls: ['./formation-liste.component.css']
})
export class FormationListeComponent implements OnInit {

  public formations : any;
  public selectedFormationId : any;
  // Variables pour la table
  tableData = {
    headerRow: ['ID', 'Titre', 'Date Début', 'Date Fin', 'Durée (jours)', 'Domaine', 'Formateur', 'Budget (€)', 'Participants'],
    dataRows: []
  };

  // Variables pour les modals
  showFormationModal = false;
  showDeleteModal = false;
  showEmailModal = false;
  showCertificatModal = false;
  isEditMode = false;
  selectedFormation: any = null;
  selectedIndex: number = -1;
  domaines:any ;  
  formateurs:any;  
  participants: any;

  // Form Group
  formationForm: FormGroup;
  emailForm: FormGroup;
  certificatForm: FormGroup;

  private currentFormationId: number | null = null;
  private initialParticipantIds: number[] = [];
  currentParticipants: number[] = []; // Pour le template

  // Liste des participants sélectionnés pour la formation en cours d'édition
  selectedParticipants: any[] = [];
  initialParticipants: any[] = [];

  
  constructor(private fb: FormBuilder ,private participantListService:ParticipantListService, private formationListService:FormationListService , private formateurListService:FormateurListService) {
    this.formationForm = this.fb.group({
      // id: ['', Validators.required],
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
    // Pagination
    // Fin - Pagination 
    this.participantListService.getAllParticipant().subscribe({
      next: (res)=>{
        this.participants = res ;
        console.log("allParticipants: ",this.participants);
      },
      error: (err)=>{
        console.log('Error fetching participants: ',err);
      },
      complete: ()=>{
        console.log('participants fetching completed.');

      }
    });

    this.formationListService.getAllDomaines().subscribe({
      next: (res)=>{
        this.domaines = res ;
        console.log("Alldomaines: ",this.domaines);
      },
      error: (err)=>{
        console.log('Error fetching Alldomaines: ',err);
      },
      complete: ()=>{
        console.log('Alldomaines fetching completed.');

      }
    });

    this.formateurListService.getAllFormateurs().subscribe({
      next: (res)=>{
        this.formateurs = res ;
        console.log("formateurs: ",this.formateurs);
      },
      error: (err)=>{
        console.log('Error fetching formateurs: ',err);
      },
      complete: ()=>{
        console.log('formateurs fetching completed.');

      }
    })


    let data: string[][] = [];
    this.formationListService.getAllFormations().subscribe({
      next: async (res)=>{
        console.log('Formations fetched:', res);
        this.formations = res ;
        data = await Promise.all(res.map(async (formation: any) => {
          // Helper function to safely convert to string with fallback to empty string
          const safeString = (value: any) => (value !== null && value !== undefined) ? String(value) : '';
        
          // Format date - returns '' if formation.date is null/undefined
          const dateStr = safeString(formation.date);
          const formattedDate = dateStr && dateStr.length >= 8 
            ? `${dateStr.substr(6, 2)}/${dateStr.substr(4, 2)}/${dateStr.substr(0, 4)}`
            : '';
        
          // Calculate end date - returns '' if date is invalid
          let formattedEndDate = '';
          if (dateStr && dateStr.length >= 8) {
            try {
              const startDate = new Date(
                parseInt(dateStr.substr(0, 4)),
                parseInt(dateStr.substr(4, 2)) - 1,
                parseInt(dateStr.substr(6, 2))
              );
              const endDate = new Date(startDate);
              endDate.setDate(startDate.getDate() + parseInt(formation.duree || 0));
              formattedEndDate = `${endDate.getDate().toString().padStart(2, '0')}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getFullYear()}`;
            } catch (e) {
              console.error('Date calculation error:', e);
            }
          }
        
          // Get participants count - returns 0 if error occurs
          let participantsCount = 0;
          try {
            const participants = formation.id 
              ? await this.formationListService.getFormationParticipants(formation.id).toPromise()
              : null;
            participantsCount = participants ? participants.length : 0;
          } catch (error) {
            console.error(`Error fetching participants for formation ${formation.id}:`, error);
          }
        
          // Safely handle nested objects (domaine and formateur)
          const domaineLibelle = formation.domaine ? safeString(formation.domaine.libelle) : '';
          const formateurName = formation.formateur 
            ? `${safeString(formation.formateur.nom)} ${safeString(formation.formateur.prenom)}`.trim()
            : '';
        
          return [
            safeString(formation.id),
            safeString(formation.titre),
            formattedDate,
            formattedEndDate,
            safeString(formation.duree),
            domaineLibelle,
            formateurName,
            safeString(formation.budget),
            safeString(participantsCount)
          ];
        }));
          console.log("formations : ",data);
          this.tableData.dataRows = data;
      },
      error: (err)=>{
        console.log('Error fetching formations: ',err);
      },
      complete: ()=>{
        console.log('formations fetching completed.');

      }
    })
  }

  ngAfterViewInit(){
    this.loadFormations();
  }

  loadFormations(){
    let data: string[][] = [];
    this.formationListService.getAllFormations().subscribe({
      next: async (res)=>{
        console.log('Formations fetched:', res);
        this.formations = res ;
        data = await Promise.all(res.map(async (formation: any) => {
          // Helper function to safely convert to string with fallback to empty string
          const safeString = (value: any) => (value !== null && value !== undefined) ? String(value) : '';
        
          // Format date - returns '' if formation.date is null/undefined
          const dateStr = safeString(formation.date);
          const formattedDate = dateStr && dateStr.length >= 8 
            ? `${dateStr.substr(6, 2)}/${dateStr.substr(4, 2)}/${dateStr.substr(0, 4)}`
            : '';
        
          // Calculate end date - returns '' if date is invalid
          let formattedEndDate = '';
          if (dateStr && dateStr.length >= 8) {
            try {
              const startDate = new Date(
                parseInt(dateStr.substr(0, 4)),
                parseInt(dateStr.substr(4, 2)) - 1,
                parseInt(dateStr.substr(6, 2))
              );
              const endDate = new Date(startDate);
              endDate.setDate(startDate.getDate() + parseInt(formation.duree || 0));
              formattedEndDate = `${endDate.getDate().toString().padStart(2, '0')}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getFullYear()}`;
            } catch (e) {
              console.error('Date calculation error:', e);
            }
          }
        
          // Get participants count - returns 0 if error occurs
          let participantsCount = 0;
          try {
            const participants = formation.id 
              ? await this.formationListService.getFormationParticipants(formation.id).toPromise()
              : null;
            participantsCount = participants ? participants.length : 0;
          } catch (error) {
            console.error(`Error fetching participants for formation ${formation.id}:`, error);
          }
        
          // Safely handle nested objects (domaine and formateur)
          const domaineLibelle = formation.domaine ? safeString(formation.domaine.libelle) : '';
          const formateurName = formation.formateur 
            ? `${safeString(formation.formateur.nom)} ${safeString(formation.formateur.prenom)}`.trim()
            : '';
        
          return [
            safeString(formation.id),
            safeString(formation.titre),
            formattedDate,
            formattedEndDate,
            safeString(formation.duree),
            domaineLibelle,
            formateurName,
            safeString(formation.budget),
            safeString(participantsCount)
          ];
        }));
          console.log("formations : ",data);
          this.tableData.dataRows = data;
      },
      error: (err)=>{
        console.log('Error fetching formations: ',err);
      },
      complete: ()=>{
        console.log('formations fetching completed.');

      }
    })
  }
  // Méthodes pour la gestion des formations
  openAddModal() {
    this.isEditMode = false;
    this.formationForm.reset();
    this.generateNewId();
    this.selectedParticipants = [];
    this.showFormationModal = true;
    
  }

  async openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedIndex = index;
    console.log("selectedIndex:",this.selectedIndex);
    const formation = this.tableData.dataRows[index];
    this.selectedFormationId = formation[0]; // Stockez l'ID de la formation
    

   // Extract names from table data
   const formateurName = formation[6]; // e.g., "Jean Dupont"
   const domaineName = formation[5];   // e.g., "Informatique"

   // Find matching formateur ID (if names are stored as "Nom Prénom")
   const selectedFormateur = this.formateurs.find(f => `${f.nom} ${f.prenom}` === formateurName);
   // Find matching domaine ID
   const selectedDomaine = this.domaines.find(d => d.libelle === domaineName);

// 2. Chargement des participants existants
  try {
    const existingParticipants = await this.formationListService
      .getFormationParticipants(this.selectedFormationId)
      .toPromise();

    this.selectedParticipants = existingParticipants || [];
    this.initialParticipants = [...this.selectedParticipants];

    
    // 3. Initialisation du formulaire
    this.formationForm.patchValue({
      titre: formation[1],
      dateDebut: this.formatDateForInput(formation[2]),
      dateFin: this.formatDateForInput(formation[3]),
      duree: formation[4],
      domaine: selectedDomaine?.id || null,
      formateur: selectedFormateur?.id || null,
      budget: formation[7]
    });

    console.log("Participants chargés:", this.selectedParticipants);
    this.showFormationModal = true;

  } catch (error) {
    console.error("Erreur chargement participants:", error);
    Swal.fire('Erreur', 'Impossible de charger les participants', 'error');
  }
}

  closeFormationModal() {
    this.showFormationModal = false;
    this.formationForm.reset();
  }

  saveFormation() {
    const formValues = this.formationForm.value;
    
    const formationData = [
      formValues.titre,
      this.formatDateForDisplay(formValues.dateDebut),
      this.formatDateForDisplay(formValues.dateFin),
      formValues.duree.toString(),
      formValues.domaine,
      formValues.formateur,
      formValues.budget.toString(),
      this.selectedParticipants.length.toString()
    ];
    const formation = {
      titre:formValues.titre,
      date:formValues.dateDebut.replace(/-/g, ''),
      duree:formValues.duree,
      budget:formValues.budget,
    }
    const domaineId =formValues.domaine;
    const formateurId =formValues.formateur;

    if (this.isEditMode) {
      // this.tableData.dataRows[this.selectedIndex] = formationData;
      console.log("formationData:",formationData);
      const formationId=this.tableData.dataRows[this.selectedIndex][0];;
      console.log("formationId:",formationId);
      console.log("InitialParticipants:",this.initialParticipants);
      console.log("SelectedParticipants:",this.selectedParticipants);

      // Création de Set pour simplifier la comparaison
      const initialIds = new Set(this.initialParticipants.map(p => p.id));
      const selectedIds = new Set(this.selectedParticipants.map(p => p.id));
      // Supprimer les participants retirés
      for (const participantId of initialIds) {
        if (!selectedIds.has(participantId)) {
          this.formationListService.removeParticipantFromFormation(formationId, participantId).subscribe({
            next: () => console.log(`Participant ${participantId} supprimé de la formation`),
            error: (err) => console.error(`Erreur suppression participant ${participantId}:`, err)
          });
        }
      }
      // Ajouter les nouveaux participants
      for (const participantId of selectedIds) {
        if (!initialIds.has(participantId)) {
          this.formationListService.addParticipantToFormation(formationId, participantId).subscribe({
            next: () => console.log(`Participant ${participantId} ajouté à la formation`),
            error: (err) => console.error(`Erreur ajout participant ${participantId}:`, err)
          });
        }
      }


      this.formationListService.updateFormation(formationId,formation, formateurId, domaineId).subscribe({
        next: (createdFormation) => {
          console.log('Formation créée:', createdFormation);
          
          // Notification de succès
          Swal.fire({
            title: 'Succès!',
            text: 'La formation a été créée avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          });
      
          this.loadFormations(); // Rafraîchir la liste
          this.showFormationModal = false;
        },
        error: (err) => {
          console.error('Erreur lors de la création:', err);
          
          // Notification d'erreur
          Swal.fire({
            title: 'Erreur!',
            html: `
              <div style="text-align: left;">
                <p>La création a échoué pour les raisons suivantes :</p>
                <ul>
                  <li>${err.error?.message || 'Erreur serveur'}</li>
                  ${err.error?.errors?.map(e => `<li>${e}</li>`).join('') || ''}
                </ul>
              </div>
            `,
            icon: 'error',
            confirmButtonText: 'Compris',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      // Add new new formation
      this.formationListService.createFormation1(formation, formateurId, domaineId).subscribe({
        next: (createdFormation) => {
          console.log('Formation créée:', createdFormation);
          
          // Notification de succès
          Swal.fire({
            title: 'Succès!',
            text: 'La formation a été créée avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          });
      
          this.loadFormations(); // Rafraîchir la liste
          this.showFormationModal = false;
        },
        error: (err) => {
          console.error('Erreur lors de la création:', err);
          
          // Notification d'erreur
          Swal.fire({
            title: 'Erreur!',
            html: `
              <div style="text-align: left;">
                <p>La création a échoué pour les raisons suivantes :</p>
                <ul>
                  <li>${err.error?.message || 'Erreur serveur'}</li>
                  ${err.error?.errors?.map(e => `<li>${e}</li>`).join('') || ''}
                </ul>
              </div>
            `,
            icon: 'error',
            confirmButtonText: 'Compris',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
    
    this.closeFormationModal();
  }

  deleteFormation(index: number) {
    this.selectedIndex = index;
    this.selectedFormation = this.tableData.dataRows[index];
    this.showDeleteModal = true;
    console.log("selectedFormation",this.selectedFormation);
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedIndex = -1;
    this.selectedFormation = null;
  }
  executeDelete() {
    const formationId = this.selectedFormation[0];
    
    this.formationListService.deleteFormation(formationId).subscribe({
      next: () => {
        this.loadFormations();
        this.showDeleteModal = false;
        this.selectedIndex = -1;
        this.selectedFormation = null;
  
        Swal.fire({
          title: 'Succès !',
          text: 'Formation supprimée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Erreur:', err);
        Swal.fire({
          title: 'Erreur !',
          text: 'Suppression impossible : ' + (err.error?.message || 'Cette formation à peut-être des participants!'),
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  confirmDelete() {
    // Afficher une confirmation avant suppression
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lancer la suppression SEULEMENT si l'utilisateur confirme
        this.executeDelete();
      } else {
        // Fermer le modal sans supprimer
        this.showDeleteModal = false;
        this.selectedIndex = -1;
        this.selectedFormation = null;
      }
    });
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