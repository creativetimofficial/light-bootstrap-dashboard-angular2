import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreationComponent } from './confirm-creation.component';

describe('ConfirmCreationComponent', () => {
  let component: ConfirmCreationComponent;
  let fixture: ComponentFixture<ConfirmCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
