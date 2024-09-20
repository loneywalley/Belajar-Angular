import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class LogoutComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logout(); // Ensure you have a logout method in your AuthenticationService
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
}