import { RolDto } from "./rol";

export class UserDto {
    config!:string;
    createAt!:string;
    createUser!:number;
    id!:number;
    roles!: RolDto[];
    status!: number;
    updateAt!: string;
    updateUser!: string;
    username!: string;
}