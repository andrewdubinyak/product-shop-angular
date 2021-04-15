import {Component, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public isMenuCollapsed = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  opened = false;

  toggleSidebar() {
    this.opened = !this.opened
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
