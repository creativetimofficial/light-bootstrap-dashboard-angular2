import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { NavItem, NavItemType } from '../lbd.module';

export type BackgroundColor = 'blue' | 'azure' | 'green' | 'orange' | 'red' | 'purple';

@Component({
  selector: 'lbd-sidebar',
  templateUrl: './lbd-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdSidebarComponent {
  @Input()
  public headerText: string;

  @Input()
  public headerLink: string;

  @Input()
  public headerLogoImg: string;

  @Input()
  public backgroundColor: BackgroundColor;

  @Input()
  public backgroundImg: string;

  @Input()
  public navItems: NavItem[];

  constructor() { }

  public get backgroundStyle(): { [id: string]: string; } {
    return { 'background-image': `url(${this.backgroundImg})` };
  }

  public get sidebarItems(): NavItem[] {
    return this.navItems.filter(i => i.type === NavItemType.Sidebar);
  }

  public get navbarItems(): NavItem[] {
    return this.navItems.filter(i => i.type === NavItemType.NavbarLeft || i.type === NavItemType.NavbarRight);
  }
}
