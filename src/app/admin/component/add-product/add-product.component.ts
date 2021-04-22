import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private subscriptionDestroyed$: Subject<void> = new Subject<void>();
  urls = [];
  closeResult = '';
  productForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private addProduct: ProductService
    // private router: Router,
    // private appEventService: AppEventService,
    // private apiService: ApiService,
    // private authService: AuthService,
    // private commonService: CommonService,
  ) {
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
        validators: [Validators.required]
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
      manufacture: new FormControl('', {
        validators: [Validators.required]
      }),
      Description: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }

  onSubmit(formObj: any) {
    const payload = {
      name: formObj.name,
      weight: formObj.weight,
      file: formObj.file,
      price: formObj.price,
      shortDescription: formObj.shortDescription,
      category: formObj.category,
      subcategory: formObj.subcategory,
      stock: formObj.stock,
      type: formObj.type,
      brand: formObj.brand,
      packedge: formObj.packedge,
      manufacture: formObj.manufacture,
      Description: formObj.Description,
    };
    this.addProduct.createProduct(payload)
      .pipe(takeUntil(this.subscriptionDestroyed$)).subscribe((res) => {
      console.log(res)
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
}
