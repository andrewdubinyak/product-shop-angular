import { Component, OnInit } from '@angular/core';
import {Category} from "../../../models/category";
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../../services/category.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private commonService: CommonService
  ) { }

  onDelete(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(item => item.id !== id);
      this.commonService.showSuccessToastMessage(`Category successfully deleted!`)
    })
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((data: Category[]) => {
      this.categories = data
    })
  }

}
