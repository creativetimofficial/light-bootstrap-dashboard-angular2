import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService,private cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    const token = this.authService.getToken();
    const role = this.authService.getRole();
    const expectedRole = route.data['role']; 

    const url = state.url;
    if ((url.includes('formulairefranchise') || url.includes('formulaireiotit'))
       &&(!token|| role === 'Administrateur')
      ) {
      Swal.fire({
        icon: 'error',
        title: 'Login Required',
        text: 'You must be logged in as a client to access this form.',
        confirmButtonText: 'Login'
      }).then(() => {
        this.cookieService.set('redirectAfterLogin', state.url);
       this.router.navigate(['/auth']);
      });
      return false;
    }

    
    if (expectedRole !== undefined && role !== expectedRole) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to access this page.',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        event.preventDefault();
        this.router.navigate(['/auth']);
      });
      return false;
    }
      if (!this.authService.isLoggedIn()) {
      Swal.fire({
    icon: 'warning',
    title: 'Session Expired',
    text: 'Your session has expired, please log in again.',
    confirmButtonText: 'Log In'
  }).then(() => {
    this.authService.logout();
    this.router.navigate(['/auth']);
  });
      return false;
    }

    // ✅ Sinon, tout est bon
    return true;
    
  }
  
}
