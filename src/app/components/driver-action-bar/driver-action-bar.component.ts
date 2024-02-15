import { Component, Input } from '@angular/core';
import { Connection, DeliveryStatus } from 'src/app/interfaces';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-driver-action-bar',
  templateUrl: './driver-action-bar.component.html',
  styleUrls: ['./driver-action-bar.component.css']
})
export class DriverActionBarComponent {
  @Input() deliveryId: string = '';

  constructor(private socketService: SocketService) {}
  setStatus(status: string) {
    let selectedStatus;

    if(this.deliveryId === '') {
      return;
    }

    if(status == DeliveryStatus.delivered.toString()) {
      selectedStatus = DeliveryStatus.delivered;
    }else if(status == DeliveryStatus.in_transit.toString()) {
      selectedStatus = DeliveryStatus.in_transit;
    }else if(status == DeliveryStatus.pick_up.toString()) {
      selectedStatus = DeliveryStatus.pick_up;
    }else if(status == DeliveryStatus.failed.toString()) {
      selectedStatus = DeliveryStatus.failed;
    }else {
      console.log('unknow status');
      alert('Unknown status selected');
      return;
    }

    this.socketService.emitToServer(Connection.status_changed, {
      event: Connection.status_changed,
      delivery_id: this.deliveryId,
      status: selectedStatus
    });
  }


}
