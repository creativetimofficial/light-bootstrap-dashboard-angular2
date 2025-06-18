import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from 'app/Services/scroll.service';

@Component({
  selector: 'app-header-home-page',
  templateUrl: './header-home-page.component.html',
  styleUrls: ['./header-home-page.component.scss']
})
export class HeaderHomePageComponent implements OnInit {
  pendingSection: string | null = null;

  constructor(private router: Router) {
    // Quand la navigation finit, scroll vers la section demandée si besoin
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.pendingSection) {
        setTimeout(() => {
          const el = document.getElementById(this.pendingSection!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          this.pendingSection = null;
        }, 100); // délai pour que la page ait le temps de s'afficher
      }
    });
  }

  navigateToSection(sectionId: string, event: Event) {
    event.preventDefault();  // Empêche le comportement par défaut du lien

    // Vérifie si on est sur la page d'accueil (adapter le chemin selon ton routing)
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/' && currentUrl !== '/home') {
      // Pas sur la home => redirige vers home, puis scroll
      this.pendingSection = sectionId;
      this.router.navigate(['/']);
    } else {
      // Déjà sur la home => scroll direct
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
 ngOnInit(): void {
  window.addEventListener('scroll', this.onScroll);
}

onScroll = () => {
  const scrollY = window.scrollY;
  const logoBlanc = document.getElementById('logoBlanc');
  const logoCouleur = document.getElementById('logoCouleur');

  if (scrollY <= 50) {
    logoBlanc!.style.display = 'block';
    logoCouleur!.style.display = 'none';
  } else {
    logoBlanc!.style.display = 'none';
    logoCouleur!.style.display = 'block';
  }
};


  Login(event: Event){
    event.preventDefault();
    this.router.navigate(['auth']);
  }
   About(event: Event){
    event.preventDefault();
    this.router.navigate(['about']);
  }
   Blogs(event: Event){
    event.preventDefault();
    this.router.navigate(['blogs']);
  }
}
