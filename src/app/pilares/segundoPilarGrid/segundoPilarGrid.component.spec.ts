/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SegundoPilarGridComponent } from './segundoPilarGrid.component';

describe('PrimerPilarGridComponent', () => {
  let component: SegundoPilarGridComponent;
  let fixture: ComponentFixture<SegundoPilarGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegundoPilarGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundoPilarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
