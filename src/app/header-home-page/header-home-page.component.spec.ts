import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomePageComponent } from './header-home-page.component';

describe('HeaderHomePageComponent', () => {
  let component: HeaderHomePageComponent;
  let fixture: ComponentFixture<HeaderHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
