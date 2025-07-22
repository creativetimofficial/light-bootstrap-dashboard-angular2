import { Component, HostListener, OnInit, AfterViewChecked, NgZone } from '@angular/core';
import { ProduitAvecDevisService, ProduitAvecDevis } from '../Services/ProduitAvecDevisService';
import { ProduitSansDevisService, ProduitSansDevis } from '../Services/ProduitSansDevisService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewChecked {
  isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const offset = window.pageYOffset || document.documentElement.scrollTop;

  allProduitsAvecDevis: ProduitAvecDevis[] = [];
  allProduitsNodevis: ProduitSansDevis[] = [];

  produits_nodevis: ProduitSansDevis[] = [];
  produits_avecdevis: ProduitAvecDevis[] = [];

  petitsCadres = [
    { label: 'Tous', active: true },
    { label: 'GPS Trackers', active: false },
    { label: 'Solutions IoT', active: false },
    { label: 'Solutions IT', active: false }
  ];

  fragmentToScroll: string | null = null;
  hasScrolled = false;

  constructor(
    private produitAvecDevisService: ProduitAvecDevisService,
    private produitSansDevisService: ProduitSansDevisService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      this.fragmentToScroll = fragment;
      this.hasScrolled = false;

      this.loadProduits().then(() => {
        if (fragment === 'section-it') {
          this.setActive('Solutions IT');
        } else if (fragment === 'section-iot') {
          this.setActive('Solutions IoT');
        } else if (fragment === 'section-gps') {
          this.setActive('GPS Trackers');
        } else {
          this.setActive('Tous');
        }
      });
    });
  }

  ngAfterViewChecked(): void {
    if (this.fragmentToScroll && !this.hasScrolled) {
      const element = document.getElementById(this.fragmentToScroll);
      if (element) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
            this.hasScrolled = true;
          }, 200);
        });
      }
    }
  }

  async loadProduits(): Promise<void> {
    const produitsSansDevis = this.produitSansDevisService.getAllProduits().toPromise();
    const produitsAvecDevis = this.produitAvecDevisService.getAllProduits().toPromise();

    const [nodevis, avecdevis] = await Promise.all([produitsSansDevis, produitsAvecDevis]);

    this.allProduitsNodevis = nodevis;
    this.allProduitsAvecDevis = avecdevis;

    this.produits_nodevis = [...nodevis];
    this.produits_avecdevis = [...avecdevis];
  }

  setActive(label: string) {
    this.petitsCadres.forEach((c) => (c.active = c.label === label));

    if (label === 'Tous') {
      this.produits_nodevis = [...this.allProduitsNodevis];
      this.produits_avecdevis = [...this.allProduitsAvecDevis];
    } else if (label === 'GPS Trackers') {
      this.produits_nodevis = this.allProduitsNodevis.filter((p) =>
        p.categorie.toUpperCase().includes('GPS')
      );
      this.produits_avecdevis = [];
    } else if (label === 'Solutions IoT') {
      this.produits_avecdevis = this.allProduitsAvecDevis.filter((p) =>
        p.categorie.toUpperCase().includes('IOT')
      );
      this.produits_nodevis = [];
    } else if (label === 'Solutions IT') {
      this.produits_avecdevis = [];
      this.produits_nodevis = [];
    }
  }

  isSolutionsITSelected(): boolean {
    return this.petitsCadres.find((c) => c.label === 'Solutions IT')?.active || false;
  }
}
