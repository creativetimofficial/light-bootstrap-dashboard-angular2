import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router ,NavigationEnd} from '@angular/router';
import { ScrollService } from './Services/scroll.service';
import { filter } from 'rxjs/operators';
import { LanguageService } from './Services/language.service';
import { TranslateService } from '@ngx-translate/core';import { UserStatisticsService } from './Services/user-statistics.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
     constructor(private translate: TranslateService,
      public location: Location,private router: Router, 
      private scrollService: ScrollService,
      private statsService: UserStatisticsService,
      private languageService: LanguageService) 
     {
     translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('language') || 'en';


    translate.use(savedLang).subscribe({
      next: () => console.log(`Langue chargée avec succès`),
      error: (err) => console.error(`Erreur lors du chargement de la langue`)
    });


     }

    ngOnInit(){

     const adminPaths = [
      'dashboard',
      'admin',
      'add-product',
      'update-product',
      'listProducts',
      'listblogs',
      'listusers',
      'add-blog',
      'update-blog',
      'franchises',
      'listDevis',
      'devis',
      'produit-iot',
      'produit-gps',
    ];

    const currentUrl = this.router.url;

    const isAdminRoute = adminPaths.some(path => currentUrl.includes(path));

    if (!isAdminRoute) {
      this.statsService.trackVisit().subscribe({
        next: () => console.log('✅ Visit tracked'),
        error: err => console.error('❌ Visit tracking failed')
      });
    }

  }
  ngAfterViewInit(): void 
  {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const anchor = this.scrollService.getAnchor();
        if (anchor) {
          setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      });
  }
  isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
}
