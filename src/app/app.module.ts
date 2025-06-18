import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { CarouselHomePageComponent } from './carousel-home-page/carousel-home-page.component';
import { HeaderHomePageComponent } from './header-home-page/header-home-page.component';
import { ClientsCarouselComponent } from './clients-carousel/clients-carousel.component';
import { IOTCarouselComponent } from './iotcarousel/iotcarousel.component';
import { RegisterComponent } from './register/register.component';
import { FooterHomePageComponent } from './footer-home-page/footer-home-page.component';
import { ProductsComponent } from './products/products.component';
import { Carousel2Component } from './carousel2/carousel2.component';
import { CarteProduitComponent } from './carte-produit/carte-produit.component';
import { CarteProduitNodevisComponent } from './carte-produit-nodevis/carte-produit-nodevis.component';
import { PetitCadreComponent } from './petit-cadre/petit-cadre.component';
import { TitreproduitComponent } from './titreproduit/titreproduit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormulaireIotItComponent } from './formulaire-iot-it/formulaire-iot-it.component';
import { FormFranchiseComponent } from './form-franchise/form-franchise.component';

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
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    VitrineComponent,
    CarouselHomePageComponent,
    HeaderHomePageComponent,
    ClientsCarouselComponent,
    IOTCarouselComponent,
    RegisterComponent,
    FooterHomePageComponent,
    ProductsComponent,
    Carousel2Component,
    CarteProduitComponent,
    CarteProduitNodevisComponent,
    PetitCadreComponent,
    TitreproduitComponent,
    NavbarComponent,
    FormulaireIotItComponent,
    FormFranchiseComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
