import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Subject} from "rxjs";
import {CategoryService} from "../../../services/category.service";
import {CommonService} from "../../../services/common.service";
import {
  SubCategory,
  SubCategoryService
} from "../../../services/sub-category.service";
import {UploadService} from "../../../services/upload.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  private subscriptionDestroyed$: Subject<void> = new Subject<void>();
  urls = [];
  closeResult = '';
  productForm: any = FormGroup;
  categoryForm: any = FormGroup;
  subcategoryForm: FormGroup;
  categories: any = [];
  subcategories: any = [];
  catMod: number | undefined;
  imageList: any;
  isAddMode: boolean = false;
  id?: string;


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private commonService: CommonService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.categoryForm = fb.group({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      file: new FormControl('', {
        validators: [Validators.required]
      })
    })
    this.subcategoryForm = fb.group({
      category: new FormControl('', {
        validators: [Validators.required]
      }),
      name: new FormControl('', {
        validators: [Validators.required]
      })
    })
    this.productForm = fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      weight: new FormControl('', {
        validators: [Validators.required],
      }),
      file: new FormControl('', {
        validators: [Validators.required]
      }),
      price: new FormControl('', {
        validators: [Validators.required,]
      }),
      shortDescription: new FormControl('', {
        validators: [Validators.required]
      }),
      category: new FormControl('', {
        validators: [Validators.required]
      }),
      subcategory: new FormControl('', {
        validators: [Validators.required]
      }),
      stock: new FormControl('', {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      brand: new FormControl('', {
        validators: [Validators.required]
      }),
      packedge: new FormControl('', {
        validators: [Validators.required]
      }),
      manufacturer: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      }),
      barcode: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }

  onSubmit() {
    if (!this.imageList || this.imageList.length === 0) {
      return;
    }
    const payload: any = new FormData();
    this.imageList.forEach((image: any) => payload.append('file', image));
    payload.append("name", this.productForm.get('name').value);
    payload.append("weight", this.productForm.get('weight').value);
    payload.append("price", this.productForm.get('price').value);
    payload.append("shortDescription", this.productForm.get('shortDescription').value);
    payload.append("category", this.productForm.get('category').value);
    payload.append("subcategory", this.productForm.get('subcategory').value);
    payload.append("stock", this.productForm.get('stock').value);
    payload.append("barcode", this.productForm.get('barcode').value);
    payload.append("type", this.productForm.get('type').value);
    payload.append("brand", this.productForm.get('brand').value);
    payload.append("packedge", this.productForm.get('packedge').value);
    payload.append("manufacturer", this.productForm.get('manufacturer').value);
    payload.append("description", this.productForm.get('description').value);
    this.productService.createProduct(payload).subscribe(() => {
      this.commonService.showSuccessToastMessage(`New Product added!`)
    }, (error) => {
      const msg = error.error.error.message
      this.commonService.showErrorToastMessage(msg);
    })
  }

  onUpdate(payload: any) {
    this.productService.updateProduct(payload)
  }

  imageUpload(files: any) {
    this.imageList = this.uploadService.uploadFile(files)
  }

  onSubmitCategory() {
    const payload: any = new FormData();
    payload.append("name", this.categoryForm.get('name').value);
    this.imageList.forEach((image: any) => payload.append('file', image));
    this.categoryService.createCategory(payload).subscribe(() => {
      this.commonService.showSuccessToastMessage(`New category added!`)
    }, (error) => {
      const msg = error.error.error.message
      this.commonService.showErrorToastMessage(msg);
    })
  }

  onSubmitSubcategory(formObj: any) {
    const subcategory: SubCategory = {
      category: formObj.category,
      name: formObj.name
    }
    this.subCategoryService.createSubcategory(subcategory).subscribe(() => {
        this.subcategories.push(subcategory)
        this.commonService.showSuccessToastMessage(`New ${formObj.name} added!`)
      },
      (error) => {
        const msg = error.error.error.message
        this.commonService.showErrorToastMessage(msg)
      })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      if (filesAmount <= 4) {
        for (let i = 0; i < filesAmount; i++) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            // @ts-ignore
            this.urls.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      } else {
        console.log("ERR MAX FILE UPLOAD 4")
      }
    }
  }

  onSelectSubCategory(event: any) {
    const categoryId = event.target.value
    this.subCategoryService.getAllSubcategory().subscribe(subcategories => {
      this.subcategories = subcategories.filter((item: any) => item.categoryId === parseInt(categoryId))
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories
    })
  }

  ngOnDestroy() {
    this.subscriptionDestroyed$.next();
    this.subscriptionDestroyed$.complete();
  }

}
