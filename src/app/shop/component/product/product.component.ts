import {Component, OnInit} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  headerName: any;
  products: any = [];
  categories: any = [];
  isContentOpen: any = {};
  panelId: any;
  minValue = 0;
  maxValue = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '';
        case LabelType.High:
          return '';
        default:
          return '';
      }
    }
  };
  selectedSort: any;

  sortingType = [
    {id: 1, name: 'Наявності'},
    {id: 2, name: 'Популярності'},
    {id: 3, name: 'Ціні, спочатку девшеві'},
    {id: 4, name: 'Ціні, спочатку дорогі'}
  ];

  filterMenu = [
    {id: 'price', name: 'вартість, грн'},
    {id: 'mark', name: 'торгова марка'},
    {id: 'country', name: 'країна'},
  ];

  opened = false;

  toggleAccordion(event: NgbPanelChangeEvent, idAccordion: string): any {
    this.panelId = event.panelId;
    this.isContentOpen[idAccordion] = event.nextState;
  }

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.headerName = this.route.snapshot.params.id;
    this.isContentOpen[this.headerName] = true;

    this.productService.getAllProduct().subscribe((products: any) => {
      this.products = products;
    });
    this.categoryService.getAllCategory().subscribe((category: any) => {
      this.categories = category;
    });
  }

}
