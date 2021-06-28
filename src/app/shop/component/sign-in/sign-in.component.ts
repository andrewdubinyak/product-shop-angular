import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {CommonService} from '../../../services/common.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Constants} from '../../../shared/common.constants';
import {SignUpComponent} from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private subscriptionDestroyed$: Subject<void> = new Subject<void>();

  signInForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
  ) {
    this.signInForm = fb.group({
      phone_number: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      })
    });
  }

  openSignUpModal(): any {
    const modalRef = this.modalService.open(SignUpComponent, {
      centered: true, windowClass: 'modal-signIn'
    });

    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }


  closeModal(): any {
    this.activeModal.close();
  }

  ngOnInit(): void {
  }

  onSubmit(formObj: any): any {
    const payload = {
      phone_number: formObj.phone_number,
      password: formObj.password
    };
    this.authService.signIn(payload)
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

  ngOnDestroy(): any {
    this.subscriptionDestroyed$.next();
    this.subscriptionDestroyed$.complete();
  }

}
