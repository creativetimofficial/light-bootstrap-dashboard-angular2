import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarCuartoPilarComponent } from './editarCuartoPilar.component';

describe('EditarCuartoPilarComponent', () => {
  let component: EditarCuartoPilarComponent;
  let fixture: ComponentFixture<EditarCuartoPilarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCuartoPilarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCuartoPilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
