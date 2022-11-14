import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderandshippingComponent } from './orderandshipping.component';

describe('OrderandshippingComponent', () => {
  let component: OrderandshippingComponent;
  let fixture: ComponentFixture<OrderandshippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderandshippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderandshippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
