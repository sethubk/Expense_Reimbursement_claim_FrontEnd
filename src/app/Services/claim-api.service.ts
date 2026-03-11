import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimApiService {

  constructor(private http:HttpClient) { }

  baseurl='https://localhost:7283/api/RecentClaim';
  
  
 getClaimByEmpCode(empCode: string): Observable<any> {
    return this.http.get(`${this.baseurl}/claimBycode/${empCode}`);
  }


}
