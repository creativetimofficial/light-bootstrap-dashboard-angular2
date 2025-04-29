import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FormateurListComponent } from './formateur-list/formateur-list.component';
import { FormationListeComponent } from './formation-liste/formation-liste.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { SearchPaginationComponent } from './search-pagination/search-pagination.component';
import { EmployeurListComponent } from './employeur-list/employeur-list.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    ReactiveFormsModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UsersListComponent,
    FormateurListComponent,
    FormationListeComponent,
    ParticipantListComponent,
    SearchPaginationComponent,
    EmployeurListComponent,
    NotAuthorizedComponent,
],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
