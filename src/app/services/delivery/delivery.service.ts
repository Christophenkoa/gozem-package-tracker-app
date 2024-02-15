import { Injectable } from '@angular/core';
import { Delivery } from 'src/app/interfaces';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private httpDeliveryService: HttpService<{data: Delivery}>) { }

  getDeliveryById(deliveryId: string) {
    return this.httpDeliveryService.get(
      `delivery/${deliveryId}`
    );
  }

  getDeliveries() {
    return this.httpDeliveryService.getAll(
      'delivery',
    );
  }

  createDelivery(data: Delivery) {
    return this.httpDeliveryService.postWithHeader(data, 'delivery');
  }
}
