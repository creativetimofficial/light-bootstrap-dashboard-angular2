import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NuevoSegundoPilarComponent } from './nuevoSegundoPilar.component';

describe('NuevoPrimerPilarComponent', () => {
  let component: NuevoSegundoPilarComponent;
  let fixture: ComponentFixture<NuevoSegundoPilarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoSegundoPilarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSegundoPilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
