import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { PaginationComponent } from './pagination/pagination.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDownloadDialogComponent } from './shared/confirm-download-dialog/confirm-download-dialog.component';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';
import { ConfirmCreationComponent } from './shared/confirm-creation/confirm-creation.component';
import { ConfimLoginErrorComponent } from './shared/confim-login-error/confim-login-error.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule
  ],

  entryComponents: [ConfirmDialogComponent],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, RegisterComponent, ConfirmDialogComponent, ConfirmDownloadDialogComponent, PaginationComponent, ConfirmDeleteComponent, ConfirmCreationComponent, ConfimLoginErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
