import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {Constants} from '../shared/common.constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER) as string);
    const isLoggedIn = user;
    const isApiUrl = request.url.startsWith(environment.apiAuthUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user}`
        }
      });
    }
    return next.handle(request);
  }
}
