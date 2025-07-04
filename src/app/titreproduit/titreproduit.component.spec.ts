import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreproduitComponent } from './titreproduit.component';

describe('TitreproduitComponent', () => {
  let component: TitreproduitComponent;
  let fixture: ComponentFixture<TitreproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitreproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
