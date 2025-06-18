import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteProduitNodevisComponent } from './carte-produit-nodevis.component';

describe('CarteProduitNodevisComponent', () => {
  let component: CarteProduitNodevisComponent;
  let fixture: ComponentFixture<CarteProduitNodevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteProduitNodevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteProduitNodevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
