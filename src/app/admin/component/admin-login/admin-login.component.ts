import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {CommonService} from "../../../services/common.service";
import {Constants} from "../../../shared/common.constants";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  private subscriptionDestroyed$: Subject<void> = new Subject<void>();

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private appEventService: AppEventService,
    // private apiService: ApiService,
    private authService: AuthService,
    private commonService: CommonService,
  ) {
    this.signInForm = fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      })
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formObj: any) {
    // this.appEventService.showLoadingEmitter.next(true);
    const payload = {
      email: formObj.email,
      password: formObj.password
    };
    this.authService.adminSignIn(payload)
      .pipe(takeUntil(this.subscriptionDestroyed$)).subscribe((res) => {
      // this.appEventService.showLoadingEmitter.next(false);
      if (res) {
        window.localStorage.setItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER, JSON.stringify(res));
        // this.appEventService.loggedInOutEmitter.next({loggedIn: true});
        this.router.navigateByUrl('/admin');
        // this.commonService.showSuccessToastMessage('Logged in successfully!');
      } else {
        this.commonService.showErrorToastMessage('Invalid email or password!');
      }
    }, error1 => {
      // this.appEventService.showLoadingEmitter.next(false);
      this.commonService.showErrorToastMessage('Invalid email or password!');
    });
  }

  ngOnDestroy() {
    this.subscriptionDestroyed$.next();
    this.subscriptionDestroyed$.complete();
  }

}
