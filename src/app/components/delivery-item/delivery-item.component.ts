import { Component, Input, OnInit } from '@angular/core';
import { Connection, Delivery } from 'src/app/interfaces';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css']
})
export class DeliveryItemComponent implements OnInit{
  @Input() deliveryItem!: Delivery;

  constructor(private socketService: SocketService) {}

  formatToDate(dateString?: string) {
    if(!dateString) {
      return '';
    }
    const formatDateTime =
    `${new Date(dateString).toDateString()}: ${new Date(dateString).toLocaleTimeString()}`
    return formatDateTime
  }

  ngOnInit(): void {
    this.listenStatusUpdate();
  }

  listenStatusUpdate() {
    this.socketService.listenToServer(Connection.delivery_updated)
      .subscribe({
        next: (data: {event: string, delivery_object: Delivery}) => {
          if(data.delivery_object._id == this.deliveryItem._id &&
            data.delivery_object.status != this.deliveryItem.status) {
            this.deliveryItem.status = data.delivery_object.status;
          }
        }
      })
  }
}
