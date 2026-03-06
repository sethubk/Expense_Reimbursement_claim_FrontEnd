import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
User:any={}
  constructor(private http:HttpClient) {
this.loadUserFromSession();
   }
  baseurl='https://localhost:7283/api/Auth';

  Login(data:any):Observable<any>{
    return this.http.post(`${this.baseurl}/Login`,data)
  }
 private currentUserSubject = new BehaviorSubject<any>(null);
 currentUser$ = this.currentUserSubject.asObservable();

 setUser(user: any) {
   this.currentUserSubject.next(user);
 }
 loadUserFromSession() {
   const user = sessionStorage.getItem('User');
   if (user) {
    const userObj = JSON.parse(user);   // convert string → object
console.log("USers from session ",userObj)
    this.User = userObj
   }
 }
 getCurrentUser() {
   return this.currentUserSubject.value;
 }
 



}