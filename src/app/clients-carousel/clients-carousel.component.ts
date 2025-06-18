import { Component, OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clients-carousel',
  templateUrl: './clients-carousel.component.html',
  styleUrls: ['./clients-carousel.component.scss']
})
export class ClientsCarouselComponent implements OnInit , OnDestroy {
  clients = [
    { name: 'Client 1', logo: '/assets/img/logos/pgs.jpeg' },
    { name: 'Client 2', logo: '/assets/img/logos/pharmaderm.jpeg' },
    { name: 'Client 3', logo: '/assets/img/logos/sagemcom.jpeg' },
    { name: 'Client 4', logo: '/assets/img/logos/TT.jpeg' },
    { name: 'Client 5', logo: '/assets/img/logos/pharmaservice.jpeg' },
    { name: 'Client 6', logo: '/assets/img/logos/cftp.jpeg' },
    { name: 'Client 7', logo: '/assets/img/logos/cnam.jpeg' },
    { name: 'Client 8', logo: '/assets/img/logos/etap.jpeg' },
    { name: 'Client 9', logo: '/assets/img/logos/smtf.jpeg' },
    { name: 'Client 10', logo: '/assets/img/logos/TLS.jpeg' },


  ];

  duplicatedClients = [...this.clients, ...this.clients]; // Pour l'effet infini
  private animationFrameId: number;
  private scrollSpeed = 1; // Ajustez la vitesse ici
  private carouselElement: HTMLElement;

  ngOnInit(): void {
    this.carouselElement = document.querySelector('.carousel-content');
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  startAnimation(): void {
    let position = 0;
    const animate = () => {
      position += this.scrollSpeed;
      
      // Réinitialiser la position quand on arrive à la moitié (grâce aux éléments dupliqués)
      if (position >= this.carouselElement.scrollWidth / 2) {
        position = 0;
      }
      
      this.carouselElement.style.transform = `translateX(-${position}px)`;
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stopAnimation(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}