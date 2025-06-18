import { Component, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { TablesComponent } from './tables/tables.component';
import { UsersListsComponent } from './users-lists/users-lists.component';
import { BlogslistComponent } from './blogslist/blogslist.component';
import { FormblogComponent } from './formblog/formblog.component';
import {ProductsComponent} from './products/products.component';
import {FormulaireIotItComponent} from './formulaire-iot-it/formulaire-iot-it.component';
import { FormFranchiseComponent } from './form-franchise/form-franchise.component';

const routes: Routes =[
  
  { path: '', component: VitrineComponent }, 
  { path: 'products', component: ProductsComponent }, 
  { path: 'home', component: VitrineComponent },
  { path: 'auth', component: RegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  {path:'blogs',component:BlogsComponent},
  {
    path: 'admin',
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
      },
      { path: 'add-product', component: FormProductsComponent },
      { path: 'update-product/:id', component: FormProductsComponent },
      { path: 'listProducts', component: TablesComponent },
      {path:'listblogs',component:BlogslistComponent},
      {path:'listusers',component:UsersListsComponent},
      { path: 'add-blog', component: FormblogComponent },
      { path: 'update-blog/:id', component: FormblogComponent },
      { path: 'admin', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: '**',component: VitrineComponent
    
  }
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
