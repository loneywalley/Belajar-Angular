// export interface DataUser{
//     checked: boolean
//     name: string
//     email: string
//     address : Address
//     paymentDate: Date
// }

// interface Address{
//     zipcode : number
//     city : string
//     province : string
// }


export interface DataUser{
    paymentDeadline: Date;
    username:        string;
    name:            string;
    email:           string;
    city:            string;
    province:        string;
    basicSalary:     number;
    zipcode:         string;
    isChecked?:       boolean;
    id:              string;
}