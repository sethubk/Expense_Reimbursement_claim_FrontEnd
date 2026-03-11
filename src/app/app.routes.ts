import { Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { ExpenseComponent } from './Components/Expense/expense/expense.component';

export const routes: Routes = [

    {path:"",component:LoginPageComponent},
    {path:"Homepage",component:HomepageComponent},
    {path:"Expense",component:ExpenseComponent}
];
