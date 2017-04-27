/*!

 =========================================================
 * Light Bootstrap Dashboard Free Angular2 - v1.3.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard-angular2
 * Copyright 2016 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LbdSidebarComponent } from './lbd-sidebar/lbd-sidebar.component';
import { LbdNavbarComponent } from './lbd-navbar/lbd-navbar.component';
import { LbdFooterComponent } from './lbd-footer/lbd-footer.component';
import { LbdChartComponent } from './lbd-chart/lbd-chart.component';
import { LbdTaskListComponent } from './lbd-task-list/lbd-task-list.component';
import { NotificationService } from './services/notification.service';
import { LbdTableComponent } from './lbd-table/lbd-table.component';
import { LbdUserProfileComponent } from './lbd-user-profile/lbd-user-profile.component';
import { NavbarTitleService } from './services/navbar-title.service';
import { LbdCheckboxComponent } from './lbd-checkbox/lbd-checkbox.component';
import { MobileSidebarToggleService } from './services/mobile-sidebar-toggle.service';
import { LbdCloseLayerComponent } from './lbd-close-layer/lbd-close-layer.component';
import { LbdNavbarItemsComponent } from './lbd-navbar-items/lbd-navbar-items.component';
import { LbdSidebarItemsComponent } from './lbd-sidebar-items/lbd-sidebar-items.component';

export interface DropdownLink {
  title: string;
  routerLink?: string;
}

export enum NavItemType {
  Sidebar = 1, // Only ever shown on sidebar
  NavbarLeft = 2, // Left-aligned icon-only link on navbar in desktop mode, shown above sidebar items on collapsed sidebar in mobile mode
  NavbarRight = 3 // Right-aligned link on navbar in desktop mode, shown above sidebar items on collapsed sidebar in mobile mode
}

export interface NavItem {
  type: NavItemType;
  title: string;
  routerLink?: string;
  iconClass?: string;
  numNotifications?: number;
  dropdownItems?: (DropdownLink | 'separator')[];
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [NotificationService, NavbarTitleService, MobileSidebarToggleService],
  declarations: [
    LbdSidebarComponent,
    LbdNavbarComponent,
    LbdFooterComponent,
    LbdChartComponent,
    LbdTaskListComponent,
    LbdTableComponent,
    LbdUserProfileComponent,
    LbdCheckboxComponent,
    LbdCloseLayerComponent,
    LbdNavbarItemsComponent,
    LbdSidebarItemsComponent
  ],
  exports: [
    LbdSidebarComponent,
    LbdNavbarComponent,
    LbdFooterComponent,
    LbdChartComponent,
    LbdTaskListComponent,
    LbdTableComponent,
    LbdUserProfileComponent,
    LbdCloseLayerComponent
  ]
})
export class LbdModule { }
