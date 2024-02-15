import { Component, Input, OnInit } from '@angular/core';
import { Delivery } from 'src/app/interfaces';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css']
})
export class DeliveryItemComponent implements OnInit{
  @Input() deliveryItem!: Delivery;

  formatToDate(dateString?: string) {
    if(!dateString) {
      return '';
    }
    const formatDateTime =
    `${new Date(dateString).toDateString()}: ${new Date(dateString).toLocaleTimeString()}`
    return formatDateTime
  }

  ngOnInit(): void {
  }
}
