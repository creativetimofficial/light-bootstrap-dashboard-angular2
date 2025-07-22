import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAvecDevisDetailComponent } from './produit-avec-devis-detail.component';

describe('ProduitAvecDevisDetailComponent', () => {
  let component: ProduitAvecDevisDetailComponent;
  let fixture: ComponentFixture<ProduitAvecDevisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAvecDevisDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitAvecDevisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
