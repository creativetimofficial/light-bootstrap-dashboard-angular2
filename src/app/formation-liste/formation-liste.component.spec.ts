import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationListeComponent } from './formation-liste.component';

describe('FormationListeComponent', () => {
  let component: FormationListeComponent;
  let fixture: ComponentFixture<FormationListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
