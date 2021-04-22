import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../../services/category.service";
import {CommonService} from "../../../services/common.service";


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  urls = [];
  closeResult = '';
  categoryForm: any = FormGroup;


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private addCategory: CategoryService,
    private commonService: CommonService,
    // private appEventService: AppEventService,
  ) {
    this.categoryForm = fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      file: new FormControl('', {
        validators: [Validators.required],
      })
    });
  }

  uploadFile(event: any) {
    const file: any = (event.target as HTMLInputElement).files;
    this.categoryForm.patchValue({
      file: file.item(0)
    });
    this.categoryForm.get('file').updateValueAndValidity()
  }

  onSubmit() {
    const payload: any = new FormData();
    payload.append("name", this.categoryForm.get('name').value);
    payload.append("file", this.categoryForm.get('file').value);
    this.addCategory.createCategory(payload)
      .subscribe(
        () => {
          this.commonService.showSuccessToastMessage(`New category added!`)
        },
        error => {
          const msg = error.error.error.message
          this.commonService.showErrorToastMessage(msg);
        })
  }

  ngOnInit() {
  }

}
