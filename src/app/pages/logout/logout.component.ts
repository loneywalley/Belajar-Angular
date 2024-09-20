import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service'; // Adjust the import path as necessary
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class LogoutComponent {
  constructor(private authService: AuthenticationService, private router: Router, private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logout(); // Clear the token
    this.snackBar.open('You have been logged out.', '', { duration: 2000 }); // Show snackbar message
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
}