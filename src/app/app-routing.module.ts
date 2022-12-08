import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {MapComponent} from "./map/map.component";
import {PollutionComponent} from "./pollution/pollution.component";
import {QrCodeComponent} from "./qr-code/qr-code.component";
import {AccountComponent} from "./account/account.component";
import {ActuComponent} from "./account/actu/actu.component";
import {RegisterComponent} from "./register/register.component";
import {ContactComponent} from "./contact/contact.component";

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
  //QR CODE
  {
    path: 'scan',
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
  },

  //CONTACT
  {
    path: "contact",
    component: ContactComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
