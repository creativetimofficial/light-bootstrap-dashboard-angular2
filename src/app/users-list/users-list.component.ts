import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public userForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedUserIndex: number = -1;
  public selectedUser: string[] = null;
  
  // Variables pour contrôler l'affichage des modals
  public showUserModal: boolean = false;
  public showDeleteModal: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Country', 'City', 'Salary'],
      dataRows: [
        ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        // ... autres données
      ]
    };

    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      salary: ['', Validators.required]
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
      name: '',
      country: '',
      city: '',
      salary: ''
    });
    
    this.showUserModal = true;
  }

  openEditModal(index: number) {
    this.isEditMode = true;
    this.selectedUserIndex = index;
    const userData = this.tableData1.dataRows[index];
    
    this.userForm.patchValue({
      id: userData[0],
      name: userData[1],
      country: userData[2],
      city: userData[3],
      salary: userData[4]
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
      formValues.name,
      formValues.country,
      formValues.city,
      formValues.salary
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