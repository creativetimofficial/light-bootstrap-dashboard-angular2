import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Vérifie les rôles autorisés depuis la route
    const expectedRoles: number[] = route.data['roles'];

    if (expectedRoles && expectedRoles.length > 0) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // décode le token JWT
        const userRoleId = payload.roleId;

        if (expectedRoles.includes(userRoleId)) {
          return true;
        } else {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      } catch (error) {
        console.error('Erreur de décodage du token', error);
        this.router.navigate(['/login']);
        return false;
      }
    }

    // Si aucun rôle spécifique n’est requis
    return true;
  }
}
