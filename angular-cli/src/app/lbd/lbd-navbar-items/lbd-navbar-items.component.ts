import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavItem } from '../lbd.module';

@Component({
  selector: 'lbd-navbar-items',
  templateUrl: './lbd-navbar-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdNavbarItemsComponent {
  @Input()
  navItems: NavItem[];

  @Input()
  navbarClass: string;

  @Input()
  showTitles: boolean;

  constructor() { }
}
