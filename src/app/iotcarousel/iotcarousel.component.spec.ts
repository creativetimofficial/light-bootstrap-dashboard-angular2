import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IOTCarouselComponent } from './iotcarousel.component';

describe('IOTCarouselComponent', () => {
  let component: IOTCarouselComponent;
  let fixture: ComponentFixture<IOTCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IOTCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IOTCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
