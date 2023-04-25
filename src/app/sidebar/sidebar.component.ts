import { Component, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path?: string;
    title: string;
    icon?: string;
    class: string;
    tooltip?: string; // Tooltip text
    type?: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
    sub?: IChildItem[];
}

interface IChildItem {
  path?: string;
  title: string;
  icon: string;
  class: string;
  type?: string;
  sub?: IChildItem[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/usuariosGrid', title: 'Lista usuarios', icon:'pe-7s-add-user', class: '', type:'link' },
    { title: 'Pilares',  icon:'', class: '', type:'dropDown', tooltip:'Pages', sub:[] },
    { path: '/primerPilarGrid', title: 'Primer pilar',  icon:'pe-7s-plugin', class: '', type:'link' },
    { path: '/segundoPilarGrid', title: 'Segundo pilar',  icon:'pe-7s-plugin', class: '', type:'link' },
    { path: '/tercerPilarGrid', title: 'Tercer pilar',  icon:'pe-7s-plugin', class: '', type:'link' },
    { path: '/cuartoPilarGrid', title: 'Cuarto pilar',  icon:'pe-7s-plugin', class: '', type:'link' },
    { path: '/formation', title: 'formación', icon:'', class: '', type:'link', },    
    { path: '/matrimoniosGrid', title: 'Matrimonios',  icon:'pe-7s-leaf', class: '', type:'link' },
    { path: '/sacerdotesGrid', title: 'Sacerdotes',  icon:'pe-7s-id', class: '', type:'link' },
    { path: '/icons', title: 'Reportes',  icon:'pe-7s-note2', class: '', type:'link' },
    { path: '/register', title: 'Registro',  icon:'pe-7s-note', class: '', type:'link' },
    { path: '/maps', title: 'Cerrar sesión',  icon:'pe-7s-power', class: '', type:'link' },
    ]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  openSidebar: boolean = true;

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
