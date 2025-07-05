import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-petit-cadre',
  templateUrl: './petit-cadre.component.html',
  styleUrls: ['./petit-cadre.component.css']
})
export class PetitCadreComponent {
  @Input() label: string = '';
  @Input() active: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}

