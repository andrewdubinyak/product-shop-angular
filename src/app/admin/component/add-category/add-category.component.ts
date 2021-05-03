import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../../services/category.service";
import {CommonService} from "../../../services/common.service";
import {ImageService} from "../../../services/image.service";
import {UploadService} from "../../../services/upload.service";
import {Category} from "../../../models/category";


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  urls: any;
  categories: Category[] = [];
  closeResult = '';
  categoryForm: any = FormGroup;
  imageForm: any = FormGroup;
  imageList: any;
  imageCategory: any = [];


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private commonService: CommonService,
    private uploadService: UploadService,
  ) {
    this.imageForm = fb.group({
      file: new FormControl('', {
        validators: [Validators.required],
      })
    })
    this.categoryForm = fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      image: new FormControl('', {
        validators: [Validators.required],
      })
    });
  }

  imageUpload(files: any) {
    this.imageList = this.uploadService.uploadFile(files)
  }

  uploadImage() {
    const payload: any = new FormData();
    this.imageList.forEach((image: any) => payload.append('file', image));
    this.imageService.uploadImage(payload).subscribe(res => {
      this.imageCategory.push(res)
    })
  }

  onSubmit(formObj: any) {
    const category: any = {
      name: formObj.name,
      image: formObj.image
    }
    this.categoryService.createCategory(category)
      .subscribe(
        () => {
          this.categories.push(category)
          this.commonService.showSuccessToastMessage(`New category added!`)
        },
        error => {
          const msg = error.error.error.message
          this.commonService.showErrorToastMessage(msg);
        })
  }

  onDelete(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(item => item.id !== id);
      this.commonService.showSuccessToastMessage(`Category successfully deleted!`)
    })
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.urls = event.target.result
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  prevImage(imageUrl: any) {
    this.urls = imageUrl
  }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data: Category[]) => {
      this.categories = data
    })
    this.imageService.getAllImage().subscribe(res => {
      this.imageCategory = res
    })
  }

}
