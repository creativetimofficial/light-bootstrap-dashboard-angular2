import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailjsService } from 'emailJs/email.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { UserStatisticsService } from './user-statistics.service';

interface DecodedToken {
  exp: number; 
  [key: string]: any;
}

export interface SignUpRequest {
  nom: string;
  email: string;
  role:number;
}

export interface SignInRequest {
  email: string;
  password: string;
}
export interface ForgetPasswordRequest {
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient,private emailjsService: EmailjsService,private cookieService: CookieService,
    private statisticsService: UserStatisticsService
  ) {}

signUp(data: SignUpRequest): Observable<{ message: string; mdp: string }> {
  return new Observable(observer => {
    this.http.post<{ message: string; mdp: string }>(`${this.apiUrl}/signup`, data).subscribe({
      next: (response) => {
        // 🔁 Track signup après succès
        this.statisticsService.trackSignUp().subscribe({
          next: () => console.log('📊 Signup tracked'),
          error: err => console.error('❌ Failed to track signup')
        });

        observer.next(response);
        observer.complete();
      },
      error: (err) => {
        observer.error(err);
      }
    });
  });
}


signIn(data: SignInRequest): Observable<any> {
  return new Observable(observer => {
    this.http.post(`${this.apiUrl}/signin`, data).subscribe({
      next: (response) => {
        this.statisticsService.trackLogin().subscribe({
          next: () => console.log('📊 Login tracked'),
          error: err => console.error('❌ Failed to track login')
        });

        observer.next(response);
        observer.complete();
      },
      error: (err) => {
        observer.error(err);
      }
    });
  });
}

  
  getToken(): string | null {
    return this.cookieService.get('token');
  }
  getRole(): string | null {
    return this.cookieService.get('role');
  }
  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    this.cookieService.delete('name');
    this.cookieService.delete('userId');
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const exp = decoded.exp;
      const now = Date.now() / 1000;
      /*const tokenIssueTime = exp - 3600; // supposons token valide 1h normalement
      const testExpirationTime = tokenIssueTime + 60; // 1 minute après issue
      return now > testExpirationTime;*/
      return exp < now;
    } catch (e) {
      return true; 
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }
 forgetPassword(dat: ForgetPasswordRequest): Observable<{ mdp: string }> {
  return this.http.post<{ mdp: string }>(`${this.apiUrl}/forget-password`, dat);
}


}
