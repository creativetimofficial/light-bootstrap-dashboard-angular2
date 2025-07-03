import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-iot-it',
  templateUrl: './formulaire-iot-it.component.html',
  styleUrls: ['./formulaire-iot-it.component.css']
})
export class FormulaireIotItComponent implements OnInit {
  selectedTab: 'iot' | 'it' = 'iot';
  formIot!: FormGroup;
  formIt!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formIot = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      entreprise: [''],
      message: ['', Validators.required]
    });

    this.formIt = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      entreprise: [''],
      message: ['', Validators.required]
    });
  }

  selectTab(tab: 'iot' | 'it') {
    this.selectedTab = tab;
  }

  submitForm(type: 'iot' | 'it') {
    const form = type === 'iot' ? this.formIot : this.formIt;
    if (form.valid) {
      console.log(`Formulaire ${type.toUpperCase()} :`, form.value);
      alert(`Formulaire ${type.toUpperCase()} soumis avec succès !`);
      form.reset();
    } else {
      form.markAllAsTouched();
    }
  }
}
