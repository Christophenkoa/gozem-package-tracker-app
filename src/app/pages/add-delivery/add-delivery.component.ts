import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryStatus, Package } from 'src/app/interfaces';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { PackageService } from 'src/app/services/package/package.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent {
  start_time!: number;
  package_id!: string;
  packages: Package[] = [];

  private packageSubscription: Subscription = new Subscription;

  constructor(private packageService: PackageService,
    private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.getAllPackages();
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

  createDelivery() {
    console.log(this.package_id);
    const start_time = new Date().toString();
    const status = DeliveryStatus.open;

    this.deliveryService.createDelivery(
      {
        package_id: this.package_id,
        start_time: start_time,
        status: status
      }
    ).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  ngOnDestroy(): void {
    this.packageSubscription.unsubscribe()
  }
}
