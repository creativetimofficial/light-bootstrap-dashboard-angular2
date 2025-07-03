import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormblogComponent } from './formblog.component';

describe('FormblogComponent', () => {
  let component: FormblogComponent;
  let fixture: ComponentFixture<FormblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
