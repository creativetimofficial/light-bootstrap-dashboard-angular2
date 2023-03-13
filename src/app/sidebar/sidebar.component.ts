import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon?: string;
    class: string;
}
<<<<<<< Updated upstream
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];
=======

interface IChildItem {
  path?: string;
  title: string;
  icon?: string;
  class: string;
  type?: string;
  sub?: IChildItem[];
}

export const ROUTES: RouteInfo[] = [
    
    { path: '/user', title: 'Usuarios',  icon:'pe-7s-add-user', class: '', type:'link' },
    // { path: '/UserTable', title: 'Listado Usuario',  icon:'pe-7s-user', class: '' },
    { title: 'Pilares', class: '', type:'dropDown', tooltip:'Pages', icon:'pe-7s-plugin', sub:[
        
      ] },
    { path: '/primerPilarGrid', title: 'Primer pilar', class: '', type:'link' },
    { path: '/segundoPilarGrid', title: 'Segundo pilar',  icon:'', class: '', type:'link' },
    { path: '/tercerPilarGrid', title: 'Tercer pilar',  icon:'', class: '', type:'link' },
    { path: '/cuartoPilarGrid', title: 'Cuarto pilar',  icon:'', class: '', type:'link' },
    { path: '/formation', title: 'formation', icon:'pe-7s-check', class: '', type:'link', },    
    { path: '/matrimoniosGrid', title: 'Matrimonios',  icon:'', class: '', type:'link' },
    { path: '/sacerdotesGrid', title: 'Sacerdotes',  icon:'', class: '', type:'link' },
    { path: '/icons', title: 'Reportes',  icon:'pe-7s-note2', class: '', type:'link' },
    { path: '/register', title: 'Registro',  icon:'pe-7s-note', class: '', type:'link' },
    { path: '/maps', title: 'Cerrar sesión',  icon:'pe-7s-power', class: '', type:'link' },

  ]

>>>>>>> Stashed changes

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
