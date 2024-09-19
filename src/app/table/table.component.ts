import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataUser } from '../app.entity';
import { CustomDatePipe } from '../Pipe/user-pipe';
// import { GetService } from '../service/get-service.service';
import { SnackBarService} from '../snackBar/snack-bar.service';
// import { ApproutingModule } from '../app.routing.module';
import { HttpServiceService } from '../service/http-service.service';

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
  // @Input() dataUsers: Array<{
  //   name: string;
  //   email: string;
  //   address: {
  //     zipcode: number;
  //     city: string;
  //     province: string;
  //   }
  //   paymentDate: Date;
  //   checked: boolean;
  // }> = [];

@Input() dataUsers: Array<DataUser> = [];

  constructor(private userData: HttpServiceService, private snackBarService : SnackBarService){}
    deleteUser(index: number) {
      // this.userData.deleteUser(index);
    }
  
    toggleCheck(index: number) {
      // this.userData.toggleCheck(index);
    }

    trigger(message:string, action:string) 
    { 
     this.snackBarService.openSnackBar(message, action); 
    }

    isHighlight(datePayment: Date): boolean {
      const today = new Date();
      const diffInTime = today.getTime() - new Date(datePayment).getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      return diffInDays <= 3 && diffInDays >= -3;
    }
  }
