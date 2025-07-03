import { Component ,HostListener, OnInit} from '@angular/core';
import { ProduitAvecDevisService, ProduitAvecDevis } from '../Services/ProduitAvecDevisService';
import { ProduitSansDevisService, ProduitSansDevis } from '../Services/ProduitSansDevisService';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = offset > 300; 
  }
  
  allProduitsAvecDevis: ProduitAvecDevis[] = [];
  allProduitsNodevis:ProduitSansDevis[] = [];
  
  produits_nodevis : ProduitSansDevis[] = [];
  produits_avecdevis : ProduitAvecDevis[] = [];
  
  constructor(private produitAvecDevisService: ProduitAvecDevisService,private produitSansDevisService: ProduitSansDevisService) {}
  
  petitsCadres = [
    { label: 'Tous', active: true },
    { label: 'GPS Trackers', active: false },
    { label: 'Solutions IoT', active: false },
    { label: 'Solutions IT', active: false }
  ];
  ngOnInit(): void {
    this.produitAvecDevisService.getAllProduits().subscribe(data => {
      this.allProduitsAvecDevis = data;
      this.produits_avecdevis = [...data];
    });
    this.produitSansDevisService.getAllProduits().subscribe(data => {
      this.allProduitsNodevis = data;
      this.produits_nodevis = [...data];
    });
  }
  setActive(label: string) {
    this.petitsCadres.forEach(c => c.active = (c.label === label));

    if (label === 'Tous') {
      this.produits_nodevis = [...this.allProduitsNodevis];
      this.produits_avecdevis = [...this.allProduitsAvecDevis];
    } else if (label === 'GPS Trackers') {
      this.produits_nodevis = this.allProduitsNodevis.filter(p => p.categorie.toUpperCase().includes('GPS'));
      this.produits_avecdevis = [];
    } else if (label === 'Solutions IoT') {
      this.produits_avecdevis = this.allProduitsAvecDevis.filter(p => p.categorie.toUpperCase().includes('IOT'));
      this.produits_nodevis = [];
    } else if (label === 'Solutions IT') {
      this.produits_avecdevis = [];
      this.produits_nodevis = [];
    }
  }
  isSolutionsITSelected(): boolean {
  return this.petitsCadres.find(c => c.label === 'Solutions IT')?.active || false;
}

}

