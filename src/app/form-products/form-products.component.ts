import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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

  type: 'iot' | 'gps' = 'gps';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nom: [''],
      description: [''],
      prix: this.type === 'gps' ? [''] : null,
      image: [null]
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEditMode = true;
      const product = this.getProductById(this.productId);
      if (product) {
        this.productForm.patchValue({
          nom: product.nom,
          description: product.description,
          prix: product.prix
        });
        this.previewUrl = product.image;
      }
    }
    const routeType = this.route.snapshot.queryParamMap.get('type');
    if (routeType === 'iot' || routeType === 'gps') {
      this.type = routeType;
    }
  }

  onSubmit(): void {
    const formValue = this.productForm.value;
    if (this.type === 'iot') {
      console.log('Produit IoT envoyé :', {
        titre: formValue.nom,
        description: formValue.description,
        image: this.selectedFile,
        categorie: 'iot'
      });
    } else {
      console.log('Produit GPS envoyé :', {
        titre: formValue.nom,
        description: formValue.description,
        prix: formValue.prix,
        image: this.selectedFile,
        categorie: 'gps'
      });
    }
    this.router.navigate(['/listProducts']);
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

  getProductById(id: number) {
    return {
      id,
      nom: 'Produit Exemple',
      description: 'Description exemple',
      prix: 99.99,
      image: 'https://via.placeholder.com/150'
    };
  }

}
