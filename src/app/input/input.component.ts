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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from '../service/http-service.service';

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
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],
      basicSalary: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.isEditMode = true;
        this.loadData();
      }
    });
  }

  loadData(): void {
    if (this.id) {
      this.apiService.getDataById(this.id).subscribe(
        (data) => this.form.patchValue(data),
        (error) => console.error('Error fetching data', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.apiService.updateData(this.id!, this.form.value).subscribe(
        () => this.onSuccess('Data updated successfully'),
        (error) => console.error('Error updating data', error)
      );
    } else {
      this.apiService.addData(this.form.value).subscribe(
        () => this.onSuccess('Data added successfully'),
        (error) => console.error('Error adding data', error)
      );
    }
  }

  onSuccess(message: string): void {
    this.snackBar.open(message, '', { duration: 2000 });
    this.router.navigate(['/']);
  }
}
