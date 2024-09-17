import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataUser } from './app.entity';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { TableComponent } from '../table/table.component';


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
    // this.addUserForm = new FormGroup({
    //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   city: new FormControl('', [Validators.required]),
    //   province: new FormControl('', [Validators.required]),
    //   zipCode: new FormControl('', [Validators.required])
    // })
//   }
  // ngOnInit(): void {
  //   this.dataUser = [{
  //     name: 'tttttt',
  //     email: 'ttttt@gmail.com',
  //     address:
  //     {
  //       zipcode: 1,
  //       city: 'dddddd',
  //       province: 'aaaaaa'

  //     }
  //   }]
  // }
//   onSubmit(){
//     // console.log('For Data:', this.addUserForm.value)
    // this.dataUser.push(
    //   {
    //     name: this.addUserForm.get('name')?.value,
    //     email: this.addUserForm.get('email')?.value,
    //     address:
    //     {
    //       zipcode: this.addUserForm.get('zipCode')?.value,
    //       city: this.addUserForm.get('city')?.value,
    //       province: this.addUserForm.get('province')?.value,
  
    //     }
    //   }
    // )
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
    TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  addUserForm: FormGroup;
  dataUsers! : Array<DataUser>;

  constructor(
  ) {
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), 
        Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      province: new FormControl('', [Validators.required, 
        Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      zipCode: new FormControl('', [Validators.required, 
        Validators.pattern('[0-9]*$'), 
        Validators.minLength(5), 
        Validators.maxLength(5)])
    })
  }

  submitForm() {
    this.dataUsers.push(
      {
        name: this.addUserForm.get('name')?.value,
        email: this.addUserForm.get('email')?.value,
        address:
        {
          zipcode: this.addUserForm.get('zipCode')?.value,
          city: this.addUserForm.get('city')?.value,
          province: this.addUserForm.get('province')?.value,
  
        }
      }
    )
  }

  ngOnInit(): void {
    this.dataUsers = [{
      name: 'tttttt',
      email: 'ttttt@gmail.com',
      address:
      {
        zipcode: 1,
        city: 'dddddd',
        province: 'aaaaaa'

      }
    }]
  }
}
