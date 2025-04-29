import { Component, OnInit ,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListService } from 'app/services/user-list.service'; 
import Swal from 'sweetalert2';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public tableData1: TableData;
  public users : any;
  public userForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedUserIndex: number = -1;

  // Pagination
  public filteredUsers: any[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;
  // fin -  Pagination

  public selectedUser: string[] = null;
  roles: any[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Responsable' },
    { id: 3, name: 'Simple utilisateur' }
  ];
    
  // Variables pour contrôler l'affichage des modals
  public showUserModal: boolean = false;
  public showDeleteModal: boolean = false;

  constructor(private formBuilder: FormBuilder , private userService: UserListService) { }

  ngOnInit() {
    // Pagination
    const savedPage = localStorage.getItem('usersListCurrentPage');
    this.currentPage = savedPage ? parseInt(savedPage) : 1; 
    // Fin - Pagination
    let data: string[][] = [];
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log('Users fetched:', res);
        this.users = res ;
        data = res.map((user: any) => [String(user.id),String("********"),String(user.login),String(user.role.nom)]);
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
      headerRow: ['ID', "Nom d'utilisateur", 'mot de passe', 'Role'],
      dataRows: data
    };
  


    this.initForm();
  }
  
  ngAfterViewInit(){
    this.loadUsers();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      login: ['', Validators.required],
      motDePasse: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedUserIndex = -1;
    
    // Generate a new ID
    const nextId = (Math.max(...this.tableData1.dataRows.map(row => parseInt(row[0]))) + 1).toString();
    
    this.userForm.reset();
    this.userForm.patchValue({
      id: nextId,
      login: '',
      motDePasse: '',
      email:'',
      role: '',
     
    });
    
    this.showUserModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedUserIndex =index;
    const userData = this.users[index];
    console.log("SelectedIndex:",this.selectedUserIndex);
    console.log("currentPage",this.currentPage);
    this.userForm.patchValue({
      id: userData.id,
      login: userData.login,
      motDePasse: userData.motdePasse,
      email: userData.email,
      role: userData.role.id,
      
    });
    
    this.showUserModal = true;
  }

  saveUser() {
    if (this.userForm.invalid) {
      console.log("unvalid");   
    }
    
    const formValues = this.userForm.value;
    const roleId = formValues.role; // This will contain the selected role ID
    const userData: any = {
      login: formValues.login,
      motdePasse : formValues.motDePasse,
      email : formValues.email,
    }  ;

    console.log("userData:",userData);
    console.log("isEditMode:",this.isEditMode);

    if (this.isEditMode) {
      // Update existing user
      this.userService.updateUser(formValues.id, userData, roleId).subscribe({
        next: (updatedUser) => {
          Swal.fire({
            title: 'Succès!',
            text: 'Utilisateur modifié avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          });
          console.log('User updated:', updatedUser);
          this.loadUsers(); // Refresh the user list
          this.showUserModal = false;
        },
        error: (err) => {
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
          console.error('Error updating user:', err);
        }
      });
    } else {
      // Add new user
      this.userService.createUser(userData, roleId).subscribe({
        next: (createdUser) => {
          Swal.fire({
            title: 'Succès!',
            text: 'Utilisateur créé avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          });
          console.log('User created:', createdUser);
          this.loadUsers(); // Refresh the user list
          this.showUserModal = false;
        },
        error: (err) => {
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
          console.error('Error creating user:', err);
        }
      });

    }
    
    // Close modal
    this.showUserModal = false;
    this.userForm.reset();
  }

  ngOnDestroy() {
    // Save current page when component is destroyed
    localStorage.setItem('usersListCurrentPage', this.currentPage.toString());
  }

  // Add this method to refresh user data
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log('Users fetched:', res);
        this.users = res;
        // Pagination
        this.filteredUsers = res;
        // this.currentPage = 1; // Reset to first page
        // Fin - Pagination
        this.tableData1.dataRows = res.map((user: any) => [
          String(user.id),
          String(user.login),
          String("********"),
          String(user.role.nom),
          String(user.email)
        ]);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.filteredUsers = this.users.filter(user =>
      user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    localStorage.setItem('usersListCurrentPage', page.toString());

  }
  
  paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }
  
  deleteUser(index: number) {
    this.selectedUserIndex = index;
    this.selectedUser = this.tableData1.dataRows[index];
    console.log("selectedUser!",this.selectedUser);
    this.showDeleteModal = true;
  }

  confirmDelete() {
    const userId = this.selectedUser[0]; // Assuming ID is the first element
    
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Succès !',
          text: 'Utilisateur supprimé avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.loadUsers();
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