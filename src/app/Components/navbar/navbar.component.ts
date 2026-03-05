import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 user: any;
  showDropdown = false;

  constructor(
    private authService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user.Name; // Assuming the user object has a 'Name' property
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {

    // 🔥 Clear everything
    localStorage.clear();
    sessionStorage.clear();

    this.authService.logout();

    // 🔥 Redirect to login
    this.router.navigate(['/login']);
  }


}
