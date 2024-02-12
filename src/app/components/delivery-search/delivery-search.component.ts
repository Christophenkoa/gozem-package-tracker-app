import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-search',
  templateUrl: './delivery-search.component.html',
  styleUrls: ['./delivery-search.component.css']
})
export class DeliverySearchComponent {
  @Output() onBtnSearch = new EventEmitter<string>();
  deliveryId: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    console.log('child', this.deliveryId)
    this.onBtnSearch.emit(this.deliveryId);
  }
}
