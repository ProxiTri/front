import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {MapComponent} from "./map/map.component";
import {PollutionComponent} from "./pollution/pollution.component";
import {GainsComponent} from "./gains/gains.component";
import {QrCodeComponent} from "./qr-code/qr-code.component";

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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
