import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
export interface UserStatistics {
  visitors: number;
  signUps: number;
  logins: number;
  lastUpdated: string; 
}

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {
  private apiUrl = environment.apiUrl + '/userstatistics';

  constructor(private http: HttpClient) {}

  trackVisit() {
    return this.http.post(`${this.apiUrl}/track/visit`, {});
  }

  trackSignUp() {
    return this.http.post(`${this.apiUrl}/track/signup`, {});
  }

  trackLogin() {
    return this.http.post(`${this.apiUrl}/track/login`, {});
  }

 getStats(): Observable<UserStatistics> {
  return this.http.get<UserStatistics>(`${this.apiUrl}/stats`);
}

}
