import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataUser } from '../app.entity';
import { CustomDatePipe } from '../Pipe/user-pipe';
import { GetService } from '../service/get-service.service';
import { SnackBarService} from '../snackBar/snack-bar.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    CommonModule, CustomDatePipe
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
    paymentDate: Date;
    checked: boolean;
  }> = []
  todayDate: Date = new Date();
  constructor(private userData: GetService, private snackBarService : SnackBarService){}
    deleteUser(index: number) {
      this.userData.deleteUser(index);
    }
  
    toggleCheck(index: number) {
      this.userData.toggleCheck(index);
    }

    trigger(message:string, action:string) 
    { 
     this.snackBarService.openSnackBar(message, action); 
    }

    dateDifference(date: Date): number{
      const res = this.todayDate.getDate() - date.getDate();
      return res
    }
  }
