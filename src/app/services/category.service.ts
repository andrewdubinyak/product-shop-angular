import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Category} from '../models/category';
import {ActivatedRoute} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllCategory(): any {
    return this.http.get<Category[]>(environment.apiBaseUrl + '/catalog');
  }

  getById(id: ActivatedRoute | null): any {
    return this.http.get(environment.apiBaseUrl + '/catalog/' + id)
      .pipe(map(res => {
        return {
          // @ts-ignore
          name: res.category.name,
          // @ts-ignore
          image: res.category.image.originalImageUrl
        };
      }));

  }

  createCategory(category: any) {
    return this.http.post(environment.apiBaseUrl + '/catalog/new-category', category);
  }

  updateCategory(id: ActivatedRoute | null, category: any) {
    return this.http.put(environment.apiBaseUrl + '/catalog/' + id, category);
  }

  deleteCategory(id: number) {
    return this.http
      .delete(environment.apiBaseUrl + '/catalog/' + id);
  }
}
