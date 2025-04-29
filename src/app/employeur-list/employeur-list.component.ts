import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeurService } from 'app/services/employeur.service'; 
import Swal from 'sweetalert2';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-employeurs-list',
  templateUrl: './employeur-list.component.html',
  styleUrls: ['./employeur-list.component.css']
})
export class EmployeurListComponent implements OnInit {
  public tableData1: TableData;
  public employeurs: any[] = [];
  public employeurForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedEmployeurIndex: number = -1;
  public selectedEmployeur: string[] = null;
  
   // Pagination
   public filteredEmployeurs: any[] = [];
   public pageSize: number = 5;
   public currentPage: number = 1;
   // fin -  Pagination
  
   
  // Variables pour contrôler l'affichage des modals
  public showEmployeurModal: boolean = false;
  public showDeleteModal: boolean = false;

  constructor(private formBuilder: FormBuilder, private employeurService: EmployeurService) { }

  ngOnInit() {
    // Pagination
    const savedPage = localStorage.getItem('employeursListCurrentPage');
    this.currentPage = savedPage ? parseInt(savedPage) : 1; 
    // Fin - Pagination

    let data: string[][] = [];
    this.loadEmployeurs(); // Charger les employeurs
  
    this.tableData1 = {
      headerRow: ['ID', 'Nom'],
      dataRows: data
    };
  
    this.initForm();
  }

  loadEmployeurs(): void {
    
    this.employeurService.getEmployeurs().subscribe({
      next: (data) => {
        console.log(data)
        this.employeurs = data;
        // Pagination
        this.filteredEmployeurs = data;
        this.tableData1.dataRows = data.map((employeur: any) => [
          String(employeur.id),
          String(employeur.nomEmployeur)
        ]);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des employeurs', error);
      }
    });
  }
  ngAfterViewInit(){
    this.loadEmployeurs();
  }
  initForm() {
    this.employeurForm = this.formBuilder.group({
      id: ['', Validators.required],
      nomEmployeur: ['', Validators.required]
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedEmployeurIndex = -1;
    
    // Générer un nouvel ID
    const nextId = (Math.max(...this.tableData1.dataRows.map(row => parseInt(row[0]))) + 1).toString();
    
    this.employeurForm.reset();
    this.employeurForm.patchValue({
      id: nextId,
      nomEmployeur: ''
    });
    
    this.showEmployeurModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedEmployeurIndex = index;
    const employeurData = this.employeurs[index];
    
    this.employeurForm.patchValue({
      id: employeurData.id,
      nomEmployeur: employeurData.nomEmployeur
    });
    
    this.showEmployeurModal = true;
  }

  saveEmployeur() {
    if (this.employeurForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }
    
    const formValues = this.employeurForm.value;
    const employeurData: any = {
      nomEmployeur: formValues.nomEmployeur
    };
    
    if (this.isEditMode) {
      // Mettre à jour l'employeur existant
      this.employeurService.updateEmployeur(formValues.id, employeurData).subscribe({
        next: (updatedEmployeur) => {
          console.log('Employeur mis à jour:', updatedEmployeur);
           Swal.fire({
                                title: 'Succès!',
                                text: 'Employeur mis à jour avec succès.',
                                icon: 'success',
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#3085d6'
                              });
          this.loadEmployeurs(); // Recharger la liste des employeurs
          this.showEmployeurModal = false;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'employeur:', err);
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
      // Ajouter un nouvel employeur
      this.employeurService.createEmployeur(employeurData).subscribe({
        next: (createdEmployeur) => {
          console.log('Employeur créé:', createdEmployeur);
          Swal.fire({
                                title: 'Succès!',
                                text: 'Le employeur a été créé avec succès.',
                                icon: 'success',
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#3085d6'
                              });
          this.loadEmployeurs(); // Recharger la liste des employeurs
          this.showEmployeurModal = false;
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'employeur:', err);
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
    
    // Fermer la modal
    this.showEmployeurModal = false;
    this.employeurForm.reset();
  }
  ngOnDestroy() {
    // Save current page when component is destroyed
    localStorage.setItem('employeursListCurrentPage', this.currentPage.toString());
  }

  onSearchChange(searchTerm: string) {
    this.filteredEmployeurs = this.employeurs.filter(user =>
      user.nomEmployeur.toLowerCase().includes(searchTerm.toLowerCase()) 
     
    );
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    localStorage.setItem('employeursListCurrentPage', page.toString());

  }
  
  paginatedEmployeurs() {
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployeurs.slice(startIndex, startIndex + this.pageSize);
  }


  // Méthode pour supprimer un employeur
  deleteEmployeur(index: number) {
    // Vérification de la validité de l'index
    if (!this.tableData1?.dataRows || index < 0 || index >= this.tableData1.dataRows.length) {
      console.error('Index invalide ou données non chargées');
      return;
    }

    // Récupérer l'employeur sélectionné
    this.selectedEmployeurIndex = index;
    this.selectedEmployeur = this.tableData1.dataRows[index];

    console.log("Employeur sélectionné:", this.selectedEmployeur);
    this.showDeleteModal = true;
  }

  confirmDelete() {
    const employeurId = this.selectedEmployeur[0]; // Supposé que l'ID est le premier élément
    console.log("ID de l'employeur à supprimer:", employeurId);
    
    this.employeurService.deleteEmployeur(employeurId).subscribe({
      next: () => {
        Swal.fire({
                      title: 'Succès !',
                      text: 'Employeur supprimé avec succès.',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                  
        this.loadEmployeurs(); // Recharger la liste des employeurs
        this.showDeleteModal = false;
        this.selectedEmployeurIndex = -1;
        this.selectedEmployeur = null;
      },
      error: (err) => {
       console.error('Erreur:', err);
              Swal.fire({
                title: 'Erreur !',
                text: 'Suppression impossible : ' + (err.error?.message || 'Cet emplyeur à peut-être des formateurs en relation!'),
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          });
  }

  closeEmployeurModal() {
    this.showEmployeurModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
