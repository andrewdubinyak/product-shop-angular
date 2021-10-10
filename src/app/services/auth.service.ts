import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Constants} from '../shared/common.constants';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserInterface} from '../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<UserInterface>;
  public user: Observable<UserInterface>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<UserInterface>(JSON.parse(localStorage.getItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER) as string));
    this.user = this.userSubject.asObservable();
  }

  isAuthenticated(): any {
    const loggedInUser = JSON.parse(window.localStorage.getItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER) as string);
    return !!loggedInUser;
  }

  signIn(payload: any): any {
    return this.http.post(environment.apiAuthUrl + '/login/', payload);
  }

  signUp(payload: any): any {
    return this.http.post(environment.apiAuthUrl + '/register/', payload);
  }

  forgotPassword(payload: any): any {
    return this.http.post(environment.apiBaseUrl + '/auth/forgot-password', payload);
  }

  public get userValue(): UserInterface {
    return this.userSubject.value;
  }
}
