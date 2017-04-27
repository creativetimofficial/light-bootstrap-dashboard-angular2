import {Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NavbarTitleService } from '../services/navbar-title.service';
import { NavItem, NavItemType } from '../lbd.module';
import { MobileSidebarToggleService } from '../services/mobile-sidebar-toggle.service';

@Component({
  selector: 'lbd-navbar',
  templateUrl: './lbd-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdNavbarComponent implements OnInit {
  @Input()
  public navItems: NavItem[];

  public title: string;

  public mobileSidebarOpen = false;
  public navCloseIcon = false;

  constructor(private navbarTitleService: NavbarTitleService, private mobileSidebarToggleService: MobileSidebarToggleService,
              private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.navbarTitleService.titleChanged$.subscribe(title => {
      this.title = title;
      this.cd.markForCheck();
    });

    this.mobileSidebarToggleService.mobileSidebarVisibilityChanged$.subscribe(visible => {
      visible ? this.openMobileNav() : this.closeMobileNav();
    });
  }

  public get leftNavItems(): NavItem[] {
    return this.navItems.filter(i => i.type === NavItemType.NavbarLeft);
  }

  public get rightNavItems(): NavItem[] {
    return this.navItems.filter(i => i.type === NavItemType.NavbarRight);
  }

  public navbarToggle() {
    this.mobileSidebarOpen ?
      this.mobileSidebarToggleService.updateVisibility(false) :
      this.mobileSidebarToggleService.updateVisibility(true);
  }

  private closeMobileNav() {
    $('html').removeClass('nav-open');
    this.mobileSidebarOpen = false;
    this.cd.markForCheck();

    setTimeout(() => {
      this.navCloseIcon = false;
      this.cd.markForCheck();
    }, 400);
  }

  private openMobileNav() {
    $('html').addClass('nav-open');
    this.mobileSidebarOpen = true;
    this.cd.markForCheck();

    setTimeout(() => {
      this.navCloseIcon = true;
      this.cd.markForCheck();
    }, 430);
  }
}
