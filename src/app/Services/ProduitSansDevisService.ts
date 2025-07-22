import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface ProduitSansDevis {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  prix: string;
  imagePath: string;
  caracteristiques: {
    id: number;
    texte: string;
    produitSansDevisId: number;
  }[];
  userId: number;
}

export interface ProduitSansDevisCreateRequest {
  titre: string;
  description: string;
  categorie: string;
  prix: string;
  image: File | null;
  caracteristiques: string[];
  userId: number;
}

export interface ProduitSansDevisUpdateRequest {
  titre: string;
  description: string;
  categorie: string;
  prix: string;
  newImage?: File | null;
  caracteristiques: string[];
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitSansDevisService {
  private apiUrl = environment.apiUrl + '/ProduitsSansDevis';

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<ProduitSansDevis[]> {
    return this.http.get<ProduitSansDevis[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProduitSansDevis> {
    return this.http.get<ProduitSansDevis>(`${this.apiUrl}/${id}`);
  }

  create(request: ProduitSansDevisCreateRequest): Observable<ProduitSansDevis> {
    const formData = new FormData();

    formData.append('Titre', request.titre);
    formData.append('Description', request.description);
    formData.append('Categorie', request.categorie);
    formData.append('Prix', request.prix);
    formData.append('UserId', request.userId.toString());

    request.caracteristiques.forEach(c => {
      formData.append('Caracteristiques', c);
    });

    if (request.image) {
      formData.append('Image', request.image, request.image.name);
    }

    return this.http.post<ProduitSansDevis>(this.apiUrl, formData);
  }

  update(id: number, request: ProduitSansDevisUpdateRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Titre', request.titre);
    formData.append('Description', request.description);
    formData.append('Categorie', request.categorie);
    formData.append('Prix', request.prix);

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
