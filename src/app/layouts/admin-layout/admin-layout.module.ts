import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../../home/home.component';
import { UsuariosGridComponent } from '../../usuarios/usuariosGrid.component';
import { PrimerPilarGridComponent } from '../../pilares/primerPilarGrid/primerPilarGrid.component';
import { SegundoPilarGridComponent } from '../../pilares/segundoPilarGrid/segundoPilarGrid.component';
import { TercerPilarGridComponent } from '../../pilares/tercerPilarGrid/tercerPilarGrid.component';
import { CuartoPilarGridComponent } from '../../pilares/cuartoPilarGrid/cuartoPilarGrid.component';
import { MatrimoniosGridComponent } from '../../formacion/matrimoniosGrid/matrimoniosGrid.component';
import { SacerdotesGridComponent } from '../../formacion/sacerdotesGrid/sacerdotesGrid.component';
import { FormationComponent } from '../../formation/formation.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { NuevoPrimerPilarComponent } from '../../pilares/primerPilarGrid/nuevoPrimerPilar/nuevoPrimerPilar.component';
import { NuevoSegundoPilarComponent } from '../../pilares/segundoPilarGrid/nuevoSegundoPilar/nuevoSegundoPilar.component';
import { NuevoTercerPilarComponent } from '../../pilares/tercerPilarGrid/nuevoTercerPilar/nuevoTercerPilar.component';
import { NuevoCuartoPilarComponent } from '../../pilares/cuartoPilarGrid/nuevoCuartoPilar/nuevoCuartoPilar.component';
import { EditarPrimerPilarComponent } from 'app/pilares/primerPilarGrid/editarPrimerPilar/editarPrimerPilar.component';
import { EditarSegundoPilarComponent } from 'app/pilares/segundoPilarGrid/editarSegundoPilar/editarSegundoPilar.component';
import { EditarTercerPilarComponent } from 'app/pilares/tercerPilarGrid/editarTercerPilar/editarTercerPilar.component';
import { EditarCuartoPilarComponent } from 'app/pilares/cuartoPilarGrid/editarCuartoPilar/editarCuartoPilar.component';
import { NuevoSacerdoteComponent } from 'app/formacion/sacerdotesGrid/nuevoSacerdote/nuevoSacerdote.component';
import { EditarSacerdoteComponent } from 'app/formacion/sacerdotesGrid/editarSacerdote/editarSacerdote.component';
import { NuevoMatrimonioComponent } from 'app/formacion/matrimoniosGrid/nuevoMatrimonio/nuevoMatrimonio.component';
import { EditarMatrimonioComponent } from 'app/formacion/matrimoniosGrid/editarMatrimonio/editarMatrimonio.component';
import { UsuariosComponent } from 'app/usuarios/usuariosCrear/usuarios.component';
import { UsuariosEditarComponent } from 'app/usuarios/usuariosEditar/usuariosEditar.component';
import { PerfilComponent } from 'app/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    UsuariosGridComponent,
    UsuariosComponent,
    PrimerPilarGridComponent,
    SegundoPilarGridComponent,
    TercerPilarGridComponent,
    CuartoPilarGridComponent,
    MatrimoniosGridComponent,
    SacerdotesGridComponent,
    FormationComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,    
    NuevoPrimerPilarComponent,
    NotificationsComponent,
    NuevoPrimerPilarComponent,
    NuevoSegundoPilarComponent,
    NuevoTercerPilarComponent,
    NuevoCuartoPilarComponent,
    EditarPrimerPilarComponent,
    EditarSegundoPilarComponent,
    EditarTercerPilarComponent,
    EditarCuartoPilarComponent,
    NuevoSacerdoteComponent,
    EditarSacerdoteComponent,
    NuevoMatrimonioComponent,
    EditarMatrimonioComponent,
    UsuariosEditarComponent,
    PerfilComponent
  ]
})

export class AdminLayoutModule {}
