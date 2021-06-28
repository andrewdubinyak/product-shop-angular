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
export class ProfileService {
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
    if (loggedInUser) {
      return true;
    } else {
      this.router.navigateByUrl('admin/log-in');
      return false;
    }
  }

  getProfile(): any {
    return this.http.get(environment.apiAuthUrl + '/profile/');
  }
}
