import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../interface/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getList() : Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url + 'supplier/get');
  }

  retrieve(id:number) {
    return this.http.get<Supplier>(this.url + 'supplier/get/' + id);
  }

  add(supplier: Supplier) {
    return this.http.post<any>(this.url + 'supplier/add', supplier);
  }

  update(supplier: Supplier) {
    return this.http.patch<Supplier>(this.url + 'supplier/update', supplier);
  }
  
  delete(id: number) {
    return this.http.delete(this.url + 'supplier/delete/' + id);
  }
}
