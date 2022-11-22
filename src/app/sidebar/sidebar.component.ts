import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user', title: 'Usuarios',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Pilares',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Formación',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Reportes',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Cerrar sesión',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
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
