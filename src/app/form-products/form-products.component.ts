import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProduitAvecDevisService,
  ProduitAvecDevis,
  ProduitAvecDevisCreateRequest,
  ProduitAvecDevisUpdateRequest
} from '../Services/ProduitAvecDevisService';
import {
  ProduitSansDevisService,
  ProduitSansDevis,
  ProduitSansDevisCreateRequest,
  ProduitSansDevisUpdateRequest
} from '../Services/ProduitSansDevisService';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss']
})
export class FormProductsComponent implements OnInit {
  
  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  apiBaseUrl = environment.baseUrl

  type: 'iot' | 'gps' = 'gps';
  caracteristiques: string[] = [];
  newCaracteristique: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produitSansDevisService: ProduitSansDevisService,
    private produitAvecDevisService: ProduitAvecDevisService,
    private cookieService: CookieService
  ) {}
 storedUser = this.cookieService.get('userId');;
 userId = this.storedUser ? Number(this.storedUser) : null;
  ngOnInit(): void {
    const routeType = this.route.snapshot.queryParamMap.get('type');
    if (routeType === 'iot' || routeType === 'gps') {
      this.type = routeType;
    }

    this.productForm = this.fb.group({
      nom: [''],
      description: [''],
      categorie: [this.type],
      prix: this.type === 'gps' ? [''] : null,
      image: [null],
      userId: ['']
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEditMode = true;

      if (this.type === 'gps') {
        this.produitSansDevisService.getById(this.productId).subscribe({
          next: (product: ProduitSansDevis) => {
            this.productForm.patchValue({
              nom: product.titre,
              description: product.description,
              prix: product.prix,
              categorie: product.categorie
            });
            this.caracteristiques = product.caracteristiques.map(c => c.texte);
            this.previewUrl = product.imagePath.startsWith('/assets') 
            ? product.imagePath 
            :  this.apiBaseUrl + product.imagePath;

          },
          error: err => console.error('Erreur chargement produit GPS :', err)
        });
      } else {
        this.produitAvecDevisService.getById(this.productId).subscribe({
          next: (product: ProduitAvecDevis) => {
            this.productForm.patchValue({
              nom: product.titre,
              description: product.description,
              categorie: product.categorie
            });
            this.caracteristiques = product.caracteristiques.map(c => c.texte);
            this.previewUrl = product.imagePath.startsWith('/assets')
            ? product.imagePath
            : this.apiBaseUrl + product.imagePath;

          },
          error: err => console.error('Erreur chargement produit IoT :', err)
        });
      }
    }
  }

  onSubmit(): void {
    const formValue = this.productForm.value;

    if (this.type === 'iot') {
      if (this.isEditMode && this.productId) {
        const updateRequest: ProduitAvecDevisUpdateRequest = {
          titre: formValue.nom,
          description: formValue.description,
          categorie: 'iot',
          caracteristiques: this.caracteristiques,
          newImage: this.selectedFile || undefined
        };

        this.produitAvecDevisService.update(this.productId, updateRequest).subscribe({
          next: () => this.router.navigate(['/listProducts']),
          error: err => console.error('Erreur update IoT :', err)
        });

      } else {
        if (!this.selectedFile) {
          console.error('Aucune image sélectionnée.');
          return;
        }

        const createRequest: ProduitAvecDevisCreateRequest = {
          titre: formValue.nom,
          description: formValue.description,
          categorie: 'iot',
          caracteristiques: this.caracteristiques,
          image: this.selectedFile,
        };

        this.produitAvecDevisService.create(createRequest).subscribe({
          next: () => this.router.navigate(['/listProducts']),
          error: err => console.error('Erreur ajout IoT :', err)
        });
      }
    } else {
      if (this.isEditMode && this.productId) {
        const updateRequest: ProduitSansDevisUpdateRequest = {
          titre: formValue.nom,
          description: formValue.description,
          categorie: 'gps',
          prix: formValue.prix,
          caracteristiques: this.caracteristiques,
          userId:this.userId,
          newImage: this.selectedFile || undefined
        };

        this.produitSansDevisService.update(this.productId, updateRequest).subscribe({
          next: () => this.router.navigate(['/listProducts']),
          error: err => console.error('Erreur update GPS :', err)
        });

      } else {
        if (!this.selectedFile) {
          console.error('Aucune image sélectionnée.');
          return;
        }

        const createRequest: ProduitSansDevisCreateRequest = {
          titre: formValue.nom,
          description: formValue.description,
          categorie: 'gps',
          prix: formValue.prix,
          caracteristiques: this.caracteristiques,
          image: this.selectedFile,
          userId: this.userId
        };

        this.produitSansDevisService.create(createRequest).subscribe({
          next: () => this.router.navigate(['/listProducts']),
          error: err => console.error('Erreur ajout GPS :', err)
        });
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length) {
      this.handleFile(event.target.files[0]);
    }
  }

  handleFile(file: File) {
    this.selectedFile = file;
    this.productForm.patchValue({ image: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addCaracteristique(event: KeyboardEvent) {
    event.preventDefault();
    const valeur = this.newCaracteristique.trim();
    if (valeur && !this.caracteristiques.includes(valeur)) {
      this.caracteristiques.push(valeur);
      this.newCaracteristique = '';
    }
  }

  removeCaracteristique(index: number) {
    this.caracteristiques.splice(index, 1);
  }
}
