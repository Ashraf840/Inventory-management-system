import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getList(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'product/get');
  }

  retrieve(id:number) {
    return this.http.get<any>(this.url + 'product/get/' + id);
  }

  add(product: any) {
    return this.http.post<any>(this.url + 'product/add', product);
  }

  update(product: any) {
    return this.http.patch<any>(this.url + 'product/update', product);
  }
  
  delete(id: number) {
    return this.http.delete(this.url + 'product/delete/' + id);
  }
}
