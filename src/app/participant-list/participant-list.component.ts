import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipantListService } from 'app/services/participant-list.service';
import Swal from 'sweetalert2';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
    // Pagination
    public filteredParticipants: any[] = [];
    public pageSize: number = 5;
    public currentPage: number = 1;
    // fin -  Pagination

  public tableData1: TableData;
  public userForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedUserIndex: number = -1;
  public selectedUser: string[] = null;
  public participants : any;
  public showUserModal: boolean = false;
  public showDeleteModal: boolean = false;
  structures: any[] = [
    { id: 1, name: 'Direction centrale' },
    { id: 2, name: 'Direction régionale' },
  ];
  profiles: any[] = [
    { id: 3, name: 'gestionnaire' },
    { id: 2, name: 'informaticien (bac + 3)' },
    { id: 1, name: 'informaticien (bac + 5)' },
    { id: 4, name: 'juriste' },
    { id: 5, name: 'technicien supérieur' },
  ];
  
  
  constructor(private formBuilder: FormBuilder,private participantService: ParticipantListService) {}

  
  ngOnInit() {
    // Pagination
    const savedPage = localStorage.getItem('participantsListCurrentPage');
    this.currentPage = savedPage ? parseInt(savedPage) : 1; 
    // Fin - Pagination
    let data: string[][] = [];
    this.participantService.getAllParticipant().subscribe({
      next: (res) => {
        console.log('Users fetched:', res);
        this.participants = res ;
        data = res.map((user: any) => [
          String(user.id),
          String(user.nom),
          String(user.prenom),
          String(user.structure?.libelle ), 
          String(user.profile?.libelle ),
          String(user.email),
          String(user.tel)
        ]);
        this.tableData1 = {
          headerRow: ['ID', 'Nom', 'Prénom', 'Structure', 'Profil', 'Email', 'Téléphone'],
          dataRows: data
        };

        console.log("data = ",data);
        },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        console.log('User fetching completed.');
      }
    });

    this.tableData1 = {
      headerRow:  ['ID', 'Nom', 'Prénom', 'Structure', 'Profil', 'Email', 'Téléphone'],
      dataRows: data
    };
  


    this.initForm();
  }

  ngOnDestroy() {
    // Save current page when component is destroyed
    localStorage.setItem('participantsListCurrentPage', this.currentPage.toString());
  }

  ngAfterViewInit(){
    this.loadParticipants();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      structure: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedUserIndex = -1;

    const nextId = (
      Math.max(...this.tableData1.dataRows.map(row => parseInt(row[0]))) + 1
    ).toString();

    this.userForm.reset();
    this.userForm.patchValue({ id: nextId });

    this.showUserModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedUserIndex = index;
    const userData = this.participants[index]
    console.log("userData",userData); 
    this.userForm.patchValue({
      id: userData.id,
      nom: userData.nom,
      prenom: userData.prenom,
      structure: userData.structure.id,
      profile: userData.profile.id,
      email: userData.email,
      telephone: userData.tel
    });

    this.showUserModal = true;
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }
  
    const formValues = this.userForm.value;
  
    // Récupérer les IDs de profile et structure sélectionnés
    const profileId = formValues.profile; // ID du profil sélectionné
    const structureId = formValues.structure; // ID de la structure sélectionnée
  
    if (this.isEditMode) {
      const newParticipant = {
        nom: formValues.nom,
        prenom: formValues.prenom,
        email: formValues.email,
        tel: formValues.telephone,
        profileId : formValues.profile,
        structureId : formValues.structure
      };
      // Update existing user
      this.participantService.updateParticipant(formValues.id, newParticipant).subscribe({
        next: (updatedUser) => {
          // Notification de succès
          Swal.fire({
            title: 'Succès!',
            text: 'Le participant a été modifié avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          });
          console.log('User updated:', updatedUser);
          this.loadParticipants(); // Refresh the user list
          console.log("this.participants(aprés modification):",this.participants);
          this.showUserModal = false;
        },
        error: (err) => {
          console.error('Error updating user:', err);
          Swal.fire({
            title: 'Erreur!',
            html: `
              <div style="text-align: left;">
                <p>La modification a échoué pour les raisons suivantes :</p>
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
    } else
    // Envoie de la requête POST avec les IDs de profile et structure en paramètres
    {

       // Créer l'objet participant sans les IDs de profile et structure
    const newParticipant = {
      nom: formValues.nom,
      prenom: formValues.prenom,
      email: formValues.email,
      tel: formValues.telephone
    };
    console.log(newParticipant)
    // Récupérer les IDs de profile et structure sélectionnés
    const profileId = formValues.profile; // ID du profil sélectionné
    const structureId = formValues.structure; // ID de la structure sélectionnée
  
      
      this.participantService.createParticipant(newParticipant, profileId, structureId)
      .subscribe(
        (response) => {
          // Notification de succès
          Swal.fire({
            title: 'Succès!',
            text: 'Le particiant a été créé avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          }); 
          console.log('Participant créé avec succès', response);
          this.closeUserModal();
          this.userForm.reset();
          this.initForm;
           // Actualiser la liste des participants
           this.loadParticipants();
        },
        (err) => {
          console.error('Erreur lors de la création du participant', err);
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
      );
  }}
  loadParticipants(): void {
    this.participantService.getAllParticipant().subscribe(
      (data) => {
        this.participants = data; // Mettre à jour le tableau des participants
        // Pagination
        this.filteredParticipants = data;
        // this.currentPage = 1; // Reset to first page
        // Fin - Pagination
        this.tableData1.dataRows = data.map((participant:any)=>[
          String(participant.id),
          String(participant.nom),
          String(participant.prenom),
          String(participant.structure?.libelle ), 
          String(participant.profile?.libelle ),
          String(participant.email),
          String(participant.tel)
        ])
      },
      (error) => {
        console.error('Erreur lors du chargement des participants:', error);
      }
    );
  }

  // Pagination
  
  onSearchChange(searchTerm: string) {
    this.filteredParticipants = this.participants.filter(participant =>
      participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    localStorage.setItem('participantsListCurrentPage', page.toString());

  }
  
  paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredParticipants.slice(startIndex, startIndex + this.pageSize);
  }
  // Fin - Pagination


  deleteParticipant(index: number) {
    this.selectedUserIndex = index;
    console.log("selectedParticipantIndex!", this.selectedUserIndex);
    this.selectedUser = this.tableData1.dataRows[index];
    console.log("selectedParticipant!", this.selectedUser);
    this.showDeleteModal = true;
  }
  
  confirmDelete() {
    const participantId = this.selectedUser[0]; // ID du participant sélectionné
    console.log('Deleting participant with ID:', participantId);
  
    // Effectuer la suppression
    this.participantService.deleteParticipant(participantId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Succès !',
          text: 'Participant supprimé avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.loadParticipants(); // Recharger les participants
        // Close modal
        this.showDeleteModal = false;
        this.selectedUserIndex = -1;
        this.selectedUser = null;
      },
      error: (err) => {
        Swal.fire({
          title: 'Erreur !',
          text: 'Suppression impossible : ' + (err.error?.message),
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error deleting user:', err);
      }
    });
  }
  
  closeUserModal() {
    this.showUserModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
