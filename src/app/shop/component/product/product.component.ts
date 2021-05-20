import {Component, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  minValue = 50;
  maxValue = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  opened = false;

  toggleSidebar(): any {
    this.opened = !this.opened;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
