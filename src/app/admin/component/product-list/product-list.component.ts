import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {
  NgbdSortableHeader,
  SortEvent
} from "../../../services/sortable.directive";
import {Product} from "../../../models/product";
import {DecimalPipe} from "@angular/common";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [SearchService, DecimalPipe]
})

export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  total$: Observable<number>;

  // @ts-ignore
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  products: any;

  constructor(public service: SearchService) {
    this.products$ = service.products$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.service.getAllProduct().subscribe(products => {
      console.log(products)
      this.products = products
    })
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
