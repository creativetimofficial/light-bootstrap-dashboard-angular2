import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-home-page',
  templateUrl: './carousel-home-page.component.html',
  styleUrls: ['./carousel-home-page.component.scss']
})
export class CarouselHomePageComponent implements OnInit {

   slides = [
    {
      titleKey: 'CAROUSEL.SLIDE1.TITLE',
      subtitleKey: 'CAROUSEL.SLIDE1.SUBTITLE',
      descriptionKey: 'CAROUSEL.SLIDE1.DESCRIPTION',
      image: '/assets/img/route.png'
    },
    {
      titleKey: 'CAROUSEL.SLIDE2.TITLE',
      subtitleKey: 'CAROUSEL.SLIDE2.SUBTITLE',
      descriptionKey: 'CAROUSEL.SLIDE2.DESCRIPTION',
      image: '/assets/img/iot.png'
    },
    {
      titleKey: 'CAROUSEL.SLIDE3.TITLE',
      subtitleKey: 'CAROUSEL.SLIDE3.SUBTITLE',
      descriptionKey: 'CAROUSEL.SLIDE3.DESCRIPTION',
      image: '/assets/img/service.png'
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
  
  goToHomeAndScroll(section: string, event: Event) {
  event.preventDefault();
  this.router.navigate([''], { queryParams: { section } });
}

}
