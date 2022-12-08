import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  mobile: boolean = false;
  isAdmin: boolean = false;
  isLogged: boolean = false;
  @ViewChild('menu') menu: ElementRef | undefined;
  @ViewChild('menuButton') menuButton: ElementRef | undefined;

  constructor() {
    window.onresize = (e) => {
      this.mobileMenu();
    };
  }

  ngOnInit(): void {
    this.mobileMenu();
    this.isAdminCheck();
  }

  ngAfterViewChecked() {
    this.isAdminCheck();
  }

  isAdminCheck() {
    sessionStorage.getItem('roles')?.split(',').forEach((value) => {
      if (value === 'ROLE_ADMIN') {
        this.isAdmin = true;
        this.isLogged = true;
        return;
      } else if (value === 'ROLE_USER') {
        this.isAdmin = false;
        this.isLogged = true;
        return;
      } else {
        this.isAdmin = false;
        this.isLogged = false;
        return;
      }
    })
  }

  mobileMenu() {
    if (window.innerWidth <= 900) {
      this.mobile = true;
      this.menu?.nativeElement.classList.add('mobile');
    } else {
      this.mobile = false;
      this.menu?.nativeElement.classList.remove('mobile');
    }
  }

  mobileMenuToggle(e: MouseEvent) {
    e.preventDefault();
    this.menuButton?.nativeElement.classList.toggle('fa-close');
    this.menu?.nativeElement.classList.toggle('mobile');
  }

}

