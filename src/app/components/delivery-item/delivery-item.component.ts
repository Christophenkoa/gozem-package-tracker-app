import { Component, Input } from '@angular/core';
import { Delivery } from 'src/app/interfaces';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css']
})
export class DeliveryItemComponent {
  @Input() deliveryItem!: Delivery;
}
