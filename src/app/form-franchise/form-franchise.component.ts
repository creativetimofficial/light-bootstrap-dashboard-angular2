import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-franchise',
  templateUrl: './form-franchise.component.html',
  styleUrls: ['./form-franchise.component.css']
})
export class FormFranchiseComponent implements OnInit {
  formFranchise!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formFranchise = this.fb.group({
      nom: ['Tapez vote nom', Validators.required],
      prenom: ['Tapez votre prénom', Validators.required],
      telephone: ['+216 xx xxx xxx', Validators.required],
      email: ['test@test.test', [Validators.required, Validators.email]],
      profession: ['Tapez votre profession'],
      experienceIT: ['', Validators.required],
      precisionsExp: [''],
      dirigeEntreprise: ['', Validators.required],
      secteurDuree: [''],
      motivation: ['Quels sont vos motivations pour rejoindre La franchise à Tunav', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formFranchise.valid) {
      console.log(this.formFranchise.value);
    } else {
      this.formFranchise.markAllAsTouched();
    }
  }
}
