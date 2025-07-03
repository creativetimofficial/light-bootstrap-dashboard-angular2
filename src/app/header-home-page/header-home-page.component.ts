import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'app/Services/language.service';

@Component({
  selector: 'app-header-home-page',
  templateUrl: './header-home-page.component.html',
  styleUrls: ['./header-home-page.component.scss']
})
export class HeaderHomePageComponent implements OnInit {
  isDropdownOpen = true;
  pendingSection: string | null = null;
   languages = [
  { code: 'en', name: 'English', flag: '/assets/img/flags/united-kingdom-flag.png' },
  { code: 'fr', name: 'Francais', flag: '/assets/img/flags/france-flag.png' }
];

  currentLanguage = 'en';
  constructor(private router: Router,private translate: TranslateService,private languageService: LanguageService,private cdr: ChangeDetectorRef) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    console.log(this.isDropdownOpen);
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


  switchLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.translate.use(languageCode);
    localStorage.setItem('language', languageCode);
    this.isDropdownOpen = false;
  }
  changeDropDown()
  {
    this.isDropdownOpen=!this.isDropdownOpen;
    this.cdr.detectChanges();
    console.log(this.isDropdownOpen);
  }
  getFlag(languageCode: string): string {
    const language = this.languages.find((lang) => lang.code === languageCode);
    return language ? language.flag : '';
  }
  navigateToSection(sectionId: string, event: Event) {
    event.preventDefault();  

    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/' && currentUrl !== '/home') {
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
