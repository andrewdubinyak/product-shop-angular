import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {environment} from "../../environments/environment";
import {Constants} from "../shared/common.constants";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(<string>localStorage.getItem(Constants.localStorageKeys.KEY_LOGGEDIN_USER));
    const isLoggedIn = user?.token;
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          auth: `${user.token}`
        }
      });
    }
    return next.handle(request);
  }
}
