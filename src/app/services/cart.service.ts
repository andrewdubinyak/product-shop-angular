import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  addToCart(addedItem: never): void {
    this.items.push(addedItem);
    this.saveCart();
  }

  getItems(): any[] {
    return this.items;
  }

  loadCart(): void {
    // @ts-ignore
    this.items = JSON.parse(localStorage.getItem('cart_items')) ?? [];
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem('cart_items');
  }

  removeItem(item: any): void {
    // @ts-ignore
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(item: any): boolean {
    // @ts-ignore
    return this.items.findIndex(o => o.id === item.id) > -1;
  }

}
