import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Browser} from "leaflet";
import win = Browser.win;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedCheck()
  }

  isLoggedCheck() {
    if(sessionStorage.getItem('id')) {
      this.isLogged = true;
      sessionStorage.clear();
      localStorage.clear()
      this.router.navigate(["/", "login"]);
      window.location.reload();
      return;
    } else {
      this.isLogged = false;
      this.router.navigate(["/", "login"]);
      return;
    }
  }
}
