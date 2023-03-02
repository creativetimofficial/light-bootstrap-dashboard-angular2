/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SacerdotesGridComponent } from './sacerdotesGrid.component';

describe('SacerdotesGridComponent', () => {
  let component: SacerdotesGridComponent;
  let fixture: ComponentFixture<SacerdotesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacerdotesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacerdotesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
