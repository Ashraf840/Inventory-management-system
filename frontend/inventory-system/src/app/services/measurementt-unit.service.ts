import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { MeasurementUnit } from '../interface/measurement-unit';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {

  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getList() : Observable<any[]> {
    return this.http.get<any[]>(this.url + 'product/measurement-unit/get');
  }

  retrieve(id:number) {
    return this.http.get<any>(this.url + 'product/measurement-unit/get/' + id);
  }

  add(m_unit: MeasurementUnit) {
    return this.http.post<MeasurementUnit>(this.url + 'product/measurement-unit/add', m_unit);
  }

  update(m_unit: MeasurementUnit) {
    return this.http.patch<MeasurementUnit>(this.url + 'product/measurement-unit/update', m_unit);
  }

  delete(id: number) {
    return this.http.delete(this.url + 'product/measurement-unit/delete/' + id);
  }
}
