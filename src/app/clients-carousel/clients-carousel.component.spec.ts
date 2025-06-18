import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCarouselComponent } from './clients-carousel.component';

describe('ClientsCarouselComponent', () => {
  let component: ClientsCarouselComponent;
  let fixture: ComponentFixture<ClientsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
