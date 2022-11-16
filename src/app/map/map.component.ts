// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  /////////////////////// VARIABLES ///////////////////////////
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


  // PROPOSITIONS D'ARRIVEE
  propositions: any;
  // ARRIVEE FINAL
  arrivee: any;
  // LE NOM DE L'ARRIVEE
  arriveeLabel: any;

/////////////////////////// FIN DES VARIABLES ///////////////////////


  // CHARGEMENT DE LA CARTE AVEC TOUS LES POINTS
  ngOnInit() {
    // GEOLOACTION DE LA PERSONNE
    navigator.geolocation.getCurrentPosition((position: any) => {
      this.departCoordonate = [position.coords.latitude, position.coords.longitude];
    });

    // CONNEXION A L'API AVEC LE COMPTE ADMIN POUR AVOIR LE TOKEN
    new Promise((resolve, reject) => {
      this.http.post<any>('https://api-proxitri.alexis-briet.fr/api/login', {
        username: "alexis.briet2003@gmail.com",
        password: "azerty"
      }).subscribe(data => {
        this.auth_token = data.token;
        resolve(data);
      })
    }).then(() => {
      const markers = L.markerClusterGroup();
      // SET DE LA CARTE AVEC UNE VUE PAR DEFAUT
      // @ts-ignore
      this.map = L.map('map').setView([46.160329, -1.151139], 14);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      });
      const requestOptions = {headers: headers};
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

          btnGo.append(document.createTextNode('Go à cette poubelle'));
          btnGo.onclick = async () => {
            this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
            this.route();
          };
          pop.append(btnGo);

          markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup(pop))
        });
        this.map.addLayer(markers);

      })
    });


  }

  // FILTRE TOUTES LES POUBELLES
  toutes() {
    const markers = L.markerClusterGroup();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });

    const requestOptions = {headers: headers};
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

        btnGo.append(document.createTextNode('Go à cette poubelle'));
        btnGo.onclick = async () => {
          this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
          this.route();
        };
        pop.append(btnGo);

        markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
          {icon: iconPlace})
          .bindPopup(pop))
      });
      this.map.addLayer(markers);

    })
  };


  // FILTRE POUBELLES EN PLASTIQUE
  plastic() {
    const markers = L.markerClusterGroup();
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

          btnGo.append(document.createTextNode('Go à cette poubelle'));
          btnGo.onclick = async () => {
            this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
            this.route();
          };
          pop.append(btnGo);

          markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup(pop))
        }
        ;
        this.map.addLayer(markers);

      });
    })
  }

  // FILTRE POUBELLES EN VERRE
  verre() {
    const markers = L.markerClusterGroup();
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

          btnGo.append(document.createTextNode('Go à cette poubelle'));
          btnGo.onclick = async () => {
            this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
            this.route();
          };
          pop.append(btnGo);


          markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup(pop))
        }
        ;
        this.map.addLayer(markers);

      });
    })
  }

  // FILTRE POUBELLES EN PAPIER
  paper() {
    const markers = L.markerClusterGroup();
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

          btnGo.append(document.createTextNode('Go à cette poubelle'));
          btnGo.onclick = async () => {
            this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
            this.route();
          };
          pop.append(btnGo);


          markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup(pop))
        }
        ;
        this.map.addLayer(markers);

      });
    })
  }

  // FILTRE POUBELLES EN ORGANIQUE
  menage() {
    const markers = L.markerClusterGroup();
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

          btnGo.append(document.createTextNode('Go à cette poubelle'));
          btnGo.onclick = async () => {
            this.arrive2([ben.localisationLatitude, ben.localisationLongitude])
            this.route();
          };
          pop.append(btnGo);


          markers.addLayer(L.marker([ben.localisationLatitude, ben.localisationLongitude],
            {icon: iconPlace})
            .bindPopup(pop))
        }
        ;
        this.map.addLayer(markers);

      });
    })
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
      this.http.get('https://api-adresse.data.gouv.fr/reverse/?lon='+position.coords.longitude+'&lat='+position.coords.latitude).subscribe((data: any) => {
        this.departLabel = data.features[0].properties.label;
      });


    }, (error: any) => {
      alert(error.message)
    });
  }

  departProp() {
    this.http.get('http://api-adresse.data.gouv.fr/search?q=' + this.departLabel + '&type=&autocomplete=1').subscribe((data: any) => {
      this.propositionsDepart = data.features;
      this.departCoordonate = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    });
  }

  // DEPART PAR LA RECHERCHE
  depart2(label: any) {
    this.http.get('http://api-adresse.data.gouv.fr/search?q=' + label).subscribe((data: any) => {
      this.propositionsDepart = [];
      this.departLabel = label;
      this.departCoordonate = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    });
  }

  // AFFICHAGE DES SUGGESTIONS D'ARRIVEE SELON CE QUE LA PERSONNE RECHERCHE
  arriveProp() {
    // console.log(this.arrivee)
    this.http.get('http://api-adresse.data.gouv.fr/search?q=' + this.arriveeLabel + '&type=&autocomplete=1').subscribe((data: any) => {
      this.propositions = data.features;
      this.arrivee = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
    });
  }

  // ARRIVEE PAR LA RECHERCHER
  arrive(label: any) {
    this.http.get('http://api-adresse.data.gouv.fr/search?q=' + label).subscribe((data: any) => {
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
  }

}




