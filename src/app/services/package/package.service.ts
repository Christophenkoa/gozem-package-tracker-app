import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Package } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private httpPackageService: HttpService<{data: Package}>) { }

  getPackageById(packageId: string) {
    return this.httpPackageService.get(
      `package/${packageId}`
    );
  }

  getPackages() {
    return this.httpPackageService.get(
      'package'
    );
  }
}
