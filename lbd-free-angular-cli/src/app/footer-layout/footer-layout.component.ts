import { Component, OnInit } from '@angular/core';
import { FooterItem } from '../lbd/lbd-footer/lbd-footer.component';

@Component({
  selector: 'app-footer-layout',
  templateUrl: './footer-layout.component.html'
})
export class FooterLayoutComponent implements OnInit {
  public footerItems: FooterItem[];
  public copyright: string;

  constructor() { }

  public ngOnInit() {
    this.footerItems = [
      { title: 'Home', routerLink: '' },
      { title: 'Company', routerLink: '' },
      { title: 'Portfolio', routerLink: '' },
      { title: 'Blog', routerLink: '' }
    ];
    this.copyright = '&copy; 2016 <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web';
  }
}
