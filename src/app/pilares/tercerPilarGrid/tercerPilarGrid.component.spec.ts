/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TercerPilarGridComponent } from './tercerPilarGrid.component';

describe('TercerPilarGridComponent', () => {
  let component: TercerPilarGridComponent;
  let fixture: ComponentFixture<TercerPilarGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TercerPilarGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerPilarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
