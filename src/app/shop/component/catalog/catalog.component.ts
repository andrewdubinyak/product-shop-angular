import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  categories: any = [];

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categories = res;
    });

  }

}
