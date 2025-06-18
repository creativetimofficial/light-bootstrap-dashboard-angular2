import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFranchiseComponent } from './form-franchise.component';

describe('FormFranchiseComponent', () => {
  let component: FormFranchiseComponent;
  let fixture: ComponentFixture<FormFranchiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFranchiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
