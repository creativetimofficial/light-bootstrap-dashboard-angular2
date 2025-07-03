import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface ProduitAvecDevis {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  imagePath: string;
  caracteristiques: {
    id: number;
    texte: string;
    produitAvecDevisId: number;
  }[];
}

export interface ProduitAvecDevisCreateRequest {
  titre: string;
  description: string;
  categorie: string;
  image: File | null;
  caracteristiques: string[];
}

export interface ProduitAvecDevisUpdateRequest {
  titre: string;
  description: string;
  categorie: string;
  newImage?: File | null;
  caracteristiques: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProduitAvecDevisService {
  private apiUrl = environment.apiUrl + '/ProduitsAvecDevis';

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<ProduitAvecDevis[]> {
    return this.http.get<ProduitAvecDevis[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProduitAvecDevis> {
    return this.http.get<ProduitAvecDevis>(`${this.apiUrl}/${id}`);
  }

  create(request: ProduitAvecDevisCreateRequest): Observable<ProduitAvecDevis> {
    const formData = new FormData();

    formData.append('Titre', request.titre);
    formData.append('Description', request.description);
    formData.append('Categorie', request.categorie);

    request.caracteristiques.forEach(c => {
      formData.append('Caracteristiques', c);
    });

    if (request.image) {
      formData.append('Image', request.image, request.image.name);
    }

    return this.http.post<ProduitAvecDevis>(this.apiUrl, formData);
  }

  update(id: number, request: ProduitAvecDevisUpdateRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Titre', request.titre);
    formData.append('Description', request.description);
    formData.append('Categorie', request.categorie);

    request.caracteristiques.forEach(c => {
      formData.append('Caracteristiques', c);
    });

    if (request.newImage) {
      formData.append('NewImage', request.newImage, request.newImage.name);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}
