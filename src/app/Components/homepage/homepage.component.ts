import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule ,NgForm} from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { Employee } from '../Models/claimmodels';
import { ClaimApiService } from '../../Services/claim-api.service';
import '@cds/core/progress-circle/register.js';


export interface Expense {
  type: 'International' | 'Domestic' | '' | string;
  date?: Date | null;
  purpose?: string;
  amount?: number | null;
  status: 'In progress' | 'Approved' | 'Rejected' | string;
  expense?: string;
}
export interface Personal{
 today:string;
  username:string;
  employeeCode:string;  
  purposePlace:string;  
  companyPlant : string;
  costCenter:  string;
  vendorCode: string;
}
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,ClarityModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
constructor(private api:ApiService,private router:Router,private ClaimApi:ClaimApiService){}
username:string='';
showPersonalModal = false;



empcode :string ='';
dataSource:Expense[]=[
 ];
 
User:Employee={
  today: '',
  username: '',
  employeeCode: '',
  purposePlace: '',
  companyPlant: '',
  costCenter: '',
  venderCost: '',
 
};

loading = false;
pendingCalls = 0;


  ngOnInit(){
   
    this.loading = true; 
    const now = new Date();
    const today= now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    

   this.User=this.api.User;
   this.User.today=today 
this.empcode=this.User.employeeCode;
// this.pendingCalls = 2;
// this.getClaimUsingEmpCode();

// this.getEmployees();
this.getclaim();
// this.getFetchclaims();



}


decreasePending() {
  this.pendingCalls--;
  if (this.pendingCalls === 0) {
    this.loading = false;  // hide spinner
  }
}




getClaimUsingEmpCode() {
    // or this.empCode from form
  
  this.ClaimApi.getClaimByEmpCode(this.empcode).subscribe({
    next: (res) => {
      console.log("Claim by Code:", res);
     
    },
    error: (err) => {
      console.error("Error fetching claim:", err);
    }
    
// complete: () => {
//       this.decreasePending();
//     }

  });
}

getclaim(){
  this.api.GetEmployeewithClaim(this.empcode).subscribe(

  res=>{
  console.log("Claims",res);
 this.dataSource=(res as any).recentClaims;
 this.dataSource = this.dataSource.filter(c => c.status !== 'Draft' && c.amount!>0 );
    }
  )
}
selectedCategory: string | null = null;
goToPersonalDetails(category: string){
  // localStorage.setItem('selectedCategory', category);
  // this.router.navigate(['/personal'])

this.selectedCategory = category;
    this.showPersonalModal = true;

}
onPersonalNext(form:NgForm) {
  //store the dates in 
    if (form.valid) {
    this.User.purposePlace=this.User.purposePlace;
    sessionStorage.setItem('Employee',JSON.stringify(
      
      this.User));
      const today = new Date().toISOString().split('T')[0];

         const dto={
  Type:this.selectedCategory,
  Purpose:this.User.purposePlace,
  Date:today,
  Amount:0,
  Status:"Draft",
}

  this.showPersonalModal = false;
  if(this.selectedCategory === 'Expense') {
    this.router.navigate(['/Expense'])
  } 
   if(this.selectedCategory === 'InternationalTravels') {
    this.router.navigate(['/international, claimId'])}
     if(this.selectedCategory === 'DomesticTravels') {
    this.router.navigate(['/domestic, claimId'])}
    debugger
 this.api.createClaim(this.empcode,dto).subscribe(
  res=>{
console.log("claim created ",res);
  const claimId = res.recentClaimId;
   localStorage.setItem('lastClaimId', claimId)
})
console.log("Formsubmitted",this.User)

}

}
//displayedColumns: string[] = ['type', 'createdDate', 'purposePlace', 'amount', 'status', 'expense'];

getStatusClass(status: string): string {
  switch (status) {
    case 'Approved':
      return 'badge badge-success';
    case 'Pending':
      return 'badge badge-warning';
    case 'Rejected':
      return 'badge badge-danger';
    default:
      return 'badge badge-info';
  }
}

reset(){
this.User.purposePlace=  ''
}
}
