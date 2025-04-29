import { Component, OnInit , } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormateurListService } from 'app/services/formateur-list.service'; 
import { EmployeurService } from 'app/services/employeur.service';
import Swal from 'sweetalert2';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-formateurs-list',
  templateUrl: './formateur-list.component.html',
  styleUrls: ['./formateur-list.component.css']
})
export class FormateurListComponent implements OnInit {
  public tableData1: TableData;
  public formateurs : any;
  public formateurForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedFormateurIndex: number = -1;
  public selectedFormateur: string[] = null;

  // Pagination
  public filteredFormateurs: any[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;
  // fin -  Pagination
  
  // Variables pour contrôler l'affichage des modals
  public showFormateurModal: boolean = false;
  public showDeleteModal: boolean = false;
  employeurs: any[] = [];
    types: string[]=['interne','externe']
  constructor(private formBuilder: FormBuilder , private formateurService:FormateurListService, private employeurService:EmployeurService) { }

  ngOnInit() {
    // Pagination
    const savedPage = localStorage.getItem('formateursListCurrentPage');
    this.currentPage = savedPage ? parseInt(savedPage) : 1; 
    // Fin - Pagination
    let data: string[][] = [];
    this.loadEmployeurs()
    this.formateurService.getAllFormateurs().subscribe({
      next: (res) => {
        console.log('Formateurs fetched:', res);
        this.formateurs = res;
        data = res.map((formateur: any) => [
          String(formateur.id),
          String(formateur.nom),
          String(formateur.prenom),
          String(formateur.email),
          String(formateur.tel),
          String(formateur.type),
          String(formateur.employeur)
        ]);
        console.log("data = ", data);
      },
      error: (err) => {
        console.error('Error fetching formateurs:', err);
      },
      complete: () => {
        console.log('Formateur fetching completed.');
      }
    });
  
    this.tableData1 = {
      headerRow: ['ID', 'Nom', 'Prénom', 'Email', 'Téléphone','Type', 'Employeur'],
      dataRows: data
    };
  
    this.initForm();
  }
  
   loadEmployeurs(): void {
    this.employeurService.getEmployeurs().subscribe(
      (data) => {
        this.employeurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des employeurs', error);
      }
    );
  }
  ngAfterViewInit(){
    this.loadFormateurs();
  }

  initForm() {
    this.formateurForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      type: ['', Validators.required],
      employeur: ['', Validators.required]
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedFormateurIndex = -1;
    
    // Generate a new ID
    const nextId = (Math.max(...this.tableData1.dataRows.map(row => parseInt(row[0]))) + 1).toString();
    
    this.formateurForm.reset();
    this.formateurForm.patchValue({
      id: nextId,
      nom: '',
      prenom: '',
      email: '',
      tel: '',
      type: '',
      employeur: ''
    });
    
    this.showFormateurModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedFormateurIndex = index;
    const formateurData = this.formateurs[index];
    
    this.formateurForm.patchValue({
      id: formateurData.id,
      nom: formateurData.nom,
      prenom: formateurData.prenom,
      email: formateurData.email,
      tel: formateurData.tel,
      type: formateurData.type,
      employeur: formateurData.employeur.id
    });
    
    this.showFormateurModal = true;
  }

  saveFormateur() {
    if (this.formateurForm.invalid) {
      console.log("unvalid");   
    }
    
    const formValues = this.formateurForm.value;
    const employeurId=formValues.employeur;
    console.log("el ID DYEL EMPLOYEUR",employeurId);
    const formateurData :any = {
      nom: formValues.nom,
      prenom: formValues.prenom,
      email: formValues.email,
      tel: formValues.tel,
      type: formValues.type
    };
    const formateurData2 :any = {
      nom: formValues.nom,
      prenom: formValues.prenom,
      email: formValues.email,
      tel: formValues.tel,
      type: formValues.type,
      employeur: formValues.employeur
    };
    if (this.isEditMode) {
      // Update existing formateur
      this.formateurService.updateFormateur(formValues.id, formateurData2).subscribe({
        next: (updatedFormateur) => {
          console.log('Formateur updated:', updatedFormateur);
          Swal.fire({
                      title: 'Succès!',
                      text: 'Formateur mis à jour avec succès.',
                      icon: 'success',
                      confirmButtonText: 'OK',
                      confirmButtonColor: '#3085d6'
                    });
          this.loadFormateurs(); // Refresh the formateur list
          this.showFormateurModal = false;
        },
        error: (err) => {
          console.error('Error updating formateur:', err);
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
            } else {
      // Add new formateur
      this.formateurService.createFormateur(formateurData, employeurId).subscribe({
        next: (createdFormateur) => {
          console.log('Formateur created:', createdFormateur);
           Swal.fire({
                      title: 'Succès!',
                      text: 'Le formateur a été créé avec succès.',
                      icon: 'success',
                      confirmButtonText: 'OK',
                      confirmButtonColor: '#3085d6'
                    });
          this.loadFormateurs(); // Refresh the formateur list
          this.showFormateurModal = false;
        },
        error: (err) => {
          console.error('Error creating formateur:', err);
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
    
    // Close modal
    this.showFormateurModal = false;
    this.formateurForm.reset();
  }
  ngOnDestroy() {
    // Save current page when component is destroyed
    localStorage.setItem('formateursListCurrentPage', this.currentPage.toString());
  }
  // Add this method to refresh formateur data
  loadFormateurs() {
    this.formateurService.getAllFormateurs().subscribe({
      next: (res) => {
        console.log('Formateurs fetched:', res);
        this.formateurs = res;
        // Pagination
        this.filteredFormateurs = res;
        // this.currentPage = 1; // Reset to first page
        // Fin - Pagination
        this.tableData1.dataRows = res.map((formateur: any) => [
          String(formateur.id),
          String(formateur.nom),
          String(formateur.prenom),
          String(formateur.email),
          String(formateur.tel),
          String(formateur.type),
          String(formateur.employeur )
        ]);
      },
      error: (err) => {
        console.error('Error fetching formateurs:', err);
      }
    });
  }
  onSearchChange(searchTerm: string) {
    this.filteredFormateurs = this.formateurs.filter(user =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    localStorage.setItem('formateursListCurrentPage', page.toString());

  }
  
  paginatedFormateurs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredFormateurs.slice(startIndex, startIndex + this.pageSize);
  }
  deleteFormateur(index: number) {
    // 1. Vérifiez que l'index est valide
    if (!this.tableData1?.dataRows || index < 0 || index >= this.tableData1.dataRows.length) {
      console.error('Index invalide ou données non chargées');
      return;
    }
  
    // 2. Récupérez l'élément en vérifiant son existence
    this.selectedFormateurIndex = index;
    this.selectedFormateur = this.tableData1.dataRows[index];
  
    // 3. Vérification supplémentaire
    if (!this.selectedFormateur) {
      console.error('Aucun formateur trouvé à cet index');
      return;
    }
  
    console.log("Formateur sélectionné :", this.selectedFormateur);
    this.showDeleteModal = true;
  }
  confirmDelete() {
    const formateurId = this.selectedFormateur[0]; // Assuming ID is the first element
    console.log("elid fassakh",formateurId);
    this.formateurService.deleteFormateur(formateurId).subscribe({
      next: () => {
        this.loadFormateurs();
    // Close modal
    this.showDeleteModal = false;
    this.selectedFormateurIndex = -1;
    this.selectedFormateur = null;

    Swal.fire({
              title: 'Succès !',
              text: 'Formateur supprimé avec succès.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          
  },
  error: (err) => {
    console.error('Error deleting formateur:', err);
  Swal.fire({
           title: 'Erreur !',
           text: 'Suppression impossible du formateur',
           icon: 'error',
           confirmButtonText: 'OK'
         });
       }
     });
}

  closeFormateurModal() {
    this.showFormateurModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
