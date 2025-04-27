import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmployeurService {
  private apiUrl = 'http://localhost:8094/employeurs'; // URL du backend pour les employeurs

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les employeurs
  getEmployeurs(): Observable<any[]> {
    console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.get<any[]>(this.apiUrl);
    
  }

  // Méthode pour créer un employeur
  createEmployeur(employeur: any): Observable<any> {
    console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.post(this.apiUrl, employeur);
  }

  // Méthode pour mettre à jour un employeur
  updateEmployeur(employeurId: any, employeur: any): Observable<any> {
    console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.put(`${this.apiUrl}/${employeurId}`, employeur);
  }

  // Méthode pour supprimer un employeur
  deleteEmployeur(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        // Si une erreur se produit lors de la requête HTTP, on la gère ici.
        Swal.fire({
          confirmButtonColor: '#d82c2c',
          icon: 'error',
          title: 'Erreur',
          text: error.error.message || 'Une erreur est survenue lors de la suppression.',
        });
        throw error;  // Lancer l'erreur à nouveau pour la gestion dans le composant si nécessaire
      })
    );
  }


  // Méthode pour obtenir un employeur par son ID
  getEmployeurById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
