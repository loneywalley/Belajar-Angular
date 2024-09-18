export interface DataUser{
    checked: boolean
    name: string
    email: string
    address : Address
    paymentDate: Date
}

interface Address{
    zipcode : number
    city : string
    province : string
}