import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverActionBarComponent } from './driver-action-bar.component';

describe('DriverActionBarComponent', () => {
  let component: DriverActionBarComponent;
  let fixture: ComponentFixture<DriverActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverActionBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
