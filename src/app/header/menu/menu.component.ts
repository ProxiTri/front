import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  mobile: boolean = false;
  @ViewChild('menu') menu: ElementRef | undefined;
  @ViewChild('menuButton') menuButton: ElementRef | undefined;
  constructor() {
    window.onresize = (e) =>
    {
      this.mobileMenu();
    };
  }

  ngOnInit(): void {
    this.mobileMenu();
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

