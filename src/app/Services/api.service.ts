import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  baseurl='https://localhost:7283/api/Auth';

  Login(data:any):Observable<any>{
    return this.http.post(`${this.baseurl}/Login`,data)
  }

  private currentUserSubject=new BehaviorSubject<any>(null);
 public currentUser$=this.currentUserSubject.asObservable()

setUserFromToken(token: string) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const user = {
    empcode: payload.Empcode,
    name: payload.unique_name
  };
  this.currentUserSubject.next(user);
}
loadUserFromStorage() {
  const token = localStorage.getItem('token');
  if (token) {
    this.setUserFromToken(token);
  }
}
logout() {
  localStorage.removeItem('token');
  this.currentUserSubject.next(null)

}
}