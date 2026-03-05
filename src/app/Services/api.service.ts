import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
this.restoreUser();
   }
  baseurl='https://localhost:7283/api/Auth';

  Login(data:any):Observable<any>{
    return this.http.post(`${this.baseurl}/Login`,data)
  }

  private currentUserSubject=new BehaviorSubject<any>(null);
 public currentUser$=this.currentUserSubject.asObservable()
setUserFromToken(token: string) {

  const payload: any = JSON.parse(atob(token.split('.')[1]));

  const user = {
    empCode: payload.EmpCode,
    name: payload.Name,      // ClaimTypes.Name
    department: payload.Department,
    role: payload.Role,             // ClaimTypes.Role
    email: payload.Email,           // ClaimTypes.Email
    venderCost: payload.VenderCost,
    costCenter: payload.CostCenter
  };

  this.currentUserSubject.next(user);

  // Store token only (recommended)
  localStorage.setItem('token', token);
}
  // 🔥 Auto restore after refresh
  loadUserFromStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setUserFromToken(token);
    }
  }
  restoreUser() {
  const token = localStorage.getItem('token');
  if (token) {
    this.setUserFromToken(token);
  }
}
isLoggedIn(): boolean {
  return this.currentUserSubject.value != null;
}
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

}