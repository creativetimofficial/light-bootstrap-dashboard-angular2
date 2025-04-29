import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8094/api/email/envoyer';

  constructor(private http: HttpClient) { }

  // Fonction pour envoyer les e-mails
  envoyerEmails(emailRequest: { objet: any, message: any, listeMails: any[] }) {
    console.log(emailRequest)
    return this.http.post<any>(this.apiUrl, emailRequest);
  }
}