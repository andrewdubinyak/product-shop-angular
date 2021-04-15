import {Component, OnInit} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }

}
