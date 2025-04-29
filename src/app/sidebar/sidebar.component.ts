import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { data } from 'jquery';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    //{ path: '/user', title: 'Mon Profile',  icon:'pe-7s-user', class: '' },
    { path: '/user-list', title: 'Les utilisateurs',  icon:'pe-7s-users', class: '' },
    { path: '/employeur-list', title: 'Les employeurs',  icon:'pe-7s-users', class: '' },
    { path: '/participant-list', title: 'Les participants',  icon:'pe-7s-users', class: '' },
    { path: '/formateur-list', title: 'Les formateurs',  icon:'pe-7s-id', class: '' },
    { path: '/formation-liste', title: 'Les formations',  icon:'pe-7s-study', class: '' },
    // { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
     //{ path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  connectedUserId: number;
  connectedRoleId: number;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
    this.authService.getUserId().subscribe({
      next: (data) =>{
        this.connectedUserId = data.userId;
        console.log("connectedUserId: ",this.connectedUserId);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });

    this.authService.getRoleId().subscribe({
      next: (data) =>{
        this.connectedRoleId = data.roleId;
        console.log("connectedRoleId: ",this.connectedRoleId);
        this.filterRoutesByRole(this.connectedRoleId); // filtrage ici
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  filterRoutesByRole(roleId: number) {
    if (roleId === 1) {
      this.menuItems = ROUTES; // Admin: tout
    } else if (roleId === 2) {
      this.menuItems = ROUTES.filter(item => item.path !== '/user-list');
    } else if (roleId === 3) {
      this.menuItems = ROUTES.filter(item => item.path !== '/user-list' && item.path !== '/dashboard');
    } else {
      this.menuItems = []; // Aucun accès
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
