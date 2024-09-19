import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataUser } from './app.entity';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FormGroup, FormsModule, Validators, FormControl, NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { TableComponent } from './table/table.component';
// import { GetService } from './service/get-service.service';
import { HttpServiceService } from './service/http-service.service';
import { CustomDatePipe } from './Pipe/user-pipe';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   addUserForm: FormGroup;
//   title: string = ''
//   dataUser! : Array<DataUser>;

//   constructor()
//   {
//     this.title = 'latihan'
//     this.addUserForm = new FormGroup({
//       name: new FormControl('', [Validators.required, Validators.minLength(3)]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//       city: new FormControl('', [Validators.required]),
//       province: new FormControl('', [Validators.required]),
//       zipCode: new FormControl('', [Validators.required])
//     })
//   }
//   ngOnInit(): void {
//     this.dataUser = [{
//       name: 'tttttt',
//       email: 'ttttt@gmail.com',
//       address:
//       {
//         zipcode: 1,
//         city: 'dddddd',
//         province: 'aaaaaa'

//       }
//     }]
//   }
//   onSubmit(){
//     // console.log('For Data:', this.addUserForm.value)
//     this.dataUser.push(
//       {
//         name: this.addUserForm.get('name')?.value,
//         email: this.addUserForm.get('email')?.value,
//         address:
//         {
//           zipcode: this.addUserForm.get('zipCode')?.value,
//           city: this.addUserForm.get('city')?.value,
//           province: this.addUserForm.get('province')?.value,
  
//         }
//       }
//     )
//     // console.log(this.addUserForm.get('name')?.value)
//     // console.log(this.dataUser)
//   }
// }


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    CommonModule, 
    ButtonComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    InputComponent, 
    TableComponent, CustomDatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  addUserForm: FormGroup;
  dataUsers: Array<DataUser> = [];

  constructor(private getService: HttpServiceService) {
    this.addUserForm = this.createUserForm();
  }

  ngOnInit(): void {
    // this.dataUsers = this.getService.getUsers();
    this.fetchData();
  }

  createUserForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      province: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)]),
      paymentDate: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required])
    });
  }

  // submitForm(): void {
  //   if (this.addUserForm.valid) {
  //     // this.getService.addUser(this.addUserForm);
  //     // this.dataUsers = this.getService.getUsers(); }
  //   }
  // }
    fetchData(){
      this.getService.getData().subscribe((res: any) => {
        console.log(res)
        this.dataUsers = res
      }, (err: any) => {
        console.log("errorrrrrrrrr",err)
      })
    }

    createuser(){
      const payLoad = {
        "paymentDate": new Date,
        "userName": "create",
        "name": "nameless",
        "email": "email@createuser",
        "basicSalary": 12345678,
        "city": "cityless",
        "province": "provinceless",
        "zipCode": "zip123"
      }
    }

    submitData() {
      const data: DataUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        zipcode: '12345',
        city: 'Cityville',
        province: 'State',
        paymentDeadline: new Date,
        basicSalary: 12345,
        username: '',
        id: ''
      };
  
      this.getService.postData('',data).subscribe(
        (response: any) => {  
          console.log('Success:', response);
        },
        (error: any) => {  
          console.error('Error:', error);
        }
      );
    }
}