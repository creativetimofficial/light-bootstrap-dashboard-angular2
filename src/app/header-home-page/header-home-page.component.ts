import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/Services/auth.service';
import { LanguageService } from 'app/Services/language.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-home-page',
  templateUrl: './header-home-page.component.html',
  styleUrls: ['./header-home-page.component.scss']
})
export class HeaderHomePageComponent implements OnInit {
  isDropdownOpen = false;
  isNavbarCollapsed: boolean = true;
  isLoggedIn = false;
  pendingSection: string | null = null;
  languages = [
  { code: 'en', name: 'English', flag: '/assets/img/flags/united-kingdom-flag.png' },
  { code: 'fr', name: 'Francais', flag: '/assets/img/flags/france-flag.png' },
  { code: 'ar', name: 'العربية', flag: '/assets/img/flags/tn-flag.gif' } 
];
   ngOnInit(): void {
  this.checkLoginStatus();
  window.addEventListener('scroll', this.onScroll);
  
 }
  currentLanguage = 'en';
  constructor(private router: Router,private translate: TranslateService,
    private authService: AuthService,
    private languageService: LanguageService,private cdr: ChangeDetectorRef) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.pendingSection) {
        setTimeout(() => {
          const el = document.getElementById(this.pendingSection!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          this.pendingSection = null;
        }, 100); 
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
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

checkLoginStatus(): void {
    const token = this.authService.getToken(); 
    this.isLoggedIn = !!token;
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
   Franchise(event: Event){
    event.preventDefault();
    this.router.navigate(['formulairefranchise']);
  }
  logout()
  {
    this.authService.logout();
    Swal.fire({
    title: this.translate.instant('ALERT.LOGOUT_TITLE'),
    text: this.translate.instant('ALERT.LOGOUT_SUCCESS'),
    icon: 'success',
    showConfirmButton: true,
    confirmButtonText: this.translate.instant('ALERT.OK'),
    background: '#f0f8ff',
    color: '#333',
    confirmButtonColor: '#3085d6',
    backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `
  });
   this.checkLoginStatus()
  }
}
