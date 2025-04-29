import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { NotAuthorizedComponent } from 'app/not-authorized/not-authorized.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsersListComponent } from 'app/users-list/users-list.component';
import { FormateurListComponent } from 'app/formateur-list/formateur-list.component';
import { FormationListeComponent } from 'app/formation-liste/formation-liste.component';
import { ParticipantListComponent } from 'app/participant-list/participant-list.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { EmployeurListComponent } from 'app/employeur-list/employeur-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent ,canActivate: [AuthGuard] , data: { roles: [1, 2] }},
    { path: 'user',           component: UserComponent  ,canActivate: [AuthGuard]},

    { path: 'user-list',           component: UsersListComponent  ,canActivate: [AuthGuard],    data: { roles: [1] } },
    { path: 'participant-list',           component: ParticipantListComponent  ,canActivate: [AuthGuard], data: { roles: [1, 2, 3]}},
    { path: 'table',          component: TablesComponent  ,canActivate: [AuthGuard]},
    { path: 'typography',     component: TypographyComponent  ,canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent  ,canActivate: [AuthGuard]},
    { path: 'maps',           component: MapsComponent  ,canActivate: [AuthGuard]},
    { path: 'notifications',  component: NotificationsComponent  ,canActivate: [AuthGuard]},
    { path: 'upgrade',        component: UpgradeComponent  ,canActivate: [AuthGuard]},
    {path: 'formateur-list', component:FormateurListComponent ,canActivate: [AuthGuard], data: { roles: [1, 2, 3]}},
    {path: 'formation-liste', component:FormationListeComponent ,canActivate: [AuthGuard], data: { roles: [1, 2, 3]}},
    { path: 'participant-list',           component: ParticipantListComponent  ,canActivate: [AuthGuard], data: { roles: [1, 2, 3]}},
    { path: 'employeur-list',           component: EmployeurListComponent  ,canActivate: [AuthGuard], data: { roles: [1, 2, 3]}},
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent
      }
];
