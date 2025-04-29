import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertifService {
private apiUrl = 'http://localhost:8094/api/certificates/generate';
  constructor(private http: HttpClient) {}

  generateCertificates(data: { certTitle: string; date: string; participants: any[] }){
    console.log(data)
   
    return this.http.post<any>(this.apiUrl, data);
  }
  
}
