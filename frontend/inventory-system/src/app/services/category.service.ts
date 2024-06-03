import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interface/product/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getList() : Observable<any[]> {
    return this.http.get<any[]>(this.url + 'product/category/get');
  }

  retrieve(id:number) {
    return this.http.get<any>(this.url + 'product/category/get/' + id);
  }

  add(category: any) {
    return this.http.post<any>(this.url + 'product/category/add', category);
  }

  update(category: any) {
    return this.http.patch<Category>(this.url + 'product/category/update', category);
  }
  
  delete(id: number) {
    return this.http.delete(this.url + 'product/category/delete/' + id);
  }
}
