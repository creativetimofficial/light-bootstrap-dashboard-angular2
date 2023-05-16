import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimLoginErrorComponent } from './confim-login-error.component';

describe('ConfimLoginErrorComponent', () => {
  let component: ConfimLoginErrorComponent;
  let fixture: ComponentFixture<ConfimLoginErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfimLoginErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfimLoginErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
