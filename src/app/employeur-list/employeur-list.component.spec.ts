import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeurListComponent } from './employeur-list.component';

describe('EmployeurListComponent', () => {
  let component: EmployeurListComponent;
  let fixture: ComponentFixture<EmployeurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeurListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
