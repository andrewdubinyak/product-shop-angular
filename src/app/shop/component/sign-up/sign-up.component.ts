import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {CommonService} from '../../../services/common.service';
import {takeUntil} from "rxjs/operators";
import {Constants} from "../../../shared/common.constants";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private subscriptionDestroyed$: Subject<void> = new Subject<void>();

  signUpForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
  ) {
    this.signUpForm = fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      phone_number: new FormControl('', {
        validators: [Validators.required],
      }),
      first_name: new FormControl('', {
        validators: [Validators.required],
      }),
      last_name: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
      confirm_password: new FormControl('', {
        validators: [Validators.required],
      })
    });
  }

  onSubmit(formObj: any): any {
    const payload = {
      email: formObj.email,
      phone_number: formObj.phone_number,
      first_name: formObj.first_name,
      last_name: formObj.last_name,
      password: formObj.password,
      confirm_password: formObj.confirm_password
    };
    this.authService.signUp(payload)
      .pipe(takeUntil(this.subscriptionDestroyed$)).subscribe((res: any) => {
      if (res) {
        window.localStorage.setItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER, JSON.stringify(res.token));
        this.router.navigateByUrl('/profile');
        this.commonService.showSuccessToastMessage('Logged in successfully!');
        this.closeModal();
      } else {
        this.commonService.showErrorToastMessage('Invalid email or password!');
      }
    }, (error1: any) => {
      this.commonService.showErrorToastMessage('Invalid email or password!');
    });
  }

  closeModal(): any {
    this.activeModal.close();
  }

  ngOnInit(): void {
  }

}
