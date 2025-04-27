import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationListService {
  private apiUrl = 'http://localhost:8094/formations';

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
    deleteFormation(formationId: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${formationId}`);
    }
    
    getFormationParticipants(formationId:any): Observable<any> {
      return this.http.get(`${this.apiUrl}/${formationId}/participants`);
    }

    createFormation1(formation: any, formateurId: number, domaineId: number): Observable<any> {
      const params = new HttpParams()
        .set('formateurId', formateurId.toString())
        .set('domaineId', domaineId.toString());
    
      return this.http.post(`${this.apiUrl}`, formation, { params });
    }

    updateFormation(formationId:number,formation: any, formateurId: number, domaineId: number): Observable<any> {
      const params = new HttpParams()
      .set('formateurId', formateurId.toString())
      .set('domaineId', domaineId.toString());

    return this.http.put(`${this.apiUrl}/${formationId}`, formation, { params });
    }
  
    //  EXECEPTION : getAllDomains
    getAllDomaines(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:8094/domaines');
    }
    addParticipantToFormation(formationId: number, participantId: number): Observable<any> {
      return this.http.post(
        `${this.apiUrl}/${formationId}/participants/${participantId}`,
        {}
      );
    }
    removeParticipantFromFormation(formationId: number, participantId: number): Observable<any> {
      return this.http.delete(
        `${this.apiUrl}/${formationId}/participants/${participantId}`
      );
    }
}
