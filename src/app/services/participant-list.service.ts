import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ParticipantListService {

   private apiUrl = 'http://localhost:8094/participants'; 
  
    constructor(private http: HttpClient) { }
  
    getAllParticipant() {
      return this.http.get<any[]>(this.apiUrl);
    }

    deleteParticipant(participantId: any){
      return this.http.delete(`${this.apiUrl}/${participantId}`);
    }

    createParticipant(participant: any, profileId: number, structureId: number){
      console.log(participant)
      const body = {
        ...participant
      };
      return this.http.post<any>(this.apiUrl, body, {
        params: {
          profileId: profileId.toString(),
          structureId: structureId.toString()
        }
      });
    }

    updateParticipant(participantId: number, participant: any): Observable<any> {
      const participantToSend = {
        nom: participant.nom,
        prenom: participant.prenom,
        email: participant.email,
        tel: participant.tel,
        profile: { id: participant.profileId },       
        structure: { id: participant.structureId }    
      };
    
      console.log('Participant envoyé :', participantToSend);
    
      return this.http.put(`${this.apiUrl}/${participantId}`, participantToSend);
    }

    
    
  
}
