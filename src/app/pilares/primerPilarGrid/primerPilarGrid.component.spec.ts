/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CuartoPilarGridComponent } from './cuartoPilarGrid.component';

describe('CuartoPilarGridComponent', () => {
  let component: CuartoPilarGridComponent;
  let fixture: ComponentFixture<CuartoPilarGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuartoPilarGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuartoPilarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
