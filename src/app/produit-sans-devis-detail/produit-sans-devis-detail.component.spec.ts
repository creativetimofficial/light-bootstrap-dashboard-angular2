import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitSansDevisDetailComponent } from './produit-sans-devis-detail.component';

describe('ProduitSansDevisDetailComponent', () => {
  let component: ProduitSansDevisDetailComponent;
  let fixture: ComponentFixture<ProduitSansDevisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitSansDevisDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitSansDevisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
