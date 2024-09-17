export interface DataUser{
    name: string
    email: string
    address : Address
}

interface Address{
    zipcode : number
    city : string
    province : string
}