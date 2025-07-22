import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFranchisesComponent } from './liste-franchises.component';

describe('ListeFranchisesComponent', () => {
  let component: ListeFranchisesComponent;
  let fixture: ComponentFixture<ListeFranchisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFranchisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFranchisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
