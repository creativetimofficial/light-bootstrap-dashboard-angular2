import { AfterViewInit, Component, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class VitrineComponent implements AfterViewInit {
  constructor(private router: Router,private route: ActivatedRoute, private scroller: ViewportScroller) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const section = params['section'];
    if (section) {
      setTimeout(() => {
        this.scroller.scrollToAnchor(section);
      }, 100); // délai pour laisser le DOM charger
    }
  });
}

  ngAfterViewInit() {
    this.initScripts();
  }
  // constructor(private router: Router) {}


  initScripts() {

    function getOffSet(){
      let _offset = 450;
      const windowHeight = window.innerHeight;
      if(windowHeight > 500) _offset = 400;
      if(windowHeight > 680) _offset = 300;
      if(windowHeight > 830) _offset = 210;
      return _offset;
    }

    function setParallaxPosition($doc: any, multiplier: number, $object: any) {
      const offset = getOffSet();
      const from_top = $doc.scrollTop();
      const bg_css = 'center ' + (multiplier * from_top - offset) + 'px';
      $object.css({"background-position" : bg_css });
    }

    const background_image_parallax = function($object: any, multiplier = 0.5, forceSet = false){
      multiplier = 1 - multiplier;
      const $doc = $(document);
      if(forceSet) {
        setParallaxPosition($doc, multiplier, $object);
      } else {
        $(window).on('scroll', function(){          
          setParallaxPosition($doc, multiplier, $object);
        });
      }
    };

    const background_image_parallax_2 = function($object: any, multiplier = 0.5){
      multiplier = 1 - multiplier;
      $object.css({"background-attachment" : "fixed"});
      $(window).on('scroll', function(){
        if($(window).width() > 768) {
          const firstTop = $object.offset().top;
          const pos = $(window).scrollTop();
          const yPos = Math.round((multiplier * (firstTop - pos)) - 186);
          const bg_css = 'center ' + yPos + 'px';
          $object.css({"background-position" : bg_css });
        } else {
          $object.css({"background-position" : "center" });
        }
      });
    };

    // Initialise les effets quand le DOM est prêt (ici, ngAfterViewInit)
    background_image_parallax($(".tm-parallax"), 0.30, false);
    background_image_parallax_2($("#contact"), 0.80);   
    background_image_parallax_2($("#testimonials"), 0.80);   

    window.addEventListener('resize', () => {
      background_image_parallax($(".tm-parallax"), 0.30, true);
    }, true);

    $(window).on('scroll', () => {          
      if($(document).scrollTop() > 120) {
        $('.tm-navbar').addClass("scroll");
      } else {
        $('.tm-navbar').removeClass("scroll");
      }
    });

    $('#tmNav a').on('click', () => {
      $('.navbar-collapse').removeClass('show'); 
    });

    $('#tmNav').singlePageNav({
      'easing': 'easeInOutExpo',
      'speed': 600
    });        

    $("a").on('click', function(event: any) {
      if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, 'easeInOutExpo', () => {
          window.location.hash = hash;
        });
      }
    });

    $('.tm-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true }
    });

    $('.tm-testimonials-carousel').slick({
      dots: true,
      prevArrow: false,
      nextArrow: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }, 
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }                 
        }
      ]
    });

    $('.tm-gallery').slick({
      dots: true,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

     formData = {
    name: '',
    email: '',
    message: ''
  };

 /* onSubmit() {
    const recipient = 'tunav@tunav.com';
    const subject = encodeURIComponent(`Message de ${this.formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`
    );

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank'); 
  }
*/
isOpen = false;

  @ViewChild('menuSection', { static: true }) menuSection!: ElementRef;

  icons: string[] = [
  'GUINÉE',
  'CONGO',
  'RD CONGO',
  'MAURITANIE',
  'BURKINA FASO',
  'FRANCE',
  'LIBYE',
  'MAROC',
  'CÔTE D\'IVOIRE',
  'MALI',
  'SÉNÉGAL',
  'TOGO'
];

  getIconTransform(index: number): string {
    const angle = (360 / this.icons.length) * index;
    const radius = 300;
        return this.isOpen
      ? `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
      : `rotate(0deg) translate(0)`;
  }

 @HostListener('window:scroll', [])
onScroll() {
  const sectionTop = this.menuSection.nativeElement.getBoundingClientRect().top;
  const sectionBottom = this.menuSection.nativeElement.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.7 && sectionBottom > windowHeight * 0.3) {
    this.isOpen = true; 
  } else {
    this.isOpen = false; 
  }
}
  goToProductsPage(): void {
  this.router.navigate(['/products']);
  }



}
