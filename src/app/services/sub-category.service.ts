import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class SubCategoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllSubcategory() {
    return this.http.get(environment.apiBaseUrl + '/subcategory').pipe(map((res: any) => {
      return res.subcategories
    }));
  }

  createSubcategory(subcategory: any) {
    return this.http.post(environment.apiBaseUrl + '/subcategory/new-subcategory', subcategory);
  }
}


