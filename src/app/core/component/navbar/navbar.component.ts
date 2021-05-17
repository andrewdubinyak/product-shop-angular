import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {SubCategoryService} from '../../../services/sub-category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  public isMenuCollapsed = true;
  opened = false;
  left = 'left';
  categories: any = [];

  constructor(private categoryService: CategoryService) {
  }

  toggleSidebar(): any {
    this.opened = !this.opened;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      res.map((category: any) => {
        this.categories.push(category);
      });
    });


  }
}
