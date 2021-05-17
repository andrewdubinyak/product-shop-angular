import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


export interface SubCategory {
  category?: number;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SubCategoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllSubcategory(): any {
    return this.http.get(environment.apiBaseUrl + '/sub-categories');
  }

}


