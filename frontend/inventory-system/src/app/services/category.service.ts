import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getList() : Observable<any[]> {
    return this.http.get<any[]>(this.url + 'product/category/get');
  }
}
