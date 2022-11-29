import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../utils/auth.service";
import {CommuneService} from "../../utils/commune.service";
import {RecyclingService} from "../../utils/recycling.service";

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.scss']
})
export class CommuneComponent implements OnInit {
  communesArr: any = [];
  showDetails: boolean = false;

  constructor(private authS: AuthService, private communeS: CommuneService, private recyclingS: RecyclingService) { }

  ngOnInit(): void {
    this.authS.getAccessToken()
      .then((data: any) => {
        this.getCommunes(data.token);
      })
  }


  async getCommunes(token: string) {
    this.communeS.getCommunes(token).subscribe((data: any) => {
      this.communesArr = data;
      console.log(this.communesArr);
    });
  }

  async getRecyling(token: string, id: number) {
    this.recyclingS.getRecycling(token, id).subscribe((data: any) => {
      return data;
    })
  }

  showDetailsCommune() {
    if (this.showDetails) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
  }

}
