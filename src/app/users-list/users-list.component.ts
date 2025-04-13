import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListService } from 'app/services/user-list.service'; 

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
  public selectedUser: string[] = null;
  roles: string[]=['Admin','Responsable','Utilisateur']
  
  // Variables pour contrôler l'affichage des modals
  public showUserModal: boolean = false;
  public showDeleteModal: boolean = false;

  constructor(private formBuilder: FormBuilder , private userService: UserListService) { }

  ngOnInit() {
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

  initForm() {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      login: ['', Validators.required],
      motDePasse: ['', Validators.required],
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
      role: '',
     
    });
    
    this.showUserModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedUserIndex = index;
    const userData = this.tableData1.dataRows[index];
    
    this.userForm.patchValue({
      id: userData[0],
      login: userData[1],
      motDePasse: userData[2],
      role: userData[3],
      
    });
    
    this.showUserModal = true;
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }
    
    const formValues = this.userForm.value;
    const userData = [
      formValues.id,
      formValues.login,
      formValues.motDePasse,
      formValues.role,
     
    ];
    
    if (this.isEditMode) {
      // Update existing user
      this.tableData1.dataRows[this.selectedUserIndex] = userData;
    } else {
      // Add new user
      this.tableData1.dataRows.push(userData);
    }
    
    // Close modal
    this.showUserModal = false;
    this.userForm.reset();
  }

  deleteUser(index: number) {
    this.selectedUserIndex = index;
    this.selectedUser = this.tableData1.dataRows[index];
    this.showDeleteModal = true;
  }

  confirmDelete() {
    // Remove user from array
    this.tableData1.dataRows.splice(this.selectedUserIndex, 1);
    
    // Close modal
    this.showDeleteModal = false;
    this.selectedUserIndex = -1;
    this.selectedUser = null;
  }

  closeUserModal() {
    this.showUserModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}