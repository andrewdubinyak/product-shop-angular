import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SubCategoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllSubcategory() {
    return this.http.get(environment.apiBaseUrl + '/subcategory');
  }

  createSubcategory(subcategory: any) {
    return this.http.post(environment.apiBaseUrl + '/subcategory/new-subcategory', subcategory);
  }
}


