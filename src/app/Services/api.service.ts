import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Employee } from '../Components/Models/claimmodels';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
User:Employee={
  today: '',
  username: '',
  employeeCode: '',
  purposePlace: '',
  companyPlant: '',
  costCenter: '',
  venderCost: ''
}
displayName: string='';
  constructor(private http:HttpClient) {
this.loadUserFromSession();

   }
   private USER_NAME_API = 'https://graph.microsoft.com/v1.0/me';
  baseurl='https://localhost:7283/api/Employee';
claimUrl='https://localhost:7283/api/RecentClaim';

  Login(data:any):Observable<any>{
    return this.http.post(`${this.baseurl}/Login`,data)
  }
//  private currentUserSubject = new BehaviorSubject<any>(null);
//  currentUser$ = this.currentUserSubject.asObservable();

//  setUser(user: any) {
//    this.currentUserSubject.next(user);
//  }
 loadUserFromSession() {
   const user = sessionStorage.getItem('User');
   if (user) {
    const userObj = JSON.parse(user);
    const User=userObj.res;

    this.User.username=User.name;
  this.User.employeeCode=User.empCode;
  this.User.venderCost=User.venderCost;
  this.User.costCenter=User.costCenter;
  this.User.companyPlant="Nordex"
       // convert string → object
console.log("USers from session ",userObj)
  console.log("USers",this.User);
   }
 }
//  getCurrentUser() {
//    return this.currentUserSubject.value;
//  }
 
GetEmployee(){
  const user=sessionStorage.getItem('Employee');
   if (user) {
    const userObj = JSON.parse(user);
    this.User=userObj.res;}
}
GetEmployeewithClaim(Empcode:string){
return this.http.get(`${this.baseurl}/Employee/${Empcode}`)
}


createClaim(empCode: string, dto: any): Observable<any> {
  return this.http.post(
    `${this.claimUrl}/create/${empCode}`,
    dto
  );
}

// private async loadUser(): Promise<void> {
//     try {
//       // If you're using Windows SSO, withCredentials is required
//       const user = await firstValueFrom(
//         this.http.get<Response>(this.USER_NAME_API, { withCredentials: true })
//       );
//       this.displayName = user.displayName;
//     } catch (err) {
//       console.error('Failed to load user', err);
//       this.displayName = null; // fail safe
//     }
//   }
user() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.USER_NAME_API).subscribe({
        next: (user: any) => {
          resolve(user.displayName);
               console.log("Displayname",user);
        },
   
        error: (error) => {
          console.error(error);
          reject(error);
        },
      });
    });
  }
}