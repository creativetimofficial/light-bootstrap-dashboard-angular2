import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductsComponent } from './form-products.component';

describe('FormProductsComponent', () => {
  let component: FormProductsComponent;
  let fixture: ComponentFixture<FormProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
