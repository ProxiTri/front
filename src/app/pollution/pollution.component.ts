import { Component, OnInit } from '@angular/core';
import {CommuneService} from "../../utils/commune.service";
import {AuthService} from "../../utils/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pollution',
  templateUrl: './pollution.component.html',
  styleUrls: ['./pollution.component.scss']
})
export class PollutionComponent implements OnInit {
  auth_token = '';
  communesArr: any = [];

  constructor(private authS: AuthService, private communeS: CommuneService) { }

  ngOnInit(): void {
  }
}



