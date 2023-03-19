import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { PrimerPilarGridComponent } from '../../pilares/primerPilarGrid/primerPilarGrid.component';
import { SegundoPilarGridComponent } from '../../pilares/segundoPilarGrid/segundoPilarGrid.component';
import { TercerPilarGridComponent } from '../../pilares/tercerPilarGrid/tercerPilarGrid.component';
import { CuartoPilarGridComponent } from '../../pilares/cuartoPilarGrid/cuartoPilarGrid.component';
import { MatrimoniosGridComponent } from '../../formacion/matrimoniosGrid/matrimoniosGrid.component';
import { SacerdotesGridComponent } from '../../formacion/sacerdotesGrid/sacerdotesGrid.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RegisterComponent } from '../../register/register.component';
import { FormationComponent } from '../../formation/formation.component';
import { LoginComponent } from '../../login/login.component';
import { NuevoPrimerPilarComponent } from '../../pilares/primerPilarGrid/nuevoPrimerPilar/nuevoPrimerPilar.component';
import { NuevoSegundoPilarComponent } from '../../pilares/segundoPilarGrid/nuevoSegundoPilar/nuevoSegundoPilar.component';
import { NuevoTercerPilarComponent } from '../../pilares/tercerPilarGrid/nuevoTercerPilar/nuevoTercerPilar.component';
import { NuevoCuartoPilarComponent } from '../../pilares/cuartoPilarGrid/nuevoCuartoPilar/nuevoCuartoPilar.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',component: HomeComponent },
    { path: 'user',component: UserComponent },
    { path: 'primerPilarGrid',component: PrimerPilarGridComponent },
    { path: 'segundoPilarGrid',component: SegundoPilarGridComponent },
    { path: 'tercerPilarGrid',component: TercerPilarGridComponent },
    { path: 'cuartoPilarGrid',component: CuartoPilarGridComponent },
    { path: 'matrimoniosGrid',component: MatrimoniosGridComponent },
    { path: 'sacerdotesGrid',component: SacerdotesGridComponent },
    { path: 'icons',component: IconsComponent },
    { path: 'maps',component: MapsComponent },
    { path: 'notifications',component: NotificationsComponent },
    { path: 'upgrade',component: UpgradeComponent },
    { path: 'register',component: RegisterComponent },
    { path: 'formation',component: FormationComponent },
    { path: 'login',component: LoginComponent },
    { path: 'nuevoPrimerPilar',component: NuevoPrimerPilarComponent },
    { path: 'nuevoSegundoPilar',component: NuevoSegundoPilarComponent },
    { path: 'nuevoTercerPilar',component: NuevoTercerPilarComponent },
    { path: 'nuevoCuartoPilar',component: NuevoCuartoPilarComponent },
];
