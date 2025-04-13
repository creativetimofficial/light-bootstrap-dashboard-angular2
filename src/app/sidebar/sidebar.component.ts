import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'Mon Profile',  icon:'pe-7s-user', class: '' },
    { path: '/user-list', title: 'Les utilisateurs',  icon:'pe-7s-users', class: '' },
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

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
