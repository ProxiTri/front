// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  @ViewChild('weather') weather: ElementRef<any> | undefined;
  weatherObject = {
    image: <string> '',
    temperature: <string> '',
  };
  constructor(private http: HttpClient) {}
  map: any;
  auth_token = '';
  message: any;


  ngOnInit() {
    this.http.post<any>('https://api-proxitri.alexis-briet.fr/api/login', { username: "alexis.briet2003@gmail.com",
      password: "azerty" }).subscribe(data => {
      this.auth_token = data.token;
    })
    // @ts-ignore
    this.map = L.map('map').setView([46.160329, -1.151139], 14);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    const requestOptions = {headers: headers};

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
    this.http.get('https://api-proxitri.alexis-briet.fr/api/wastes.json', requestOptions).subscribe((data: any) => {
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
        L.marker([ben.localisationLatitude, ben.localisationLongitude],
          {icon: iconPlace})
          .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationStreet + '<br>' + 'Commune : ' + ben.commune.name)
          .addTo(this.map);
      });

    })
    this.weatherAPI();
  }

  toutes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    const requestOptions = {headers: headers};

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
    this.http.get('https://api-proxitri.alexis-briet.fr/api/wastes.json', requestOptions).subscribe((data: any) => {
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
        L.marker([ben.localisationLatitude, ben.localisationLongitude],
          {icon: iconPlace})
          .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationStreet + '<br>' + 'Commune : ' + ben.commune.name)
          .addTo(this.map);
      });
    });
  }

  plastic() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    const requestOptions = {headers: headers};

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

    this.http.get('https://api-proxitri.alexis-briet.fr/api/wastes.json', requestOptions).subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'CS') {
          L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationStreet + '<br>' + 'Commune : ' + ben.commune.name)
            .addTo(this.map);
        }
        });
    })
  }

  verre() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    const requestOptions = {headers: headers};

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
    this.http.get('https://api-proxitri.alexis-briet.fr/api/wastes.json', requestOptions).subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'VERRE') {
          L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationStreet + '<br>' + 'Commune : ' + ben.commune.name)
            .addTo(this.map);
        }
      });
    })
  }

  paper() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    const requestOptions = {headers: headers};

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
    this.http.get('https://api-proxitri.alexis-briet.fr/api/wastes.json', requestOptions).subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'PAPIER') {
          L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationStreet + '<br>' + 'Commune : ' + ben.commune.name)
            .addTo(this.map);
        }
      });
    })
  }

  menage() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    const requestOptions = {headers: headers};

    this.map.clearAllEventListeners;
    this.map.remove();
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({iconUrl: 'http://localhost:4200/assets/img/waste.png', iconSize: [20, 26]});
    this.http.get('https://api-proxitri.alexis-briet.fr/api/wastes.json', requestOptions).subscribe((data: any) => {
      // @ts-ignore
      data.forEach(ben => {
        if (ben.wasteType.customerDesignation == 'OM') {
          L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup("Type : " + ben.wasteType.customerDesignation + '<br>' + 'Adresse : ' + ben.localisationStreet + '<br>' + 'Commune : ' + ben.commune.name)
            .addTo(this.map);
        }
      });
    })
  }

  locate() {
    navigator.geolocation.getCurrentPosition((position:any) => {
      this.map.flyTo([position.coords.latitude, position.coords.longitude])
      let iconPlace = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      });
      L.marker([position.coords.latitude, position.coords.longitude],
        {icon: iconPlace})
        .addTo(this.map);
    },(error:any) => {
      alert(error.message)
    });
  }

  locate2(){
    navigator.geolocation.getCurrentPosition((position:any) => {
      console.log(position.coords)
    });
  }

  route(depart:any, arrivee:any) {
    // @ts-ignore
    L.Routing.control({
      // @ts-ignore
      router: L.Routing.osrmv1({
        serviceUrl: 'http://router.project-osrm.org/route/v1/'
      }),
      showAlternatives: true,
      lineOptions: {styles: [{color: '#242c81', weight: 7}]},
      fitSelectedRoutes: false,
      altLineOptions: {styles: [{color: '#ed6852', weight: 7}]},
      show: false,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(depart),
        L.latLng(arrivee)
      ]
    }).addTo(this.map);
  }

  receiveMessage(event: any) {
    this.message = event
    console.log(this.message)
  }

  weatherAPI() {
    // this.http.get("http://api.airvisual.com/v2/nearest_city?lat=46.160329&lon=-1.151139&key=064cd68e-2525-4ae9-8b58-511ca42c2029").subscribe((res: any) => {
    //   console.log(res.data.current.weather);
    //   // @ts-ignore
    //   this.weather?.nativeElement.children[1].innerText = res.data.current.weather.tp + "°C";
    //   // @ts-ignore
    //   this.weather?.nativeElement.children[0].src = res.data.current.weather.ic;
    // })


    this.weatherObject = {
      image: "https://www.airvisual.com/images/01n.png",
      temperature: "20°C"
    }
  }


}




