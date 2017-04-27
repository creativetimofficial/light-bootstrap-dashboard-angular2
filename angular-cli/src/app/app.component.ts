import {Component, OnInit} from '@angular/core';
import { NavItem, NavItemType } from './lbd/lbd.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public navItems: NavItem[];

  constructor() {
  }

  public ngOnInit(): void {
    this.navItems = [
      { type: NavItemType.Sidebar, title: 'Dashboard', routerLink: 'dashboard', iconClass: 'pe-7s-graph' },
      { type: NavItemType.Sidebar, title: 'User Profile', routerLink: 'user', iconClass: 'pe-7s-user' },
      { type: NavItemType.Sidebar, title: 'Table List', routerLink: 'table', iconClass: 'pe-7s-note2' },
      { type: NavItemType.Sidebar, title: 'Typography', routerLink: 'typography', iconClass: 'pe-7s-news-paper' },
      { type: NavItemType.Sidebar, title: 'Icons', routerLink: 'icons', iconClass: 'pe-7s-science' },
      { type: NavItemType.Sidebar, title: 'Maps', routerLink: 'maps', iconClass: 'pe-7s-map-marker' },
      { type: NavItemType.Sidebar, title: 'Notifications', routerLink: 'notifications', iconClass: 'pe-7s-bell' },

      { type: NavItemType.NavbarLeft, title: 'Dashboard', iconClass: 'fa fa-dashboard' },
      {
        type: NavItemType.NavbarLeft,
        title: '5 Notifications',
        iconClass: 'fa fa-globe',
        numNotifications: 5,
        dropdownItems: [
          { title: 'Notification 1' },
          { title: 'Notification 2' },
          { title: 'Notification 3' },
          { title: 'Notification 4' },
          { title: 'Another Notification' }
        ]
      },
      { type: NavItemType.NavbarLeft, title: 'Search', iconClass: 'fa fa-search' },

      { type: NavItemType.NavbarRight, title: 'Account' },
      {
        type: NavItemType.NavbarRight,
        title: 'Dropdown',
        dropdownItems: [
          { title: 'Action' },
          { title: 'Another action' },
          { title: 'Something' },
          { title: 'Another action' },
          { title: 'Something' },
          'separator',
          { title: 'Separated link' },
        ]
      },
      { type: NavItemType.NavbarRight, title: 'Log out' }
    ];
  }
}
