import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule ,NgForm} from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { Employee } from '../Models/claimmodels';

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
constructor(private api:ApiService,private router:Router){}

showPersonalModal = false;

personl:Personal={
  today:  '',
  username:  '',
  employeeCode:  '',
  purposePlace:  '',
  companyPlant : '',
  costCenter:  '',
  vendorCode:  '',
  
}


empcode :string ='emp001';
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

  ngOnInit(){
    
    const now = new Date();
    const today= now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
//  const User=this.api.User.res;
//  console.log("Users from home",User)
//  if(User){
//   this.personl.username=User.name;
//   this.personl.employeeCode=User.empCode;
//   this.personl.vendorCode=User.venderCost;
//   this.personl.costCenter=User.costCenter;
//   this.personl.companyPlant="Nordex"
//   }
 this.User=this.api.User;
 this.User.today=today; 
console.log(this.User=this.api.User

  
);



// this.getEmployees();
// this.getclaim();
// this.getFetchclaims();



}


// getclaim(){
//   this.api.GetEmployeewithClaim(this.empcode).subscribe(

//     res=>{
// console.log("Claims",res);
// this.dataSource=(res as any).recentClaims;
//     }
//   )
// }


getExpense() {

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
console.log("Formsubmitted",this.User)
  this.showPersonalModal = false;
  if(this.selectedCategory === 'Expense') {
    this.router.navigate(['/expense'])
  } 
   if(this.selectedCategory === 'InternationalTravels') {
    this.router.navigate(['/international'])}
     if(this.selectedCategory === 'DomesticTravels') {
    this.router.navigate(['/domestic'])}
    const dto={
  Type:this.selectedCategory,
  

  
  Purpose:this.personl.purposePlace,
  Amount:0,
  Status:"Pending",
}
// this.api.createClaim(this.empcode,dto).subscribe(
//   res=>{
// console.log("claim created ",res);
  
// })

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
  this.personl={
  today: this.personl.today,
  username:  '',
  employeeCode:  '',
  purposePlace:  '',
  companyPlant : '',
  costCenter:  '',
  vendorCode:  '',
  
}}
}
