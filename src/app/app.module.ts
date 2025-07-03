import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


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
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { UsersListsComponent } from './users-lists/users-lists.component';
import { BlogslistComponent } from './blogslist/blogslist.component';
import { FormblogComponent } from './formblog/formblog.component';
import { ProductsComponent } from './products/products.component';
import { Carousel2Component } from './carousel2/carousel2.component';
import { CarteProduitComponent } from './carte-produit/carte-produit.component';
import { CarteProduitNodevisComponent } from './carte-produit-nodevis/carte-produit-nodevis.component';
import { PetitCadreComponent } from './petit-cadre/petit-cadre.component';
import { TitreproduitComponent } from './titreproduit/titreproduit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormulaireIotItComponent } from './formulaire-iot-it/formulaire-iot-it.component';
import { FormFranchiseComponent } from './form-franchise/form-franchise.component';
import { AppRoutingModule } from './app.routing';
import { ListeFranchisesComponent } from './liste-franchises/liste-franchises.component';
import { FranchiseDetailComponent } from './franchise-detail/franchise-detail.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



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
    ReactiveFormsModule,
     HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    AboutUsComponent,
    ContactUsComponent,
    ChatBotComponent,
    BlogsComponent,
    FormProductsComponent,
    UsersListsComponent,
    BlogslistComponent,
    FormblogComponent,
    ProductsComponent,
    Carousel2Component,
    CarteProduitComponent,
    CarteProduitNodevisComponent,
    PetitCadreComponent,
    TitreproduitComponent,
    NavbarComponent,
    FormulaireIotItComponent,
    FormFranchiseComponent,
    ListeFranchisesComponent,
    FranchiseDetailComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
