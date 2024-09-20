// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { DataUser } from '../app.entity';
// import { Observable } from 'rxjs/internal/Observable';
// @Injectable({
//   providedIn: 'root'
// })
// export class HttpServiceService {
//   private apiUrl = 'https://66ebb51a2b6cf2b89c5b5bf7.mockapi.io/testingangular/data_dummy';

//   constructor(private http: HttpClient) { }

//   getData(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getDataById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

//   addData(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, data);
//   }

//   updateData(id: number, data: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${id}`, data);
//   }

//   deleteData(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataUser } from '../app.entity';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private apiUrl = 'https://66ebb51a2b6cf2b89c5b5bf7.mockapi.io/testingangular/data_dummy';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<DataUser[]> {
    return this.http.get<DataUser[]>(this.apiUrl).pipe(
      catchError(this.handleError<DataUser[]>('getData', []))
    );
  }

  getDataById(id: number): Observable<DataUser> {
    return this.http.get<DataUser>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<DataUser>('getDataById'))
    );
  }

  addData(data: DataUser): Observable<DataUser> {
    return this.http.post<DataUser>(this.apiUrl, data, this.httpOptions).pipe(
      catchError(this.handleError<DataUser>('addData'))
    );
  }

  updateData(id: number, data: DataUser): Observable<DataUser> {
    return this.http.put<DataUser>(`${this.apiUrl}/${id}`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateData'))
    );
  }

  deleteData(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<{}>('deleteData'))
    );
  }

  // Handle HTTP errors (optional, can modify as needed)
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable(observer => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }
}
