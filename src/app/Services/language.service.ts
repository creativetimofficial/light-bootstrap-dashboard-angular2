import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLanguage);
  }

  setLanguage(lang: string) {
  this.translate.use(lang).subscribe({
    next: () => console.log(`Langue activée`),
    error: (err) => console.error(`Erreur de chargement pour `)
  });
  localStorage.setItem('language', lang);
}


  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}
