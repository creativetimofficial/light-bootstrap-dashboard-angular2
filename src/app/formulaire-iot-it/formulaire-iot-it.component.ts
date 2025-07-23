import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from 'app/Services/devis.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulaire-iot-it',
  templateUrl: './formulaire-iot-it.component.html',
  styleUrls: ['./formulaire-iot-it.component.css']
})
export class FormulaireIotItComponent implements OnInit {
  selectedTab: 'iot' | 'it' = 'iot';
  formIot!: FormGroup;
  formIt!: FormGroup;
  produitAvecDevisId: number = 0;
  produitTitre: string = '';
  constructor(private fb: FormBuilder,private cookieService: CookieService,private devisService: DevisService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    const typeParam = params['type'];
    if (typeParam === 'it' || typeParam === 'iot') {
      this.selectedTab = typeParam;
    }

    this.produitAvecDevisId = +params['produitId'] || 0;
    this.produitTitre = params['titre'] || '';
    });
    
    this.formIot = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      entreprise: [''],
      message: ['', Validators.required],
      quantite: [1] 
    });

    this.formIt = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      entreprise: [''],
      message: ['', Validators.required],
      quantite: [0] 
    });
  }

  selectTab(tab: 'iot' | 'it') {
    this.selectedTab = tab;
  }

 submitForm(type: 'iot' | 'it') {
  const form = type === 'iot' ? this.formIot : this.formIt;
    if (form.invalid) {
        const invalidFields = Object.keys(form.controls).filter(key => form.controls[key].invalid);

        let errorMsg = 'Please fill in the required fields correctly:\n';
       // errorMsg += invalidFields.map(field => `- ${this.getFieldLabel(field)}`).join('\n');

        Swal.fire({
          icon: 'error',
          title: 'Invalid form',
          text: errorMsg,
          confirmButtonText: 'OK'
        });
        return; 
      }
  const userId = this.cookieService.get('userId');;
  
  const data = {
    ...form.value,
    userId,
    produitAvecDevisId: type === 'iot' ? this.produitAvecDevisId : null,
    etat:0
  };
  this.devisService.addDevis(data).subscribe({
   next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Quote request sent!',
        text: 'Your request has been successfully submitted.',
        confirmButtonText: 'OK'
      })
      .then(() => {
        this.router.navigate(['/products']); 
      });

      form.reset();
      form.reset();
    },
    error: err => {
      Swal.fire({
         icon: 'error',
        title: 'An error occurred',
        text: 'There was a problem submitting your request. Please try again later.',
        confirmButtonText: 'Close'
      });
    }
  });
}
getFieldLabel(fieldName: string): string {
  switch (fieldName) {
    case 'nom': return 'Nom';
    case 'prenom': return 'Prénom';
    case 'email': return 'Email';
    case 'message': return 'Message';
    case 'quantite': return 'Quantité';
    default: return fieldName;
  }
}

}
