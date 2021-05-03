import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Category} from "../models/category";


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllCategory() {
    return this.http.get<Category[]>(environment.apiBaseUrl + '/catalog').pipe(map((res: any) => {
      return res.categories;
    }));
  }

  createCategory(category: any) {
    return this.http.post(environment.apiBaseUrl + '/catalog/new-category', category)
  }

  deleteCategory(id: number) {
    return this.http
      .delete(environment.apiBaseUrl + '/catalog/' + id)
  }
}
