import {Component, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any = [];
  categories: any = [];
  isContentOpen: any = {};
  panelId: any;
  minValue = 50;
  maxValue = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  selectedCity: any;

  cities = [
    {id: 1, name: 'Наявності'},
    {id: 2, name: 'Популярності'},
    {id: 3, name: 'Ціні, спочатку девшеві'},
    {id: 4, name: 'Ціні, спочатку дорогі'}
  ];

  opened = false;

  toggleSidebar(): any {
    this.opened = !this.opened;
  }

  toggleAccordion(event: NgbPanelChangeEvent, idAccordion: number): any {
    this.panelId = event.panelId;
    this.isContentOpen[idAccordion] = event.nextState;
  }

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((products: any) => {
      this.products = products;
    });
    this.categoryService.getAllCategory().subscribe((category: any) => {
      console.log(category);
      this.categories = category;
    });
  }

}
