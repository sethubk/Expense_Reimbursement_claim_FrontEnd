import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { Employee, FormDataModel } from '../../Models/claimmodels';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ClarityModule,CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
constructor(private api:ApiService,private router:Router){}
 
personalData: Employee={ 
   today: '',
  username: '',
  employeeCode: '',
  purposePlace: '',
  companyPlant: '',
  costCenter: '',
  venderCost: '',
 
};
 ngOnInit(){
   this.personalData=this.api.User;
 }
}
