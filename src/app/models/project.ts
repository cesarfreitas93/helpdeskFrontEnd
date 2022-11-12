export class Project {
    createAt!: string;
    id!: number;
    name: string;
    description: string;
    status: number | undefined;
    config!: string;
    files!:string;

    constructor(name:string, descrip:string) {
        this.name = name;
        this.description = descrip;
    }
}
