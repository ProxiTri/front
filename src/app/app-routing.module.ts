import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {MapComponent} from "./map/map.component";
import {MenuComponent} from "./header/menu/menu.component";
import {LogoComponent} from "./header/menu/logo/logo.component";
import {NavigationComponent} from "./header/menu/navigation/navigation.component";
import {ArticlesComponent} from "./homepage/articles/articles.component";
import {SliderComponent} from "./homepage/slider/slider.component";
import {PollutionComponent} from "./pollution/pollution.component";
import {GainsComponent} from "./gains/gains.component";
import {QrCodeComponent} from "./qr-code/qr-code.component";
import {AccountComponent} from "./account/account.component";
import {ActuComponent} from "./account/actu/actu.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  // HOME
  {
    path: '',
    component: HomepageComponent
  },

  // LOGIN
  {
    path: 'login',
    component: LoginComponent
  },

  //REGISTER
  {
    path: 'register',
    component: RegisterComponent
  },

  //POLUTION
  {
    path: 'pollution',
    component: PollutionComponent
  },
  // MAP
  {
    path: 'map',
    component: MapComponent
  },
  //GAINS
  {
    path: 'gains',
    component: GainsComponent
  },
  //QR CODE
  {
    path: 'qr-code',
    component: QrCodeComponent
  },
  //ACCOUNT
  {
    path: "account",
    component: AccountComponent
  },
  //ACTU
  {
    path: "actu",
    component: ActuComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
