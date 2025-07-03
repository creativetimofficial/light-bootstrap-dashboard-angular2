import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireIotItComponent } from './formulaire-iot-it.component';

describe('FormulaireIotItComponent', () => {
  let component: FormulaireIotItComponent;
  let fixture: ComponentFixture<FormulaireIotItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireIotItComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireIotItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
