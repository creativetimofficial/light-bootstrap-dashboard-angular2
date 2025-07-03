import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel2',
  templateUrl: './carousel2.component.html',
  styleUrls: ['./carousel2.component.css']
})
export class Carousel2Component implements OnInit, OnDestroy {
  slides = [
    {
      title: 'TRACKING GPS',
      subtitle: "Accélérez votre transformation digitale avec le suivi GPS",
      description: "Nous accompagnons les entreprises et les particuliers avec des solutions intelligentes de suivi GPS et de gestion de flotte, conçues pour optimiser leurs performances.",
      image: 'assets/img/route.png'
    },
    {
      title: 'SOLUTION IOT',
      subtitle: "Sécurisez vos données avec les solutions IoT avancées",
      description: "Nos solutions IoT vous offrent une surveillance intelligente, une gestion simplifiée de vos équipements et une sécurité renforcée, pour gagner en efficacité au quotidien",
      image: 'assets/img/iot.png'
    },
    {
      title: 'SOLUTION IT',
      subtitle: "Transformez votre entreprise grâce à la gestion de flotte",
      description: "Nous développons et intégrons des solutions IT qui renforcent les opérations,améliorent la performance et accélèrent la transformation digitale des entreprises.",
      image: 'assets/img/service.png'
    }
  ];

  currentSlide = 0;
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.intervalId = setInterval(() => this.nextSlide(), 4000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  goToVitrine() {
    this.router.navigate(['/vitrine']);
  }
  scrollToGps() {
  const titreSection = document.getElementById('partietitre');
  if (titreSection) {
    titreSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
