import { Task } from "./task";

export class Ticket {

    assignedTo!: number;
    category!: number;
    completeAt!: string;
    id!: number;
    name: string;
    description: string;
    weight!: number;
    status!: number;
    sprint!: number;
    project!: number;
    news!: Task[];
    progress!: Task[];
    complete!: Task[];
    createAt! : Date;
    
    constructor(des:string, name: string) {
        this.description =des;
        this.name =name;
    }
}