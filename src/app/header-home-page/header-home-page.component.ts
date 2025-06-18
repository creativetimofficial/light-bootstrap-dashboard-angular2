import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'app/Services/scroll.service';

@Component({
  selector: 'app-header-home-page',
  templateUrl: './header-home-page.component.html',
  styleUrls: ['./header-home-page.component.scss']
})
export class HeaderHomePageComponent implements OnInit {
  constructor(private router: Router, private scrollService: ScrollService) {}

  navigateToSection(sectionId: string) {
    const currentUrl = this.router.url;
    if (currentUrl !== '/home') {
      this.scrollService.setAnchor(sectionId);
      this.router.navigate(['/home']);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }


  ngOnInit(): void {
  }


  Login(event: Event){
    event.preventDefault();
    this.router.navigate(['auth']);
  }

}
