import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './header/menu/menu.component';
import { LogoComponent } from './header/menu/logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SliderComponent } from './homepage/slider/slider.component';
import { GainsComponent } from './homepage/gains/gains.component';
import { ActuComponent } from './account/actu/actu.component';
import { AstucesComponent } from './account/astuces/astuces.component';
import { ChatComponent } from './account/chat/chat.component';
import { CardComponent } from './account/card/card.component';
import { MapComponent } from './map/map.component';
import { PollutionComponent } from './pollution/pollution.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { InfosComponent } from './pollution/infos/infos.component';
import { FooterComponent } from './footer/footer.component';
import { DemoDirective } from './demo.directive';
import {BarcodeScannerLivestreamModule} from "ngx-barcode-scanner";
import { RegisterComponent } from './register/register.component';
import { CommuneComponent } from './commune/commune.component';
import { ContactComponent } from './contact/contact.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LogoComponent,
    HeaderComponent,
    AccountComponent,
    HomepageComponent,
    SliderComponent,
    GainsComponent,
    ActuComponent,
    AstucesComponent,
    ChatComponent,
    CardComponent,
    MapComponent,
    PollutionComponent,
    LoginComponent,
    InfosComponent,
    FooterComponent,
    DemoDirective,
    QrCodeComponent,
    RegisterComponent,
    CommuneComponent,
    ContactComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BarcodeScannerLivestreamModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [
    UpperCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
