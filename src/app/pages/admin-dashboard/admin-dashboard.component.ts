import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Delivery, Package } from 'src/app/interfaces';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { PackageService } from 'src/app/services/package/package.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  private packageSubscription: Subscription = new Subscription;
  private deliverySubscription: Subscription = new Subscription;

  packages: Package[] = [];
  deliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService,
    private packageService: PackageService) {}

  ngOnInit(): void {
    this.getAllPackages();
    this.getAllDeliveries()
  }

  getAllPackages() {
    this.packageSubscription = this.packageService.getPackages()
      .subscribe({
        next: (allPackageData: any) => {
          console.log(allPackageData.data)
          this.packages = allPackageData.data;
        }
      })
  }

  getAllDeliveries() {
    this.deliverySubscription = this.deliveryService.getDeliveries()
      .subscribe({
        next: (allDeliveryData: any) => {
          console.log(allDeliveryData.data)
          this.deliveries = allDeliveryData.data;
        }
      })
  }

  ngOnDestroy(): void {
    this.deliverySubscription.unsubscribe();
    this.packageSubscription.unsubscribe()
  }
}
