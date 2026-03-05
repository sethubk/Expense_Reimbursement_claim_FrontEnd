import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

empcode: string = '';
 password: string = '';
 rememberMe: boolean = false;
 errorMessage: string = '';
 constructor(private authService: ApiService,
             private router: Router) {}
 onLogin() {
   const loginData = {
     empcode: this.empcode,
     password: this.password
   };
   this.authService.Login(loginData).subscribe({
     next: (res: any) => {
       if (this.rememberMe) {
         localStorage.setItem('token', res.token);
       } else {
         sessionStorage.setItem('token', res.token);
       }
       this.router.navigate(['/dashboard']);
       console.log("success",res)
     },
     error: (err) => {
       this.errorMessage = err.error.message || 'Invalid Login';
     }
   });
 }
}