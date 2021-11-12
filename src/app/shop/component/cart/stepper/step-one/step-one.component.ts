import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../../../../../services/cart.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems: QueryList<ElementRef> | undefined;
  public stepOneForm: FormGroup;
  items: any = [];

  constructor(private fb: FormBuilder,
              private cartService: CartService) {
    this.stepOneForm = this.fb.group({});
  }

  changeSubtotal(item: any, index: any): void {
    const qty = item.qtyTotal;
    const amt = item.price;
    const subTotal = amt * qty;
    item.subTotal = subTotal.toFixed(2);
    // @ts-ignore
    this.subTotalItems.toArray()[index].nativeElement.innerHTML = subTotal.toFixed(2) + ' грн.';
    this.cartService.saveCart();
  }

  increase(item: any, index: any): void {
    item.qtyTotal++;
    this.changeSubtotal(item, index);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.items = [...this.cartService.getItems()];
  }

  removeFromCart(item: any): void {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  decrease(item: any, index: any): void {
    item.qtyTotal--;
    this.changeSubtotal(item, index);
  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
  }

  stepOneSubmit(): void {
  }
}
