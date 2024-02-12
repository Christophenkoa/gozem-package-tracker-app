import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Delivery, Package } from 'src/app/interfaces';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { PackageService } from 'src/app/services/package/package.service';

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

  private deliverySubscription: Subscription = new Subscription;
  private packageSubscription: Subscription = new Subscription;

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService) {
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
            this.package = data.data; console.log(this.package)
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
    }

    // lat: 3.8567936
    // long: 11.5212288
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      )
    })
  }

  ngOnDestroy(): void {
    this.packageSubscription.unsubscribe();
    this.deliverySubscription.unsubscribe()
  }
}
