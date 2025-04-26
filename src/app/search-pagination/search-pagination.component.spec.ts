import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaginationComponent } from './search-pagination.component';

describe('SearchPaginationComponent', () => {
  let component: SearchPaginationComponent;
  let fixture: ComponentFixture<SearchPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
