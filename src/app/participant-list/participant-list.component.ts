import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public tableData1: TableData;
  public userForm: FormGroup;
  public isEditMode: boolean = false;
  public selectedUserIndex: number = -1;
  public selectedUser: string[] = null;

  public showUserModal: boolean = false;
  public showDeleteModal: boolean = false;

  structures = ['Direction centrale', 'Direction régionale'];
  profiles = ['Informaticien', 'Technicien', 'Juriste', 'Gestionnaire'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Nom', 'Prénom', 'Structure', 'Profil', 'Email', 'Téléphone'],
      dataRows: [
        ['1', 'Ahmed', 'Ben Ali', 'Direction centrale', 'Informaticien', 'ahmed@example.com', '12345678'],
        ['2', 'Sana', 'Trabelsi', 'Direction régionale', 'Juriste', 'sana@example.com', '87654321'],
      ]
    };

    this.initForm();
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
    const userData = this.tableData1.dataRows[index];

    this.userForm.patchValue({
      id: userData[0],
      nom: userData[1],
      prenom: userData[2],
      structure: userData[3],
      profile: userData[4],
      email: userData[5],
      telephone: userData[6]
    });

    this.showUserModal = true;
  }

  saveUser() {
    if (this.userForm.invalid) return;

    const formValues = this.userForm.value;
    const userData = [
      formValues.id,
      formValues.nom,
      formValues.prenom,
      formValues.structure,
      formValues.profile,
      formValues.email,
      formValues.telephone
    ];

    if (this.isEditMode) {
      this.tableData1.dataRows[this.selectedUserIndex] = userData;
    } else {
      this.tableData1.dataRows.push(userData);
    }

    this.showUserModal = false;
    this.userForm.reset();
  }

  deleteUser(index: number) {
    this.selectedUserIndex = index;
    this.selectedUser = this.tableData1.dataRows[index];
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.tableData1.dataRows.splice(this.selectedUserIndex, 1);
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
