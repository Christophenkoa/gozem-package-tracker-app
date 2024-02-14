import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Delivery, Package } from 'src/app/interfaces';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { PackageService } from 'src/app/services/package/package.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit, OnDestroy {
  delivery!: Delivery;
  package!: Package;
  packageId: string = '';
  activeDeliveryId: string = '';
  placeholder = 'Enter Package ID';

  private deliverySubscription: Subscription = new Subscription;
  private packageSubscription: Subscription = new Subscription;

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
    private socketService: SocketService) {
  }

  public getPackageId(id: string):void {
    this.packageId = id;
    console.log('Emitted package id: ', this.packageId);

    this.packageSubscription = this.packageService.getPackageById(this.packageId).subscribe({
      next: (data) => {
        this.package = data.data;
        this.activeDeliveryId = this.package?.active_delivery_id ?? '';

        this.deliverySubscription = this.deliveryService.getDeliveryById(this.activeDeliveryId).subscribe({
          next: (data) => {
            this.delivery = data.data;
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.packageSubscription.unsubscribe();
    this.deliverySubscription.unsubscribe()
  }
}
