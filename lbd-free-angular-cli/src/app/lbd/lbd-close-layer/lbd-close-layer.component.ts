import { Component, OnInit } from '@angular/core';
import { MobileSidebarToggleService } from '../services/mobile-sidebar-toggle.service';

/**
 * This should be included as a sibling of main-panel so that the mobile sidebar can be closed by clicking anywhere in the non-nav part
 * of the page.
 */

@Component({
  selector: 'lbd-close-layer',
  template: '<div *ngIf="mobileSidebarOpen" class="close-layer visible" (click)="closeSidebar()"></div>'
})
export class LbdCloseLayerComponent implements OnInit {
  public mobileSidebarOpen = false;

  constructor(private mobileSidebarToggleService: MobileSidebarToggleService) { }

  public ngOnInit() {
    this.mobileSidebarToggleService.mobileSidebarVisibilityChanged$.subscribe(visible => {
      this.mobileSidebarOpen = visible;
    });
  }

  public closeSidebar() {
    this.mobileSidebarToggleService.updateVisibility(false);
  }
}
