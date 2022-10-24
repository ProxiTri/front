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

  // MAP
  {
    path: 'map',
    component: MapComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
