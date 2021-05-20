import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  categories: any = [];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1300/400`);

  constructor(private categoryService: CategoryService,
              config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      res.map((category: any) => {
        this.categories.push(category);
      });
    });

  }

}
