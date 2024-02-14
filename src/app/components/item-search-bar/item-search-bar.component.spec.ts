import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchBarComponent } from './item-search-bar.component';

describe('ItemSearchBarComponent', () => {
  let component: ItemSearchBarComponent;
  let fixture: ComponentFixture<ItemSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
