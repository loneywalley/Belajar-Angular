import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { DataUser } from '../app.entity';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private apiUrl = 'https://66ebb51a2b6cf2b89c5b5bf7.mockapi.io/testingangular/data_dummy';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.apiUrl)
  }

  createUser(payLoad: DataUser){
    return this.http.post(this.apiUrl, payLoad)
  }

  postData(path: string, body: DataUser): Observable<any> { 
    const url: string = `${this.apiUrl}`;
    return this.http.post<any>(url, body);
}
}