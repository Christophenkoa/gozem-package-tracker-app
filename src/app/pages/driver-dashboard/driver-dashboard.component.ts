import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Connection, Delivery, DeliveryStatus, Package } from 'src/app/interfaces';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { PackageService } from 'src/app/services/package/package.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent {
  delivery!: Delivery;
  package!: Package;
  deliveryId: string = '';
  deliveryPackageId: string = '';
  latitude!: number;
  longitude!: number;

  private deliverySubscription: Subscription = new Subscription;
  private packageSubscription: Subscription = new Subscription;
  private subscription: Subscription = new Subscription;

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
    private socketService: SocketService) {
  }

  public getDeliveryId(id: string):void {
    this.deliveryId = id;
    console.log('Emitted delivery id: ', this.deliveryId);

    // '65c83682e680665dd9ad7f9a'
    this.deliverySubscription = this.deliveryService.getDeliveryById(this.deliveryId).subscribe({
      next: (data) => {
        this.delivery = data.data;
        this.deliveryPackageId = this.delivery?.package_id ?? '';

        //65c83682e680665dd9ad7f9a
        this.packageSubscription = this.packageService.getPackageById(this.deliveryPackageId).subscribe({
          next: (data) => {
            this.package = data.data;
          },
          error: (error) => {
            console.log(error);
            alert(error.message);
          }
        });
      },
      error: (error) => {
        console.log(error);
        alert(error.message);
      }

    });
  }

  ngOnInit(): void {
    if(!navigator.geolocation) {
      console.log('location is not supported.')
    } else {
      this.watchPosition();
      // this.watchPosition2()
    }
  }

  // watchPosition2() {
  //   //emit value in sequence every 2 second
  //   const source = interval(2000);
  //   this.subscription = source.subscribe(() => {
  //     console.log('hello')
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;

  //       console.log(position)

  //       if(this.delivery) {
  //         console.log(this.delivery.status)

  //         if(this.delivery.status === DeliveryStatus.failed
  //           || this.delivery.status === DeliveryStatus.delivered) {
  //             this.subscription.unsubscribe();
  //         }

  //         this.socketService.emitToServer(Connection.location_changed, {
  //           event: Connection.location_changed,
  //           delivery_id: this.delivery._id,
  //           location: {
  //             lat: this.latitude,
  //             lng: this.longitude
  //           }
  //         });
  //       }
  //     })
  //   });
  // }

  watchPosition() {
    let id = navigator.geolocation.watchPosition((position) => {

    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    console.log(position);

    if(this.delivery) {
      console.log(this.delivery.status)

      if(this.delivery.status === DeliveryStatus.failed
        || this.delivery.status === DeliveryStatus.delivered) {
          navigator.geolocation.clearWatch(id);
      }

      this.socketService.emitToServer(Connection.location_changed, {
        event: Connection.location_changed,
        delivery_id: this.delivery._id,
        location: {
          lat: this.latitude,
          lng: this.longitude
        }
      });
    }

    },(error) => {
      console.log(error)
    },
    {
      enableHighAccuracy: false,
      timeout: 2000,
      maximumAge: 0
    });
  }

  ngOnDestroy(): void {
    this.packageSubscription.unsubscribe();
    this.deliverySubscription.unsubscribe();
    // this.subscription.unsubscribe();
  }
}
