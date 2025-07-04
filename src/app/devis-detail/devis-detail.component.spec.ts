import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisDetailComponent } from './devis-detail.component';

describe('DevisDetailComponent', () => {
  let component: DevisDetailComponent;
  let fixture: ComponentFixture<DevisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
