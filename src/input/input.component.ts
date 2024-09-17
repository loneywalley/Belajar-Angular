import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() formGroup!: FormGroup;
  @Output() onSubmit = new EventEmitter<void>();

  submitForm() {
    this.onSubmit.emit();
  }
}
