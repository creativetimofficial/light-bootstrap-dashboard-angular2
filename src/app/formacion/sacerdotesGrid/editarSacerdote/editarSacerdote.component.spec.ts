import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarSacerdoteComponent } from './editarSacerdote.component';

describe('EditarSacerdoteComponent', () => {
  let component: EditarSacerdoteComponent;
  let fixture: ComponentFixture<EditarSacerdoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSacerdoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSacerdoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
