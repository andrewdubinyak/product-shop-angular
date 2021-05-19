import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {SubCategoryService} from '../../../services/sub-category.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isContentOpen: any = {};
  showFiller = false;
  public isMenuCollapsed = true;
  opened = false;
  left = 'left';
  categories: any = [];
  panelId: any;

  constructor(private categoryService: CategoryService) {
  }

  toggleSidebar(): any {
    this.opened = !this.opened;
  }

  toggleAccordion(event: NgbPanelChangeEvent, idAccordion: number): any {
    this.panelId = event.panelId;
    this.isContentOpen[idAccordion] = event.nextState;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      res.map((category: any) => {
        this.categories.push(category);
      });
    });


  }
}
