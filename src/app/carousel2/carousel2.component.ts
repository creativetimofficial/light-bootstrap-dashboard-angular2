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
      titleKey: 'CAROUSEL.SLIDE1.TITLE',
      subtitleKey: 'CAROUSEL.SLIDE1.SUBTITLE',
      descriptionKey: 'CAROUSEL.SLIDE1.DESCRIPTION',
      image: 'assets/img/route.png'
    },
    {
      titleKey: 'CAROUSEL.SLIDE2.TITLE',
      subtitleKey: 'CAROUSEL.SLIDE2.SUBTITLE',
      descriptionKey: 'CAROUSEL.SLIDE2.DESCRIPTION',
      image: 'assets/img/iot.png'
    },
    {
      titleKey: 'CAROUSEL.SLIDE3.TITLE',
      subtitleKey: 'CAROUSEL.SLIDE3.SUBTITLE',
      descriptionKey: 'CAROUSEL.SLIDE3.DESCRIPTION',
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
