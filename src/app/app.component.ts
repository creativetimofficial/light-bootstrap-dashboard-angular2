import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router ,NavigationEnd} from '@angular/router';
import { ScrollService } from './Services/scroll.service';
import { filter } from 'rxjs/operators';
import { LanguageService } from './Services/language.service';
import { TranslateService } from '@ngx-translate/core';@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
     constructor(private translate: TranslateService,
      public location: Location,private router: Router, 
      private scrollService: ScrollService,
      private languageService: LanguageService) 
     {
     translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('language') || 'en';

    console.log('Langue détectée au démarrage :', savedLang);

    translate.use(savedLang).subscribe({
      next: () => console.log(`Langue ${savedLang} chargée avec succès`),
      error: (err) => console.error(`Erreur lors du chargement de la langue ${savedLang}`, err)
    });


     }

    ngOnInit(){
    }
    ngAfterViewInit(): void {
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
