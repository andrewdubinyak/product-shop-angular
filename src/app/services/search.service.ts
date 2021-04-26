import {Injectable, PipeTransform} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DecimalPipe} from "@angular/common";
import {debounceTime, delay, map, switchMap, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {Product} from "../models/product";
import {SortColumn, SortDirection} from "./sortable.directive";


interface SearchResult {
  products: Product[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: number | string | boolean, v2: number | string | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(products: Product[], column: SortColumn, direction: string):
  Product[] {
  if (direction === '' || column === '') {
    return products;
  } else {
    return [...products].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(product: Product, term: string, pipe: PipeTransform) {
  return product.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(product.weight).includes(term)
    || pipe.transform(product.price).includes(term);
}

@Injectable({providedIn: 'root'})
export class SearchService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _products$ = new BehaviorSubject<Product[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  PRODUCTS: any = []

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient,
              private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._products$.next(result.products);
      this._total$.next(result.total);
    });

    this._search$.next();
  }


  get products$() {
    return this._products$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  getAllProduct() {
    return this.http.get(environment.apiBaseUrl + '/product').pipe(map((res: any) => {
      this.PRODUCTS = res.products
      return res.products;
    }));
  }

  createProduct(payload: any) {
    return this.http.post(environment.apiBaseUrl + '/product/new-product', payload);
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let products = sort(this.PRODUCTS, sortColumn, sortDirection);

    // 2. filter
    products = products.filter(product => matches(product, searchTerm, this.pipe));
    const total = products.length;

    // 3. paginate
    products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({products, total});
  }
}


