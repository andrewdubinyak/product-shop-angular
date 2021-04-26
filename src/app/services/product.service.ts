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

  getAllProduct() {
    return this.http.get(environment.apiBaseUrl + '/product');
  }

  createProduct(payload: any) {
    return this.http.post(environment.apiBaseUrl + '/product/new-product', payload);
  }
}

