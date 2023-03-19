import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-nuevoPrimerPilar',
  templateUrl: './nuevoPrimerPilar.component.html',
  styleUrls: ['./nuevoPrimerPilar.component.css']
})
export class NuevoPrimerPilarComponent implements OnInit {

  constructor() { 
    const routes: Routes = [
      { path: 'nuevoPrimerPilar', component: NuevoPrimerPilarComponent }
    ];
  }

 
  ngOnInit() {
  }
  
}
