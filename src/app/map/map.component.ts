// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import  'leaflet.markercluster';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../utils/auth.service";
import {WasteService} from "../../utils/waste.service";
import { range, filter, map } from 'rxjs';
import {ExternalService} from "../../utils/external.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  constructor(private router: ActivatedRoute, private authS: AuthService, private wasteS: WasteService, private externalS: ExternalService) {
  }

  /////////////////////// VARIABLES ///////////////////////////
  @ViewChild('weather') weather: ElementRef<any> | undefined;
  weatherObject = {
    city: <string> '',
    region: <string> '',
    country: <string> '',
    image: <string> '',
    temperature: <string> '',
  };
  pollutionObject = {
    aqius: <string> '',
    mainus: <string> ''
  }
  indice: any;
  infoAqius: string = '';
  // TOKEN API
  auth_token = '';
  // SET MAP
  map: any;
  //AFFICHER LA PERSONNE SUR LA MAP
  position: any; // GPS
  adresse: any; // LABEL

  // PROPOSITION DE DEPART
  propositionsDepart: any;
  // DEPART FINAL
  departCoordonate: any;
  // LE NOM DU DEPART
  departLabel: any;

  // URL DES ICONES
  iconUrl:any
  category:any

  // PROPOSITIONS D'ARRIVEE
  propositions: any;
  // ARRIVEE FINAL
  arrivee: any;
  // LE NOM DE L'ARRIVEE
  arriveeLabel: any;

  // Params URL
  lat: any;
  long: any;

/////////////////////////// FIN DES VARIABLES ///////////////////////


  // CHARGEMENT DE LA CARTE AVEC TOUS LES POINTS
  
  ngOnInit() {
  
    
    // GEOLOACTION DE LA PERSONNE
    navigator.geolocation.getCurrentPosition((position: any) => {
      this.departCoordonate = [position.coords.latitude, position.coords.longitude];
    });

    this.map = L.map('map').setView([46.160329, -1.151139], 14);
          this.router.queryParams.subscribe(params => {
            if(params['search']){
              if (params['search'] == "VERRE") {
                this.category = params['search']
                this.iconUrl = 'http://localhost:4200/assets/img/icons8-broken-bottle-96.png';
                this.filterWaste(this.iconUrl, this.category)
              } else {
                // console.log("produit en verre non recconu")
              }
        
              if (params['search'] == "PLASTIQUE") {
                this.category = params['search'];
                this.iconUrl = 'http://localhost:4200/assets/img/icons8-plastic-bottle-96.png';
                this.category="CS";
                this.filterWaste(this.iconUrl, this.category)
              } else {
                // console.log("produit en plastique non recconu")
              }
        
              if (params['search'] == "PAPIER") {
                this.category = params['search']
                this.iconUrl = 'http://localhost:4200/assets/img/icons8-paper-waste-96.png';
                this.filterWaste(this.iconUrl, this.category)
              } else {
                // console.log("produit en papier non recconu")
              }
        
              if (params['search'] == "ORDURES MENAGERES") {
                this.category = params['search']
                this.iconUrl = 'http://localhost:4200/assets/img/waste.png';
                this.category="OM";
                this.filterWaste(this.iconUrl, this.category)
              } else {
                // console.log("ordures ménagères non recconues")
              }
            }else{
              this.authS.getAccessToken()
      .then((data_token: any) => {
        const markers = L.markerClusterGroup();
        // SET DE LA CARTE AVEC UNE VUE PAR DEFAUT
        // @ts-ignore
        this.wasteS.getWastes(data_token.token).subscribe((data: any) => {
          this.checkAnyWaste(data, markers);
        });
        // SI QUERY POSSEDE DES PARAMETRES LAT & LONG, ON REDIRIGE VERS CETTE POSITION
        this.router.queryParams.subscribe(params => {
          if (params['lat'] && params['long']) {
            this.lat = params['lat'];
            this.long = params['long'];
            this.locateWithCoords(this.lat, this.long);
          }
        });
        // RETIRE TOUS LES ANCIENS EVENEMENTS
        this.map.clearAllEventListeners;
        this.map.remove();
        this.map = L.map('map').setView([46.160329, -1.151139], 14);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Map'
        }).addTo(this.map);
      })
            }
          })
      


    this.weatherPollutionAPI(46.160329, -1.151139);
  }


  checkAnyWaste(data: any, markers: any, iconPlace?: any) {
    data.forEach((ben: { wasteType: { customerDesignation: string; }; localisationStreet: string; commune: { name: string; }; localisationLatitude: number; localisationLongitude: number; }) => {
      switch (ben.wasteType.customerDesignation) {
        case "VERRE":
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-broken-bottle-96.png',
            iconSize: [25, 41]
          });
          break;
        case "PAPIER":
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-paper-waste-96.png',
            iconSize: [31, 31]
          });
          break;
        case "OM":
          iconPlace = L.icon({iconUrl: 'http://localhost:4200/assets/img/waste.png', iconSize: [20, 26]});
          break;
        case "CS":
          iconPlace = L.icon({
            iconUrl: 'http://localhost:4200/assets/img/icons8-plastic-bottle-96.png',
            iconSize: [35, 41]
          });
          break;
        default:
          iconPlace = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
            iconSize: [25, 41]
          });
          break;
      }
      let pop = document.createElement('div');

      let text = document.createElement('p');
      text.className = 'popText';
      text.append(document.createTextNode('Type : ' + ben.wasteType.customerDesignation));
      text.append(document.createElement('br'));
      text.append(document.createTextNode('Adresse : ' + ben.localisationStreet));
      text.append(document.createElement('br'));
      text.append(document.createTextNode('Commune : ' + ben.commune.name));
      text.append(document.createElement('br'));
      pop.append(text);

      let btnGo = document.createElement('button');
      btnGo.className = 'goToBtn';
      btnGo.style.padding = '.5rem';
      btnGo.style.border = 'none';
      btnGo.style.cursor = 'pointer';
      btnGo.style.backgroundColor = '#026AAF';
      btnGo.style.color = 'white';
      btnGo.style.borderRadius = '.8rem';

      btnGo.append(document.createTextNode('Accéder à cette poubelle'));
      btnGo.onclick = async () => {
        this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
        this.route();
      };
      pop.append(btnGo);

      markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
        {icon: iconPlace})
        .bindPopup(pop).on('click', () => {
          this.weatherPollutionAPI(ben.localisationLatitude, ben.localisationLongitude);
        }))
    });
    this.map.addLayer(markers);
  }

  // FILTRE TOUTES LES POUBELLES
  getWastes() {
    const markers = L.markerClusterGroup();

    // RETIRE TOUS LES ANCIENS EVENEMENTS
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
    // RECUPERATION DES POUBELLES DE L'API
    this.authS.getAccessToken()
      .then((data_token: any) => {
        this.wasteS.getWastes(data_token.token).subscribe((data: any) => {
          this.checkAnyWaste(data, markers);
        });
      })
  };

  // FILTRE LES POUBELLES DYNAMIQUEMENT


  filterWaste(iconUrl: string, wasteType: string) {
    const markers = L.markerClusterGroup();

    this.map.clearAllEventListeners;
    this.map.remove();
    this.map = L.map('map').setView([46.160329, -1.151139], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    let iconPlace = L.icon({
      iconUrl: iconUrl,
      iconSize: [35, 41]
    });

    this.authS.getAccessToken()
      .then((data_token: any) => {
        this.wasteS.getWastes(data_token.token).subscribe((data: any) => {
          data.forEach((ben: { wasteType: { customerDesignation: string; }; localisationStreet: string; commune: { name: string; }; localisationLatitude: number; localisationLongitude: number; }) => {
            if (ben.wasteType.customerDesignation == wasteType) {
              let pop = document.createElement('div');

              let text = document.createElement('p');
              text.className = 'popText';
              text.append(document.createTextNode('Type : ' + ben.wasteType.customerDesignation));
              text.append(document.createElement('br'));
              text.append(document.createTextNode('Adresse : ' + ben.localisationStreet));
              text.append(document.createElement('br'));
              text.append(document.createTextNode('Commune : ' + ben.commune.name));
              text.append(document.createElement('br'));
              pop.append(text);

              let btnGo = document.createElement('button');
              btnGo.className = 'goToBtn';
              btnGo.style.padding = '.5rem';
              btnGo.style.border = 'none';
              btnGo.style.cursor = 'pointer';
              btnGo.style.backgroundColor = '#026AAF';
              btnGo.style.color = 'white';
              btnGo.style.borderRadius = '.8rem';

              btnGo.append(document.createTextNode('Accéder à cette poubelle'));
              btnGo.onclick = async () => {
                this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
                this.route();
              };
              pop.append(btnGo);

              markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
                {icon: iconPlace})
                .bindPopup(pop))
            }
            this.map.addLayer(markers);
                console.log("okkk")

          });
        });
      })
  }

  changePosWeatherCard() {
    document.getElementById('weather')?.classList.add('reduce-card');
  }

  // AFFICHER LA POSITION DE LA PERSONNE SUR LA CARTE & DEPART DE LA PERSONNE SI RIEN DE REMPLI
  locate() {
    navigator.geolocation.getCurrentPosition((position: any) => {
      this.position = 'lat :' + position.coords.latitude + 'long :' + position.coords.longitude;
      this.map.flyTo([position.coords.latitude, position.coords.longitude])
      let iconPlace = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      });
      L.marker([position.coords.latitude, position.coords.longitude],
        {icon: iconPlace})
        .addTo(this.map);
      this.position = 'lat :' + position.coords.latitude + 'long :' + position.coords.longitude;
      this.departCoordonate = [position.coords.latitude, position.coords.longitude];
      this.externalS.getAdressFromGeoPoint(position.coords.latitude, position.coords.longitude).subscribe((data: any) => {
        this.departLabel = data.features[0].properties.label;
      })
      this.weatherPollutionAPI(position.coords.latitude, position.coords.longitude);

    }, (error: any) => {
      alert(error.message)
    });
  }

  locateWithCoords(lat: number, long: number) {
    this.map.flyTo([lat, long])
    let iconPlace = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
    });
    L.marker([lat, long],
      {icon: iconPlace})
      .addTo(this.map);
    this.externalS.getAdressFromGeoPoint(lat, long).subscribe((data: any) => {
      this.departLabel = data.features[0].properties.label;
    })
    this.weatherPollutionAPI(lat, long);
  }

  departProp() {
      this.externalS.searchAdress(this.departLabel).subscribe((data: any) => {
      this.propositionsDepart = data.features;
      this.departCoordonate = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    })
  }

  // DEPART PAR LA RECHERCHE
  depart2(label: any) {
    this.externalS.searchAdress(label).subscribe((data: any) => {
      this.propositionsDepart = [];
      this.departLabel = label;
      this.departCoordonate = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    });
  }

  // AFFICHAGE DES SUGGESTIONS D'ARRIVEE SELON CE QUE LA PERSONNE RECHERCHE
  arriveProp() {
    this.externalS.searchAdress(this.arriveeLabel).subscribe((data: any) => {
      this.propositions = data.features;
      this.arrivee = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    });
  }

  // ARRIVEE PAR LA RECHERCHER
  arrive(label: any) {
    this.externalS.searchAdress(label).subscribe((data: any) => {
      this.propositions = [];
      this.arriveeLabel = label;
      this.arrivee = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    });
  }

  // ARRIVEE SI LA PERSONNE CLIQUE SUR UNE POUBELLE
  arrive2(pos: any) {
    this.arrivee = pos;
  }

  // CALCUL DU CHEMIN
  route() {
    // @ts-ignore
    L.Routing.control({
      // @ts-ignore
      showAlternatives: true,
      lineOptions: {styles: [{color: '#242c81', weight: 5}]},
      fitSelectedRoutes: false,
      altLineOptions: {styles: [{color: '#ed6852', weight: 5}]},
      show: true,
      language: 'fr',
      routeWhileDragging: true,
      icon: L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        iconSize: [25, 41],
      }),

      waypoints: [
        L.latLng(this.departCoordonate),
        L.latLng(this.arrivee)
      ]
    }).addTo(this.map);
    this.changePosWeatherCard()
  }

  weatherPollutionAPI(lat: any, long: any) {
    this.externalS.getWeatherFromGeoPoint(lat, long).subscribe((res: any) => {
      this.weatherPollutionActions(res);
    })
  }

  weatherPollutionActions(res: any) {
    this.weatherObject = {
      image: `https://www.airvisual.com/images/${res.data.current.weather.ic}.png`,
      temperature: `${res.data.current.weather.tp}°C`,
      city: res.data.city,
      region: res.data.state,
      country: res.data.country,
    }

    this.pollutionObject = {
      aqius: res.data.current.pollution.aqius,
      mainus: res.data.current.pollution.mainus
    }
    this.indice = res.data.current.pollution.aqius;
    this.infoAqiusCheck();
  }

  clickIndice() {
    // @ts-ignore
    document.querySelector('#explain-indice').classList.toggle('show');
  }

  infoAqiusCheck() {
    if (this.indice <= 50) {
      this.infoAqius = "Bon";
    } else if (this.indice <= 100) {
      this.infoAqius = "Moyen";
    } else if (this.indice <= 150) {
      this.infoAqius = "Mauvais pour les groupes sensibles";
    } else if (this.indice <= 200) {
      this.infoAqius = "Mauvais";
    } else if (this.indice <= 300) {
      this.infoAqius = "Très mauvais";
    } else {
      this.infoAqius = "Hors norme";
    }
  }

  appear() {
    // @ts-ignore
    document.querySelector('#weather').classList.toggle('show');
  }
}


