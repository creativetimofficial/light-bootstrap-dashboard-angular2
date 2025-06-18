import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteProduitComponent } from './carte-produit.component';

describe('CarteProduitComponent', () => {
  let component: CarteProduitComponent;
  let fixture: ComponentFixture<CarteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
