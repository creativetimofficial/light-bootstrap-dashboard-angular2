import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarMatrimonioComponent } from './editarMatrimonio.component';

describe('EditarMatrimonioComponent', () => {
  let component: EditarMatrimonioComponent;
  let fixture: ComponentFixture<EditarMatrimonioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMatrimonioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
