import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FranchiseService } from 'app/Services/franchise.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

declare var intlTelInput: any;

@Component({
  selector: 'app-form-franchise',
  templateUrl: './form-franchise.component.html',
  styleUrls: ['./form-franchise.component.css']
})
export class FormFranchiseComponent implements OnInit, AfterViewInit {
  @ViewChild('phoneInput', { static: false }) phoneInputRef!: ElementRef;
  formFranchise!: FormGroup;
  iti: any;
 storedUser = this.cookieService.get('userId');
 userId = this.storedUser ? Number(this.storedUser) : null;
  constructor(private fb: FormBuilder,private franchiseService: FranchiseService,private router: Router,private cookieService: CookieService) {}

  ngOnInit(): void {
    this.formFranchise = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profession: [''],
      experienceIT: ['', Validators.required],
      precisionsExp: [''],
      dirigeEntreprise: ['', Validators.required],
      secteurDuree: [''],
      motivation: ['', Validators.required],
    });
    
  }

  ngAfterViewInit(): void {
    this.iti = intlTelInput(this.phoneInputRef.nativeElement, {
      initialCountry: 'tn',
      utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    });
  }

onSubmit(): void {
  const localNumber = this.phoneInputRef.nativeElement.value.trim();
  const countryData = this.iti.getSelectedCountryData();
  const dialCode = countryData?.dialCode || '';

  if (!localNumber || !dialCode) {
    Swal.fire('Error', 'Phone number or country not selected.', 'error');
    return;
  }

  const phoneRegex = /^[0-9]{6,15}$/;

  if (!phoneRegex.test(localNumber)) {
    Swal.fire('Invalid number', 'The number must contain only digits (no letters or symbols).', 'error');
    return;
  }

  const internationalNumber = `+${dialCode}${localNumber.replace(/^0+/, '')}`;
  this.formFranchise.patchValue({ telephone: internationalNumber });

  // 🔐 Validation conditionnelle
  if (this.formFranchise.get('experienceIT')?.value === 'oui' &&
      !this.formFranchise.get('precisionsExp')?.value.trim()) {
    Swal.fire('Required field', 'Please specify your experience in IT/IoT/GPS.', 'warning');
    return;
  }

  if (this.formFranchise.get('dirigeEntreprise')?.value === 'oui' &&
      !this.formFranchise.get('secteurDuree')?.value.trim()) {
    Swal.fire('Required field', 'Please specify the sector and duration of the company you managed.', 'warning');
    return;
  }

  // 🔍 Validation générale
  if (!this.formFranchise.valid) {
    const controls = this.formFranchise.controls;

    if (controls['nom'].invalid) {
      Swal.fire('Required field', 'Please enter your last name.', 'warning');
      return;
    }

    if (controls['prenom'].invalid) {
      Swal.fire('Required field', 'Please enter your first name.', 'warning');
      return;
    }

    if (controls['email'].invalid) {
      Swal.fire('Invalid email', 'Please enter a valid email address.', 'error');
      return;
    }

    if (controls['experienceIT'].invalid) {
      Swal.fire('Required field', 'Please indicate your experience.', 'warning');
      return;
    }

    if (controls['dirigeEntreprise'].invalid) {
      Swal.fire('Required field', 'Please specify if you have managed a company.', 'warning');
      return;
    }

    if (controls['motivation'].invalid) {
      Swal.fire('Required field', 'Please state your motivations.', 'warning');
      return;
    }

    this.formFranchise.markAllAsTouched();
    return;
  }

  const formData = this.formFranchise.value;

const payload = {
  nom: formData.nom,
  prenom: formData.prenom,
  email: formData.email,
  telephone: internationalNumber,
  professionActuelle: formData.profession || '',
  experienceIotGps: formData.experienceIT === 'oui' ? formData.precisionsExp : '',
  entrepriseDirige: formData.dirigeEntreprise === 'oui' ? formData.secteurDuree : '',
  motivation: formData.motivation,
  userId: this.userId
};

this.franchiseService.envoyerDemandeFranchise(payload).subscribe({
  next: (res) => {
    Swal.fire('Success', 'Your request has been sent successfully.', 'success');
    this.formFranchise.reset();
    this.router.navigate(['/home']);

  },
  error: (err) => {
    Swal.fire('Error', 'An error occurred while sending', 'error');
  }
});

}

}
