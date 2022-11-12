export class Task {
    assignedTo!: string;
    completeAt!: string;
    completeUser!: string;
    createAt!: string;
    createUser!: string;
    description : string;
    files!: string;
    id!:number;
    ticket!: number;
    status!: number;
    updateAt!: string;
    updateUser!:string;
    name :string;

    constructor(des:string, name: string) {
        this.description =des;
        this.name =name;
    }
}

