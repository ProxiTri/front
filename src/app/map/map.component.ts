// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {


  constructor(private http: HttpClient) {
  }

  map: any;

  ngOnInit() {
    this.map = L.map('map').setView([46.160329, -1.151139], 14);
    let auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NjY5NTA1NzcsImV4cCI6MTY2NzAzNjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhcGktcHJveGl0cmkuZnIiLCJpcCI6IjE3Mi4xOC4wLjIiLCJ1c2VySWQiOjN9.mHVznOg-ene0icm2Y4d6Z_4imVF2yURwv6cxnoWFIpuvVGLD0GCRUSPdqVeA6rBfTCl0MYFbLgagmzvwczwnHOSmMovnxEdwvwl_GQFZDayPVjy2bFXXR2AKi5iXmu7IPM70mICD9JvEgD6ooHQqWQyn46x1c907DOvVZWfD0sXzaJc-rwc0C36h-S0r07nQ4XlwVAJEcnnBl8Hl24vgpQg-VBw03yURhCs2fm-wM4LE7xaz5KN-ThIKWxnDe0RoOO_5mYPjHcjciI7P12-1oUfYiiCBDUUxnzpP95TTTFImqkXf3fyzYetA86H8eB9DXw0JrglGJqXYgTydwOCXueDkWtuD8VpYHU0K9JyTXDBZv7zbDxXAKkP25EvPLy7PiOQymA9YGzboWeblBiKzrJsTcPx05hfqdxFRMj9i6oesATc4TYz5FHRzRT3q9IraOSWZbvGmFd4-HnNeW8DEl-rA2g3tyZlaaWGQGwNX82P2OHCIy4NRnw50efBKgWXpejGOTx37b_J0zdSh-PNPw8U6Wm-GF-qZvQYhFXe80UTNqlgG-jlQzYoQntraHzsw-QT86MbtLJerjtwJHlh04V0ARRqFw-eiFGLUXHnyWM2k49K2hVwFOQeMzB_MxDHdSWohw0IvvkyL4iRO1-MUU6vYK0cYQGI4uRMosRPnHMU";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
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

  }


  toutes() {
    let auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NjY5NTA1NzcsImV4cCI6MTY2NzAzNjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhcGktcHJveGl0cmkuZnIiLCJpcCI6IjE3Mi4xOC4wLjIiLCJ1c2VySWQiOjN9.mHVznOg-ene0icm2Y4d6Z_4imVF2yURwv6cxnoWFIpuvVGLD0GCRUSPdqVeA6rBfTCl0MYFbLgagmzvwczwnHOSmMovnxEdwvwl_GQFZDayPVjy2bFXXR2AKi5iXmu7IPM70mICD9JvEgD6ooHQqWQyn46x1c907DOvVZWfD0sXzaJc-rwc0C36h-S0r07nQ4XlwVAJEcnnBl8Hl24vgpQg-VBw03yURhCs2fm-wM4LE7xaz5KN-ThIKWxnDe0RoOO_5mYPjHcjciI7P12-1oUfYiiCBDUUxnzpP95TTTFImqkXf3fyzYetA86H8eB9DXw0JrglGJqXYgTydwOCXueDkWtuD8VpYHU0K9JyTXDBZv7zbDxXAKkP25EvPLy7PiOQymA9YGzboWeblBiKzrJsTcPx05hfqdxFRMj9i6oesATc4TYz5FHRzRT3q9IraOSWZbvGmFd4-HnNeW8DEl-rA2g3tyZlaaWGQGwNX82P2OHCIy4NRnw50efBKgWXpejGOTx37b_J0zdSh-PNPw8U6Wm-GF-qZvQYhFXe80UTNqlgG-jlQzYoQntraHzsw-QT86MbtLJerjtwJHlh04V0ARRqFw-eiFGLUXHnyWM2k49K2hVwFOQeMzB_MxDHdSWohw0IvvkyL4iRO1-MUU6vYK0cYQGI4uRMosRPnHMU";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
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
    let auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NjY5NTA1NzcsImV4cCI6MTY2NzAzNjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhcGktcHJveGl0cmkuZnIiLCJpcCI6IjE3Mi4xOC4wLjIiLCJ1c2VySWQiOjN9.mHVznOg-ene0icm2Y4d6Z_4imVF2yURwv6cxnoWFIpuvVGLD0GCRUSPdqVeA6rBfTCl0MYFbLgagmzvwczwnHOSmMovnxEdwvwl_GQFZDayPVjy2bFXXR2AKi5iXmu7IPM70mICD9JvEgD6ooHQqWQyn46x1c907DOvVZWfD0sXzaJc-rwc0C36h-S0r07nQ4XlwVAJEcnnBl8Hl24vgpQg-VBw03yURhCs2fm-wM4LE7xaz5KN-ThIKWxnDe0RoOO_5mYPjHcjciI7P12-1oUfYiiCBDUUxnzpP95TTTFImqkXf3fyzYetA86H8eB9DXw0JrglGJqXYgTydwOCXueDkWtuD8VpYHU0K9JyTXDBZv7zbDxXAKkP25EvPLy7PiOQymA9YGzboWeblBiKzrJsTcPx05hfqdxFRMj9i6oesATc4TYz5FHRzRT3q9IraOSWZbvGmFd4-HnNeW8DEl-rA2g3tyZlaaWGQGwNX82P2OHCIy4NRnw50efBKgWXpejGOTx37b_J0zdSh-PNPw8U6Wm-GF-qZvQYhFXe80UTNqlgG-jlQzYoQntraHzsw-QT86MbtLJerjtwJHlh04V0ARRqFw-eiFGLUXHnyWM2k49K2hVwFOQeMzB_MxDHdSWohw0IvvkyL4iRO1-MUU6vYK0cYQGI4uRMosRPnHMU";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
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
    let auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NjY5NTA1NzcsImV4cCI6MTY2NzAzNjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhcGktcHJveGl0cmkuZnIiLCJpcCI6IjE3Mi4xOC4wLjIiLCJ1c2VySWQiOjN9.mHVznOg-ene0icm2Y4d6Z_4imVF2yURwv6cxnoWFIpuvVGLD0GCRUSPdqVeA6rBfTCl0MYFbLgagmzvwczwnHOSmMovnxEdwvwl_GQFZDayPVjy2bFXXR2AKi5iXmu7IPM70mICD9JvEgD6ooHQqWQyn46x1c907DOvVZWfD0sXzaJc-rwc0C36h-S0r07nQ4XlwVAJEcnnBl8Hl24vgpQg-VBw03yURhCs2fm-wM4LE7xaz5KN-ThIKWxnDe0RoOO_5mYPjHcjciI7P12-1oUfYiiCBDUUxnzpP95TTTFImqkXf3fyzYetA86H8eB9DXw0JrglGJqXYgTydwOCXueDkWtuD8VpYHU0K9JyTXDBZv7zbDxXAKkP25EvPLy7PiOQymA9YGzboWeblBiKzrJsTcPx05hfqdxFRMj9i6oesATc4TYz5FHRzRT3q9IraOSWZbvGmFd4-HnNeW8DEl-rA2g3tyZlaaWGQGwNX82P2OHCIy4NRnw50efBKgWXpejGOTx37b_J0zdSh-PNPw8U6Wm-GF-qZvQYhFXe80UTNqlgG-jlQzYoQntraHzsw-QT86MbtLJerjtwJHlh04V0ARRqFw-eiFGLUXHnyWM2k49K2hVwFOQeMzB_MxDHdSWohw0IvvkyL4iRO1-MUU6vYK0cYQGI4uRMosRPnHMU";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
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
    let auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NjY5NTA1NzcsImV4cCI6MTY2NzAzNjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhcGktcHJveGl0cmkuZnIiLCJpcCI6IjE3Mi4xOC4wLjIiLCJ1c2VySWQiOjN9.mHVznOg-ene0icm2Y4d6Z_4imVF2yURwv6cxnoWFIpuvVGLD0GCRUSPdqVeA6rBfTCl0MYFbLgagmzvwczwnHOSmMovnxEdwvwl_GQFZDayPVjy2bFXXR2AKi5iXmu7IPM70mICD9JvEgD6ooHQqWQyn46x1c907DOvVZWfD0sXzaJc-rwc0C36h-S0r07nQ4XlwVAJEcnnBl8Hl24vgpQg-VBw03yURhCs2fm-wM4LE7xaz5KN-ThIKWxnDe0RoOO_5mYPjHcjciI7P12-1oUfYiiCBDUUxnzpP95TTTFImqkXf3fyzYetA86H8eB9DXw0JrglGJqXYgTydwOCXueDkWtuD8VpYHU0K9JyTXDBZv7zbDxXAKkP25EvPLy7PiOQymA9YGzboWeblBiKzrJsTcPx05hfqdxFRMj9i6oesATc4TYz5FHRzRT3q9IraOSWZbvGmFd4-HnNeW8DEl-rA2g3tyZlaaWGQGwNX82P2OHCIy4NRnw50efBKgWXpejGOTx37b_J0zdSh-PNPw8U6Wm-GF-qZvQYhFXe80UTNqlgG-jlQzYoQntraHzsw-QT86MbtLJerjtwJHlh04V0ARRqFw-eiFGLUXHnyWM2k49K2hVwFOQeMzB_MxDHdSWohw0IvvkyL4iRO1-MUU6vYK0cYQGI4uRMosRPnHMU";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
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
    let auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NjY5NTA1NzcsImV4cCI6MTY2NzAzNjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhcGktcHJveGl0cmkuZnIiLCJpcCI6IjE3Mi4xOC4wLjIiLCJ1c2VySWQiOjN9.mHVznOg-ene0icm2Y4d6Z_4imVF2yURwv6cxnoWFIpuvVGLD0GCRUSPdqVeA6rBfTCl0MYFbLgagmzvwczwnHOSmMovnxEdwvwl_GQFZDayPVjy2bFXXR2AKi5iXmu7IPM70mICD9JvEgD6ooHQqWQyn46x1c907DOvVZWfD0sXzaJc-rwc0C36h-S0r07nQ4XlwVAJEcnnBl8Hl24vgpQg-VBw03yURhCs2fm-wM4LE7xaz5KN-ThIKWxnDe0RoOO_5mYPjHcjciI7P12-1oUfYiiCBDUUxnzpP95TTTFImqkXf3fyzYetA86H8eB9DXw0JrglGJqXYgTydwOCXueDkWtuD8VpYHU0K9JyTXDBZv7zbDxXAKkP25EvPLy7PiOQymA9YGzboWeblBiKzrJsTcPx05hfqdxFRMj9i6oesATc4TYz5FHRzRT3q9IraOSWZbvGmFd4-HnNeW8DEl-rA2g3tyZlaaWGQGwNX82P2OHCIy4NRnw50efBKgWXpejGOTx37b_J0zdSh-PNPw8U6Wm-GF-qZvQYhFXe80UTNqlgG-jlQzYoQntraHzsw-QT86MbtLJerjtwJHlh04V0ARRqFw-eiFGLUXHnyWM2k49K2hVwFOQeMzB_MxDHdSWohw0IvvkyL4iRO1-MUU6vYK0cYQGI4uRMosRPnHMU";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
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
}




