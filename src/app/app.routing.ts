import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { RegisterComponent } from './register/register.component';
import {ProductsComponent} from './products/products.component';
import {FormulaireIotItComponent} from './formulaire-iot-it/formulaire-iot-it.component';
import { FormFranchiseComponent } from './form-franchise/form-franchise.component';

const routes: Routes =[
  
  { path: '', component: VitrineComponent }, 
  { path: 'products', component: ProductsComponent }, 
  { path: 'home', component: VitrineComponent },
  { path: 'auth', component: RegisterComponent },
  { path: 'formulaireiotit', component: FormulaireIotItComponent },
  { path: 'formulairefranchise', component: FormFranchiseComponent }

  /*{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
