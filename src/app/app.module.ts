import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './header/menu/menu.component';
import { LogoComponent } from './header/menu/logo/logo.component';
import { NavigationComponent } from './header/menu/navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SliderComponent } from './homepage/slider/slider.component';
import { GainsComponent } from './homepage/gains/gains.component';
import { ArticlesComponent } from './homepage/articles/articles.component';
import { ActuComponent } from './account/actu/actu.component';
import { AstucesComponent } from './account/astuces/astuces.component';
import { ChatComponent } from './account/chat/chat.component';
import { CardComponent } from './account/card/card.component';
import { MapComponent } from './map/map.component';
import { PollutionComponent } from './pollution/pollution.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

import { LoginComponent } from './login/login.component';
import { InfosComponent } from './pollution/infos/infos.component';
import { FooterComponent } from './footer/footer.component';
import { DemoDirective } from './demo.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxBarcodeModule } from 'ngx-barcode';
import {BarcodeScannerLivestreamModule} from "ngx-barcode-scanner";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LogoComponent,
    NavigationComponent,
    HeaderComponent,
    AccountComponent,
    HomepageComponent,
    SliderComponent,
    GainsComponent,
    ArticlesComponent,
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BarcodeScannerLivestreamModule,
    NgxBarcodeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
