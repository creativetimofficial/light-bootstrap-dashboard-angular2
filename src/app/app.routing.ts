import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserComponent } from './user/user.component';
import { PrimerPilarGridComponent } from './pilares/primerPilarGrid/primerPilarGrid.component';
import { SegundoPilarGridComponent } from './pilares/segundoPilarGrid/segundoPilarGrid.component';
import { TercerPilarGridComponent } from './pilares/tercerPilarGrid/tercerPilarGrid.component';
import { CuartoPilarGridComponent } from './pilares/cuartoPilarGrid/cuartoPilarGrid.component';
import { MatrimoniosGridComponent } from './formacion/matrimoniosGrid/matrimoniosGrid.component';
import { SacerdotesGridComponent } from './formacion/sacerdotesGrid/sacerdotesGrid.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { RegisterComponent } from './register/register.component';
import { FormationComponent } from './formation/formation.component';
import { LoginComponent } from './login/login.component';
import { NuevoPrimerPilarComponent } from './pilares/primerPilarGrid/nuevoPrimerPilar/nuevoPrimerPilar.component';
import { NuevoSegundoPilarComponent } from './pilares/segundoPilarGrid/nuevoSegundoPilar/nuevoSegundoPilar.component';
import { NuevoTercerPilarComponent } from './pilares/tercerPilarGrid/nuevoTercerPilar/nuevoTercerPilar.component';
import { NuevoCuartoPilarComponent } from './pilares/cuartoPilarGrid/nuevoCuartoPilar/nuevoCuartoPilar.component';
import { HomeComponent } from "./home/home.component";

import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

const appRoutes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  {
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
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
