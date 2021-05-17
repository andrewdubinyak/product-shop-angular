import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  opened = false;
  categories: any = [];

  constructor(private categoryService: CategoryService) {
  }

  toggleSidebar(): any {
    this.opened = !this.opened;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }

}
