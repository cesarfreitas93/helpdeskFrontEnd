import { UserDto } from "./user";
export class PersonDto {
    dateOfBirth!:string;
    docnumber!:string;
    doctype!:number;
    id!:number;
    name!:string;
    user!: UserDto;
}