import { Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { HomepageComponent } from './Components/homepage/homepage.component';

export const routes: Routes = [

    {path:"",component:LoginPageComponent},
    {path:"Homepage",component:HomepageComponent}
];
