import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  baseurl='https://localhost:7283/api/Auth';

  Login(data:any):Observable<any>{
    return this.http.post(`${this.baseurl}/Login`,data)
  }

}
