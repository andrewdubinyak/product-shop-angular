import {Component, OnInit} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: any;
  count = 1;
  product: any = [];
  characteristic: any = {};

  constructor(config: NgbRatingConfig,
              private productService: ProductService,
              private route: ActivatedRoute) {
    config.max = 5;
    config.readonly = true;
  }

  increase(): any {
    this.count++;
  }

  decrease(): any {
    this.count--;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.productService.getById(this.id)
      .subscribe((product: any) => {
        console.log(product);
        this.characteristic = product.characteristic;
        this.product = product;
      });
  }

}
