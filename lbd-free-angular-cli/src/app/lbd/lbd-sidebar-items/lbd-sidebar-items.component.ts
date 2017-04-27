import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavItem } from '../lbd.module';

@Component({
  selector: 'lbd-sidebar-items',
  templateUrl: './lbd-sidebar-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdSidebarItemsComponent {
  @Input()
  navItems: NavItem[];

  @Input()
  navbarClass: string;

  @Input()
  showSeparator: boolean;

  constructor() { }
}
