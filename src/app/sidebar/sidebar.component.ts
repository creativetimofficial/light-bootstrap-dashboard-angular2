import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/Services/auth.service';
export const ROUTES = [
  { path: '/dashboard', title: 'Dashboard', icon: 'fa fa-dashboard', class: '' },
  { path: '/listProducts', title: 'Liste des Produits', icon: 'fa fa-table', class: '' },
  { path: '/blogs', title: 'Liste des Blogs', icon: 'fa fa-book', class: '' },
  { path: '/users', title: 'Liste des Utilisateurs', icon: 'fa fa-user', class: '' },
  { path: '/franchises', title: 'Demandes des franchises', icon: 'fa fa-user', class: '' },
  { path: '/listDevis', title: 'Liste des Devis', icon: 'fa fa-user', class: '' },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public menuItems = [
  { path: 'dashboard', title: 'Dashboard', icon: 'fa fa-tachometer-alt', class: '' },
  { path: 'listProducts', title: 'Liste des Produits', icon: 'fa fa-cubes', class: '' },
  { path: 'listblogs', title: 'Liste des Blogs', icon: 'fa fa-newspaper', class: '' },
  { path: 'listusers', title: 'Liste des Utilisateurs', icon: 'fa fa-users', class: '' },
  { path: 'franchises', title: 'Demandes des franchises', icon: 'fa fa-handshake', class: '' },
  { path: 'listDevis', title: 'Liste des devis', icon: 'fa fa-file-invoice-dollar', class: '' },
  ];

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {}

  isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  }
   logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
