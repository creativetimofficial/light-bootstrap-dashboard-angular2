import { Component, OnInit } from '@angular/core';
export const ROUTES = [
  { path: '/dashboard', title: 'Dashboard', icon: 'fa fa-dashboard', class: '' },
  { path: '/listProducts', title: 'Liste des Produits', icon: 'fa fa-table', class: '' },
  { path: '/blogs', title: 'Liste des Blogs', icon: 'fa fa-book', class: '' },
  { path: '/users', title: 'Liste des Utilisateurs', icon: 'fa fa-user', class: '' },
  { path: '/franchises', title: 'Demandes des franchises', icon: 'fa fa-user', class: '' }

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public menuItems = [
    { path: 'dashboard', title: 'Dashboard', icon: 'fa fa-dashboard', class: '' },
    { path: 'listProducts', title: 'Liste des Produits', icon: 'fa fa-table', class: '' },
    { path: 'listblogs', title: 'Liste des Blogs', icon: 'fa fa-book', class: '' },
    { path: 'listusers', title: 'Liste des Utilisateurs', icon: 'fa fa-user', class: '' },
    { path: 'franchises', title: 'Demandes des franchises', icon: 'fa fa-user', class: '' }
  ];

  constructor() {}

  ngOnInit(): void {}

  isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  }
}
