import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseDetailComponent } from './franchise-detail.component';

describe('FranchiseDetailComponent', () => {
  let component: FranchiseDetailComponent;
  let fixture: ComponentFixture<FranchiseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
