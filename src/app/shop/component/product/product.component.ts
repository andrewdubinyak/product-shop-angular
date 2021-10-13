import {Component, OnInit} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  headerName: any;
  activePanel: any;
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
              private router: Router,
              private route: ActivatedRoute) {
  }

  categoryChange(categoryName: string): void {
    this.router.navigate(['product/' + categoryName]).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    const categoryName = this.route.snapshot.params.name;

    this.productService.getFilteringProduct(categoryName).subscribe((products: any) => {
      this.products = products;
    });

    this.categoryService.getAllCategory().subscribe((category: any) => {
      this.categories = category;
      const aaa = category.filter((x: { sub_categories: any }) => x.sub_categories.find(
        (a: { slug: any; }) => {
          return a.slug === categoryName;
        }
      ));
      if (aaa.length === 0) {
        this.isContentOpen[categoryName] = true;
        this.activePanel = category.find((x: { slug: any }) => x.slug === categoryName).name;
        this.headerName = category.find((x: { slug: any }) => x.slug === categoryName).name;
      } else {
        aaa.map((res: any) => {
          const bbb = res.sub_categories.find((x: { slug: any }) => x.slug === categoryName).name;
          this.headerName = bbb;
          this.activePanel = res.name;
          this.isContentOpen[res.slug] = true;
        });
      }
    });
  }

}
