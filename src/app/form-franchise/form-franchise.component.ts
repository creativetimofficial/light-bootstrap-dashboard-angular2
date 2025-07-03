import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FranchiseService } from 'app/Services/franchise.service';
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

  constructor(private fb: FormBuilder,private franchiseService: FranchiseService) {}

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
    Swal.fire('Erreur', 'Numéro ou pays non sélectionné.', 'error');
    return;
  }

  const phoneRegex = /^[0-9]{6,15}$/;

  if (!phoneRegex.test(localNumber)) {
    Swal.fire('Numéro invalide', 'Le numéro ne doit contenir que des chiffres (pas de lettres ni de symboles).', 'error');
    return;
  }

  const internationalNumber = `+${dialCode}${localNumber.replace(/^0+/, '')}`;
  this.formFranchise.patchValue({ telephone: internationalNumber });

  // 🔐 Validation conditionnelle
  if (this.formFranchise.get('experienceIT')?.value === 'oui' &&
      !this.formFranchise.get('precisionsExp')?.value.trim()) {
    Swal.fire('Champ requis', 'Veuillez préciser votre expérience en IT/IoT/GPS.', 'warning');
    return;
  }

  if (this.formFranchise.get('dirigeEntreprise')?.value === 'oui' &&
      !this.formFranchise.get('secteurDuree')?.value.trim()) {
    Swal.fire('Champ requis', 'Veuillez préciser le secteur et la durée de l’entreprise que vous avez dirigée.', 'warning');
    return;
  }

  // 🔍 Validation générale
  if (!this.formFranchise.valid) {
    const controls = this.formFranchise.controls;

    if (controls['nom'].invalid) {
      Swal.fire('Champ requis', 'Veuillez renseigner votre nom.', 'warning');
      return;
    }

    if (controls['prenom'].invalid) {
      Swal.fire('Champ requis', 'Veuillez renseigner votre prénom.', 'warning');
      return;
    }

    if (controls['email'].invalid) {
      Swal.fire('Email invalide', 'Veuillez saisir une adresse email valide.', 'error');
      return;
    }

    if (controls['experienceIT'].invalid) {
      Swal.fire('Champ requis', 'Veuillez indiquer votre expérience.', 'warning');
      return;
    }

    if (controls['dirigeEntreprise'].invalid) {
      Swal.fire('Champ requis', 'Veuillez préciser si vous avez dirigé une entreprise.', 'warning');
      return;
    }

    if (controls['motivation'].invalid) {
      Swal.fire('Champ requis', 'Veuillez indiquer vos motivations.', 'warning');
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
  userId: 1 
};

this.franchiseService.envoyerDemandeFranchise(payload).subscribe({
  next: (res) => {
    console.log('Réponse API :', res);
    Swal.fire('Succès', 'Votre demande a bien été envoyée.', 'success');
    this.formFranchise.reset();
  },
  error: (err) => {
    console.error('Erreur API :', err);
    Swal.fire('Erreur', 'Une erreur est survenue lors de l\'envoi.', 'error');
  }
});

}

}
