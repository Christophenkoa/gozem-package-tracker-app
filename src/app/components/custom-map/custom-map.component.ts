import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.css']
})
export class CustomMapComponent implements OnInit {

  ngOnInit(): void {
    let map = L.map('map').setView(
      [
        3.89425221216556,
        11.545900842404988
      ],
      13
    );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    new L.marker([3.8567936, 11.5212288])
      .bindPopup("driver location")
      .addTo(map);

    new L.marker([3.895879228322214, 11.570362585929654])
      .bindPopup("source location")
      .addTo(map);

    new L.marker([3.8614543228351934, 11.524529003325544])
      .bindPopup("destination location")
      .addTo(map);

    // var locations = [
    //   ["driver location", 11.8166, 122.0942],
    //   ["package source", 11.9804, 121.9189],
    //   ["package destination", 10.7202, 122.5621],
    // ];
  }

  watchPosition() {
    // You can clear avigator.geolocation.clearWatch(id);
    let id = navigator.geolocation.watchPosition((position) => {

    },(error) => {
      console.log(error)
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }
}
