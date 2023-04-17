import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsuariosGridComponent } from './usuariosGrid.component';

describe('UsuariosGridComponent', () => {
  let component: UsuariosGridComponent;
  let fixture: ComponentFixture<UsuariosGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
