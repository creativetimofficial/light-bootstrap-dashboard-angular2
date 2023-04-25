import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { UsuariosComponent } from '../../usuarios/usuariosCrear/usuarios.component';
import { UsuariosGridComponent } from '../../usuarios/usuariosGrid.component';
import { PrimerPilarGridComponent } from '../../pilares/primerPilarGrid/primerPilarGrid.component';
import { SegundoPilarGridComponent } from '../../pilares/segundoPilarGrid/segundoPilarGrid.component';
import { TercerPilarGridComponent } from '../../pilares/tercerPilarGrid/tercerPilarGrid.component';
import { CuartoPilarGridComponent } from '../../pilares/cuartoPilarGrid/cuartoPilarGrid.component';
import { MatrimoniosGridComponent } from '../../formacion/matrimoniosGrid/matrimoniosGrid.component';
import { SacerdotesGridComponent } from '../../formacion/sacerdotesGrid/sacerdotesGrid.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { RegisterComponent } from '../../register/register.component';
import { FormationComponent } from '../../formation/formation.component';
import { NuevoPrimerPilarComponent } from '../../pilares/primerPilarGrid/nuevoPrimerPilar/nuevoPrimerPilar.component';
import { NuevoSegundoPilarComponent } from '../../pilares/segundoPilarGrid/nuevoSegundoPilar/nuevoSegundoPilar.component';
import { NuevoTercerPilarComponent } from '../../pilares/tercerPilarGrid/nuevoTercerPilar/nuevoTercerPilar.component';
import { NuevoCuartoPilarComponent } from '../../pilares/cuartoPilarGrid/nuevoCuartoPilar/nuevoCuartoPilar.component';
import { AuthGuard } from '../../auth.guard';
import { EditarPrimerPilarComponent } from 'app/pilares/primerPilarGrid/editarPrimerPilar/editarPrimerPilar.component';
import { EditarSegundoPilarComponent } from 'app/pilares/segundoPilarGrid/editarSegundoPilar/editarSegundoPilar.component';
import { EditarTercerPilarComponent } from 'app/pilares/tercerPilarGrid/editarTercerPilar/editarTercerPilar.component';
import { EditarCuartoPilarComponent } from 'app/pilares/cuartoPilarGrid/editarCuartoPilar/editarCuartoPilar.component';

import { NuevoSacerdoteComponent } from 'app/formacion/sacerdotesGrid/nuevoSacerdote/nuevoSacerdote.component';
import { EditarSacerdoteComponent } from 'app/formacion/sacerdotesGrid/editarSacerdote/editarSacerdote.component';
import { NuevoMatrimonioComponent } from 'app/formacion/matrimoniosGrid/nuevoMatrimonio/nuevoMatrimonio.component';
import { EditarMatrimonioComponent } from 'app/formacion/matrimoniosGrid/editarMatrimonio/editarMatrimonio.component';
import { UsuariosEditarComponent } from 'app/usuarios/usuariosEditar/usuariosEditar.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'usuariosGrid',component: UsuariosGridComponent, canActivate: [AuthGuard]  },
    { path: 'usuarios',component: UsuariosComponent, canActivate: [AuthGuard]  },
    { path: 'usuariosEditar/:id',component: UsuariosEditarComponent },
    { path: 'primerPilarGrid',component: PrimerPilarGridComponent, canActivate: [AuthGuard] },
    { path: 'segundoPilarGrid',component: SegundoPilarGridComponent, canActivate: [AuthGuard]  },
    { path: 'tercerPilarGrid',component: TercerPilarGridComponent, canActivate: [AuthGuard]  },
    { path: 'cuartoPilarGrid',component: CuartoPilarGridComponent, canActivate: [AuthGuard] },
    { path: 'matrimoniosGrid',component: MatrimoniosGridComponent, canActivate: [AuthGuard] },
    { path: 'sacerdotesGrid',component: SacerdotesGridComponent, canActivate: [AuthGuard]  },
    { path: 'icons',component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps',component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'notifications',component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'register',component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'formation',component: FormationComponent },
    { path: 'nuevoPrimerPilar',component: NuevoPrimerPilarComponent , canActivate: [AuthGuard]},
    { path: 'nuevoSegundoPilar',component: NuevoSegundoPilarComponent , canActivate: [AuthGuard]},
    { path: 'nuevoTercerPilar',component: NuevoTercerPilarComponent , canActivate: [AuthGuard]},
    { path: 'nuevoCuartoPilar',component: NuevoCuartoPilarComponent, canActivate: [AuthGuard] },
    { path: 'editarPrimerPilar/:id', component: EditarPrimerPilarComponent, canActivate: [AuthGuard] },
    { path: 'editarSegundoPilar/:id', component: EditarSegundoPilarComponent , canActivate: [AuthGuard]},
    { path: 'editarTercerPilar/:id', component: EditarTercerPilarComponent, canActivate: [AuthGuard]  },
    { path: 'editarCuartoPilar/:id', component: EditarCuartoPilarComponent, canActivate: [AuthGuard]  },
    { path: 'nuevoMatrimonio',component: NuevoMatrimonioComponent, canActivate: [AuthGuard] },
    { path: 'editarMatrimonio/:id',component: EditarMatrimonioComponent, canActivate: [AuthGuard] },
    { path: 'nuevoSacerdote',component: NuevoSacerdoteComponent, canActivate: [AuthGuard] },
    { path: 'editarSacerdote/:id',component: EditarSacerdoteComponent, canActivate: [AuthGuard] },

];
