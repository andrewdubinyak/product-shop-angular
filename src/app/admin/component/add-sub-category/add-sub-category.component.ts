import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {SubCategoryService} from "../../../services/sub-category.service";
import {CommonService} from "../../../services/common.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit, OnDestroy {
  private subscriptionDestroyed$: Subject<void> = new Subject<void>();
  urls = [];
  closeResult = '';
  categories: any = []
  subCategoryForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private commonService: CommonService,
  ) {
    this.subCategoryForm = fb.group({
      category: new FormControl('', {
        validators: [Validators.required],
      }),
      name: new FormControl('', {
        validators: [Validators.required],
      })
    });
  }

  onSubmit(formObj: any) {
    const payload = {
      category: formObj.category,
      name: formObj.name
    }
    this.subCategoryService.createSubcategory(payload)
      .subscribe(
        () => {
          this.commonService.showSuccessToastMessage(`New ${formObj.name} for category added!`)
        },
        error => {
          const msg = error.error.error.message
          this.commonService.showErrorToastMessage(`Subcategory ${formObj.name} already exist`);
        })
  }

  ngOnInit(): any {
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories
    })

  }
  ngOnDestroy() {
    this.subscriptionDestroyed$.next();
    this.subscriptionDestroyed$.complete();
  }


}
