import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Constants} from '../shared/common.constants';
// import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from 'rxjs';
import {UserInterface} from "../models/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<UserInterface>;
  public user: Observable<UserInterface>;

  constructor(
    private router: Router,
    // private apiService: ApiService,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<UserInterface>(JSON.parse(<string>localStorage.getItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER)));
    this.user = this.userSubject.asObservable();
  }

  isAuthenticated() {
    let loggedInUser = JSON.parse(<string>window.localStorage.getItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER));
    if (loggedInUser) {
      return true;
    } else {
      this.router.navigateByUrl('admin/log-in');
      return false;
    }
  }

  adminSignIn(payload: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/admin-login', payload)
  }

  signIn(payload: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/login', payload)
  }

  signUp(payload: any) {
    console.log(payload);
    return this.http.post(environment.apiBaseUrl + '/auth/register', payload);
  }

  forgotPassword(payload: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/forgot-password', payload)
  }

  resetPassword(payload: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/reset-password', payload)
  }

  public get userValue(): UserInterface {
    return this.userSubject.value;
  }
}
