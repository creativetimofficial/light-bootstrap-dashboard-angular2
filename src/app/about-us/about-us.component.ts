import { AfterViewInit, Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private router: Router) {}
  
  @ViewChild('aboutVideo', { static: false }) aboutVideo!: ElementRef<HTMLVideoElement>;

  EventImages = [
    { src: '/assets/img/FITA/FITA1.jfif', alt: 'Event 1', active: true },
    { src: '/assets/img/FITA/FITA2.jfif', alt: 'Event 2', active: false },
    { src: '/assets/img/FITA/FITA3.jfif', alt: 'Event 3', active: false },
    { src: '/assets/img/FITA/FITA4.jfif', alt: 'Event 4', active: false },
    { src: '/assets/img/FITA/FITA5.jfif', alt: 'Event 5', active: false },
    { src: '/assets/img/FITA/FITA6.jfif', alt: 'Event 6', active: false },
    { src: '/assets/img/FITA/FITA7.jfif', alt: 'Event 7', active: false }
  ];

  TeamBuildingImages = [
    { src: '/assets/img/TeamBuilding/TM1.jpeg', alt: 'TM 1', active: true },
    { src: '/assets/img/TeamBuilding/TM2.jpeg', alt: 'TM 2', active: false },
    { src: '/assets/img/TeamBuilding/TM3.jpeg', alt: 'TM 3', active: false },
    { src: '/assets/img/TeamBuilding/TM4.jpeg', alt: 'TM 4', active: false },
    { src: '/assets/img/TeamBuilding/TM5.jpeg', alt: 'TM 5', active: false },
    { src: '/assets/img/TeamBuilding/TM6.jpeg', alt: 'TM 6', active: false },
    { src: '/assets/img/TeamBuilding/TM7.jpeg', alt: 'TM 7', active: false },
    { src: '/assets/img/TeamBuilding/TM8.jpeg', alt: 'TM 8', active: false }

  ];
  membres = [
      {
      nom: 'Najet',
      prenom: 'Boukadi',
      profession: 'Financial Manager',
      image: '/assets/img/Equipe/NajetBoukadi.jfif'
    },
    {
      nom: 'Anis',
      prenom: 'Kalel',
      profession: 'PDG',
      image: '/assets/img/Equipe/AnisKallel.jfif'
    },
    {
      nom: 'Skander',
      prenom: 'Elj',
      profession: 'Information System Mnager',
      image: '/assets/img/Equipe/SkanderElj.jfif'
    }
  ];
  // Index indépendants pour chaque slider
  currentIndexEvent = 0;
  currentIndexTeamBuilding = 0;

  // Intervalles séparés
  slideIntervalEvent: any;
  slideIntervalTeamBuilding: any;

  private videoObserver?: IntersectionObserver;

  ngOnInit(): void {
    this.startSlider(this.EventImages, 'event');
    this.startSlider(this.TeamBuildingImages, 'teamBuilding');
  }

  ngAfterViewInit(): void {
    const videoEl = this.aboutVideo?.nativeElement;
    if (!videoEl) return;

    // Lecture immédiate (autoplay) - muting obligatoire pour autoplay sans interaction
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.play().catch(err => console.warn('Autoplay failed:', err));

    // Observer pour pause/reprise au scroll avec seuil bas (0.1)
    this.videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(err => console.warn('Autoplay failed:', err));
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.1 }
    );

    this.videoObserver.observe(videoEl);
  }

  startSlider(tab: any[], sliderType: 'event' | 'teamBuilding'): void {
    const interval = setInterval(() => {
      this.nextSlide(tab, sliderType);
    }, 3000);

    if (sliderType === 'event') {
      this.slideIntervalEvent = interval;
    } else {
      this.slideIntervalTeamBuilding = interval;
    }
  }

  nextSlide(tab: any[], sliderType: 'event' | 'teamBuilding'): void {
    let currentIndex = sliderType === 'event' ? this.currentIndexEvent : this.currentIndexTeamBuilding;

    tab[currentIndex].active = false;
    currentIndex = (currentIndex + 1) % tab.length;
    tab[currentIndex].active = true;

    if (sliderType === 'event') {
      this.currentIndexEvent = currentIndex;
    } else {
      this.currentIndexTeamBuilding = currentIndex;
    }
  }

  ngOnDestroy(): void {
    if (this.slideIntervalEvent) {
      clearInterval(this.slideIntervalEvent);
    }
    if (this.slideIntervalTeamBuilding) {
      clearInterval(this.slideIntervalTeamBuilding);
    }
    if (this.videoObserver && this.aboutVideo) {
      this.videoObserver.unobserve(this.aboutVideo.nativeElement);
      this.videoObserver.disconnect();
    }
  }
  soundOn = false;

toggleSound(): void {
  const videoEl = this.aboutVideo.nativeElement;
  this.soundOn = !this.soundOn;
  videoEl.muted = !this.soundOn;

  if (this.soundOn) {
    videoEl.play().catch(err => console.warn('Play with sound failed:', err));
  }
}
contact(event: Event){
    event.preventDefault();
    this.router.navigate(['contact']);
  }
}
