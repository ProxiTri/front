// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {


  constructor(private http: HttpClient) {}
  map:any;

  ngOnInit() {
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconSize: [10, 10]
    });

    this.http.get('https://www.agglo-larochelle.fr/dechets-api/-/dechets-data/pav/data.json').subscribe((data: any) => {
      // console.log(data)
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == "VERRE") {
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-broken-bottle-96.png',
            iconSize: [25, 41]
          });
        } else if (ben.wasteType.customerDesignation == "PAPIER") {
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-paper-waste-96.png',
            iconSize: [31, 31]
          });
        } else if (ben.wasteType.customerDesignation == "OM") {
          iconPlace = L.icon({iconUrl: 'http://localhost:4200/assets/img/waste.png', iconSize: [20, 26]});
        } else if (ben.wasteType.customerDesignation == "CS") {
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-plastic-bottle-96.png',
            iconSize: [35, 41]
          });
        } else {
          iconPlace = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
            iconSize: [25, 41]
          });
        }

        L.marker([ben.localisationFo.latitude, ben.localisationFo.longitude],
          {icon: iconPlace})
          .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationFo.name)
          .addTo(this.map);
      });
    })
  }

  plastic() {
    this.map.clearAllEventListeners;
    this.map.remove();
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({
      iconUrl: 'http://localhost:4200/assets/img/icons8-plastic-bottle-96.png',
      iconSize: [35, 41]
    });
    this.http.get('https://www.agglo-larochelle.fr/dechets-api/-/dechets-data/pav/data.json').subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'CS'){
          L.marker([ben.localisationFo.latitude, ben.localisationFo.longitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationFo.name)
            .addTo(this.map);
        }
      });
    })
  }
  verre() {
    this.map.clearAllEventListeners;
    this.map.remove();
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({
      iconUrl: 'http://localhost:4200/assets/img/icons8-broken-bottle-96.png',
      iconSize: [25, 41]
    });
    this.http.get('https://www.agglo-larochelle.fr/dechets-api/-/dechets-data/pav/data.json').subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'VERRE'){
          L.marker([ben.localisationFo.latitude, ben.localisationFo.longitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationFo.name)
            .addTo(this.map);
        }
      });
    })
  }
  paper() {
    this.map.clearAllEventListeners;
    this.map.remove();
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({
      iconUrl: 'http://localhost:4200/assets/img/icons8-paper-waste-96.png',
      iconSize: [31, 31]
    });
    this.http.get('https://www.agglo-larochelle.fr/dechets-api/-/dechets-data/pav/data.json').subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'PAPIER'){
          L.marker([ben.localisationFo.latitude, ben.localisationFo.longitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationFo.name)
            .addTo(this.map);
        }
      });
    })
  }
  menage() {
    this.map.clearAllEventListeners;
    this.map.remove();
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({iconUrl: 'http://localhost:4200/assets/img/waste.png', iconSize: [20, 26]});
    this.http.get('https://www.agglo-larochelle.fr/dechets-api/-/dechets-data/pav/data.json').subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'OM'){
          L.marker([ben.localisationFo.latitude, ben.localisationFo.longitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationFo.name)
            .addTo(this.map);
        }
      });
    })
  }
  toutes() {
    this.map.clearAllEventListeners;
    this.map.remove();


    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconSize: [10, 10]
    });

    this.http.get('https://www.agglo-larochelle.fr/dechets-api/-/dechets-data/pav/data.json').subscribe((data: any) => {
      // console.log(data)
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == "VERRE") {
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-broken-bottle-96.png',
            iconSize: [25, 41]
          });
        } else if (ben.wasteType.customerDesignation == "PAPIER") {
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-paper-waste-96.png',
            iconSize: [31, 31]
          });
        } else if (ben.wasteType.customerDesignation == "OM") {
          iconPlace = L.icon({iconUrl: 'http://localhost:4200/assets/img/waste.png', iconSize: [20, 26]});
        } else if (ben.wasteType.customerDesignation == "CS") {
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-plastic-bottle-96.png',
            iconSize: [35, 41]
          });
        } else {
          iconPlace = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
            iconSize: [25, 41]
          });
        }

        L.marker([ben.localisationFo.latitude, ben.localisationFo.longitude],
          {icon: iconPlace})
          .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationFo.name)
          .addTo(this.map);
      });
    })
  }
}




