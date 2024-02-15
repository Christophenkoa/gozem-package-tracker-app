import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/services/package/package.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  weight!: number;
  width!: number;
  height!: number;
  depth!: number;
  description = '';
  from_name: string = '';
  to_name: string = '';
  from_address: string = '';
  to_address: string = '';
  from_location_lat!: number;
  from_location_lng!: number;
  to_location_lat!: number;
  to_location_lng!: number;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {}

  createPackage() {
    this.packageService.createPackage(
      {
        depth: this.depth,
        from_address: this.from_address,
        from_location: {
          lat: this.from_location_lat,
          lng: this.from_location_lng
        },
        from_name: this.from_name,
        to_address: this.to_address,
        height: this.height,
        to_name: this.to_name,
        weight: this.weight,
        to_location: {
          lat: this.to_location_lat,
          lng: this.to_location_lng
        },
        width: this.width,
        description: this.description
      }
    ).subscribe({
      next: (data) => {
        console.log(data);
        alert('package added successfully');
      },
      error: (error) => {
        console.log(error);
        alert('an error occured while adding a new package');
      }
    });
  }
}
