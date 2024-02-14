import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-search-bar',
  templateUrl: './item-search-bar.component.html',
  styleUrls: ['./item-search-bar.component.css']
})
export class ItemSearchBarComponent {
  @Output() onBtnSearch = new EventEmitter<string>();
  @Input() placeholder = '';
  itemId: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    console.log('child', this.itemId)
    this.onBtnSearch.emit(this.itemId);
  }
}
