import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllProduct(): any {
    return this.http.get(environment.apiBaseUrl + '/products');
  }

  getById(id: number): any {
    return this.http.get(environment.apiBaseUrl + `/products/${id}`);
  }
}

