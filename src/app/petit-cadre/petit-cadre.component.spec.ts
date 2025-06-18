import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitCadreComponent } from './petit-cadre.component';

describe('PetitCadreComponent', () => {
  let component: PetitCadreComponent;
  let fixture: ComponentFixture<PetitCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetitCadreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetitCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
