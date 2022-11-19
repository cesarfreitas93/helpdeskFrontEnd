export class PersonReqDto {
    username!: string;
    password!: string;
    roles!: string[];
    name!: string;
    doctype: number = 1;
    docnumber!: string;
}