import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataUser } from '../app.entity';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() dataUsers: Array<{
    name: string;
    email: string;
    address: {
      zipcode: number;
      city: string;
      province: string;
    }
  }> = []
}
