// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { FormGroup } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpServiceService } from '../service/http-service.service';
// // import { ApproutingModule } from '../app.routing.module';

// @Component({
//   selector: 'app-input',
//   templateUrl: './input.component.html',
//   standalone: true, 
//   imports: [
//     CommonModule,
//     ReactiveFormsModule
//   ],
//   styleUrl: './input.component.scss'
// })
// export class InputComponent {
//   @Input() formGroup!: FormGroup;
//   @Output() onSubmit = new EventEmitter<void>();

//   submitData(){
//     this.onSubmit.emit();
//   }

// }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
// import { DataService } from '../service/data.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpServiceService } from '../service/http-service.service';

// @Component({
//   selector: 'app-input',
//   templateUrl: './input.component.html',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterModule, RouterOutlet],
// })
// export class InputComponent implements OnInit {
//   form: FormGroup;
//   isEditMode = false;
//   id: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private apiService: HttpServiceService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {
//     this.form = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       city: ['', Validators.required],
//       province: ['', Validators.required],
//       zipcode: ['', Validators.required],
//       basicSalary: ['', Validators.required],
//       userName: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id) {
//         this.id = +id;
//         this.isEditMode = true;
//         this.loadData();
//       }
//     });
//   }

//   loadData(): void {
//     if (this.id) {
//       this.apiService.getDataById(this.id).subscribe(
//         (data) => this.form.patchValue(data),
//         (error) => console.error('Error fetching data', error)
//       );
//     }
//   }

//   onSubmit(): void {
//     if (this.isEditMode) {
//       this.apiService.updateData(this.id!, this.form.value).subscribe(
//         () => this.onSuccess('Data updated successfully'),
//         (error) => console.error('Error updating data', error)
//       );
//     } else {
//       this.apiService.addData(this.form.value).subscribe(
//         () => this.onSuccess('Data added successfully'),
//         (error) => console.error('Error adding data', error)
//       );
//     }
//   }

//   onSuccess(message: string): void {
//     this.snackBar.open(message, '', { duration: 2000 });
//     this.router.navigate(['/']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from '../service/http-service.service';
import { LogoutComponent } from '../pages/logout/logout.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, RouterOutlet],
})
export class InputComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: HttpServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],
      basicSalary: ['', Validators.required],
      username: ['', Validators.required],  // Ensure this matches the API data structure
      paymentDeadline: ['', Validators.required]  // Assuming you want to capture paymentDeadline
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode by checking if there's an ID in the route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.isEditMode = true;
        this.loadData();  // Load data if in edit mode
      }
    });
  }

  loadData(): void {
    // Load data based on the ID from the API and patch the form
    if (this.id) {
      this.apiService.getDataById(this.id).subscribe(
        (data) => this.form.patchValue(data),
        (error) => console.error('Error fetching data', error)
      );
    }
  }

  onSubmit(): void {
    // Ensure the form is valid before submission
    if (this.form.invalid) {
      return;
    }

    // Handle form submission for both edit and add modes
    if (this.isEditMode) {
      // Update data if we're in edit mode
      this.apiService.updateData(this.id!, this.form.value).subscribe(
        () => this.onSuccess('Data updated successfully'),
        (error) => console.error('Error updating data', error)
      );
    } else {
      // Add new data if we're in add mode
      this.apiService.addData(this.form.value).subscribe(
        () => this.onSuccess('Data added successfully'),
        (error) => console.error('Error adding data', error)
      );
    }
  }

  onSuccess(message: string): void {
    // Show success message and navigate back to the main page
    this.snackBar.open(message, '', { duration: 2000 });
    this.router.navigate(['/']);
  }

  logout(): void {
    this.router.navigate(['/logout']); // Navigate to the logout route
  }

}
