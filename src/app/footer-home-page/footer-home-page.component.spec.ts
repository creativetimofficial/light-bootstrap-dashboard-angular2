import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHomePageComponent } from './footer-home-page.component';

describe('FooterHomePageComponent', () => {
  let component: FooterHomePageComponent;
  let fixture: ComponentFixture<FooterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
