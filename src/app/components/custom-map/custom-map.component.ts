import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/interfaces';
import PackageType from 'src/app/interfaces/Package';
import { SocketService } from 'src/app/services/socket/socket.service';

declare const L: any;

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.css']
})
export class CustomMapComponent implements OnInit {
  @Input() packageItem!: PackageType;

  defaultMapZoneCoords = {
    lat: 4.0534016,
    lng: 9.7288192
  }

  maxZom = 22;
  map!: any;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.getDeliveryUpdate()

    this.map = L.map('map').setView(
      [
        this.defaultMapZoneCoords.lat,
        this.defaultMapZoneCoords.lng
      ],
      13
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: this.maxZom,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  getDeliveryUpdate() {
    console.log('custom map')
    this.socketService.listenToServer(Connection.delivery_updated)
      .subscribe({
        next: (value) => {
          console.log("package item map")
          console.log(this.packageItem)

          new L.marker([
            value.delivery_object.location.lat,
            value.delivery_object.location.lng
          ])
          .bindPopup("driver location")
          .addTo(this.map);

          new L.marker([
            this.packageItem?.from_location?.lat,
            this.packageItem?.from_location?.lng
          ])
          .bindPopup("source location")
          .addTo(this.map);

          new L.marker([
            this.packageItem?.to_location?.lat,
            this.packageItem?.to_location?.lng,
          ])
          .bindPopup("destination location")
          .addTo(this.map);

          console.log(value.delivery_object);
        }
      })
  }
}
