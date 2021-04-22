import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(
    private http: HttpClient,

  ) {
  }

  getAllCategory() {
    return this.http.get(environment.apiBaseUrl + '/category');
  }

  createCategory(category: any) {
    return this.http.post(environment.apiBaseUrl + '/catalog/new-category', category)
  }
}


