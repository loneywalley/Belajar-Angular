// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DataUser } from '../app.entity';
// import { CustomDatePipe } from '../../Pipe/user-pipe';
// // import { GetService } from '../service/get-service.service';
// import { SnackBarService} from '../snackBar/snack-bar.service';
// // import { ApproutingModule } from '../app.routing.module';
// import { HttpServiceService } from '../service/http-service.service';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   standalone: true,
//   imports: [
//     CommonModule, CustomDatePipe
//   ],
//   styleUrl: './table.component.scss'
// })
// export class TableComponent {
//   // @Input() dataUsers: Array<{
//   //   name: string;
//   //   email: string;
//   //   address: {
//   //     zipcode: number;
//   //     city: string;
//   //     province: string;
//   //   }
//   //   paymentDate: Date;
//   //   checked: boolean;
//   // }> = [];

// @Input() dataUsers: Array<DataUser> = [];

//   constructor(private userData: HttpServiceService, private snackBarService : SnackBarService){}
  
//   deleteUser(id: number) {
//     const path = `endpoint/${id}`;
//     this.userData.deleteUser(path).subscribe(
//       response => {
//         console.log('Delete successful:', response);
//       },
//       error => {
//         console.error('Error:', error);
//       }
//     );
//   }
  
//     toggleCheck(index: number) {
//       // this.userData.toggleCheck(index);
//     }

//     trigger(message:string, action:string) 
//     { 
//      this.snackBarService.openSnackBar(message, action); 
//     }

    // isHighlight(datePayment: Date): boolean {
    //   const today = new Date();
    //   const diffInTime = today.getTime() - new Date(datePayment).getTime();
    //   const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    //   return diffInDays <= 3 && diffInDays >= -3;
    // }
//   }


// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../service/data.service';
// import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { HttpServiceService } from '../service/http-service.service';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   standalone: true,
//   imports: [CommonModule, MatSnackBarModule, RouterModule, RouterOutlet]
// })
// export class TableComponent implements OnInit {
//   data: any[] = [];
//   selectedRows = new Set<any>();

//   constructor(private apiService: HttpServiceService, private snackBar: MatSnackBar, private router: Router) { }

//   ngOnInit(): void {
//     this.loadData();
//   }

//   loadData(): void {
//     this.apiService.getData().subscribe(
//       (data) => this.data = data,
//       (error) => console.error('Error fetching data', error)
//     );
//   }

//   onEdit(id: number): void {
//     this.router.navigate([`/detail/${id}`]);
//   }

//   onAdd(): void {
//     this.router.navigate(['/add']);
//   }


//   onCheckboxChange(row: any, event: any) {
//     if (event.checked) {
//       this.selectedRows.add(row);
//     } else {
//       this.selectedRows.delete(row);
//     }
//   }

//   toggleAllRows(event: any) {
//     if (event.checked) {
//       this.data.forEach(row => this.selectedRows.add(row));
//     } else {
//       this.selectedRows.clear();
//     }
//   }

//   isChecked(row: any): boolean {
//     return this.selectedRows.has(row);
//   }

//   onDelete(id: number): void {
//     this.apiService.deleteData(id).subscribe(
//       () => {
//         this.loadData();
//         this.snackBar.open('Data deleted successfully', '', { duration: 2000 });
//       },
//       (error) => console.error('Error deleting data', error)
//     );
//   }

//   isHighlight(datePayment: Date): boolean {
//     const today = new Date();
//     const diffInTime = today.getTime() - new Date(datePayment).getTime();
//     const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
//     return diffInDays <= 3 && diffInDays >= -3;
//   }

// }


import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../service/http-service.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogoutComponent } from '../pages/logout/logout.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, RouterModule, RouterOutlet]
})
export class TableComponent implements OnInit {
  data: any[] = [];  // Define proper type if you know the structure
  selectedRows = new Set<any>();  // Use a specific type for better type safety

  constructor(
    private apiService: HttpServiceService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getData().pipe(
      catchError((error) => {
        console.error('Error fetching data', error);
        this.snackBar.open('Error loading data', '', { duration: 3000 });
        return new Observable<any[]>(); // Return an empty observable in case of error
      })
    ).subscribe(
      (data) => this.data = data
    );
  }

  onEdit(id: number): void {
    this.router.navigate([`/detail/${id}`]);
  }

  onAdd(): void {
    this.router.navigate(['/add']);
  }

  onCheckboxChange(row: any, event: any): void {
    if (event.checked) {
      this.selectedRows.add(row);
    } else {
      this.selectedRows.delete(row);
    }
  }

  toggleAllRows(event: any): void {
    if (event.checked) {
      this.data.forEach(row => this.selectedRows.add(row));
    } else {
      this.selectedRows.clear();
    }
  }

  isChecked(row: any): boolean {
    return this.selectedRows.has(row);
  }

  onDelete(id: number): void {
    this.apiService.deleteData(id).subscribe(
      () => {
        this.loadData();
        this.snackBar.open('Data deleted successfully', '', { duration: 2000 });
      },
      (error) => {
        console.error('Error deleting data', error);
        this.snackBar.open('Error deleting data', '', { duration: 3000 });
      }
    );
  }

  isHighlight(datePayment: Date): boolean {
    const today = new Date();
    const diffInTime = today.getTime() - new Date(datePayment).getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 3 && diffInDays >= -3;
  }

  logout(): void {
    this.router.navigate(['/logout']); // Navigate to the logout route
  }
}
