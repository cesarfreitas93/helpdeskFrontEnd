import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/models/response';
import { BoardService } from 'src/app/services/board.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Ticket } from 'src/app/models/ticket';
import { Task } from 'src/app/models/task';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumStatus } from '../../constant/EnumStatus';
import { ParametersService } from 'src/app/services/parameters.service';
import { StatusDto } from 'src/app/models/status';
import { CategoriesDto } from 'src/app/models/categories';
import { SprintService } from 'src/app/services/sprint.service';
import { SprintDto } from 'src/app/models/sprint';
import { PersonDto } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { FormControl } from '@angular/forms';

export interface TaskData {
  id: number;
  taskResponse: Partial<Task> 
}

export interface TicketData {
  id : number;
  ticket: Ticket;
  sprintId: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;
  
  id!: number;
  response:Response = new Response();
  tickets:Ticket[] = new Array;
  sprints:SprintDto[] = new Array;
  task!: Task;
  ticket: Ticket = new Ticket("","");
  persons: PersonDto[] = new Array;
  sprintDefalut: SprintDto = new SprintDto();
  personDefault: PersonDto = new PersonDto();
  personCtrl = new FormControl;

  constructor(
    private boardService: BoardService,
    private router:Router,
    private sprintService:SprintService,
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private personService: PersonService
  ) { }

  loadSprints(){
    this.sprintService.getSprint().subscribe(response =>{
      this.sprints = response.data.content;
      console.log(this.sprints)
      let sprintDefaultId = localStorage.getItem('gestion-soporte-ti-default-sprint')
      if (sprintDefaultId == undefined || sprintDefaultId == '' || sprintDefaultId == null) {
        this.sprintDefalut = this.sprints[0];
      } else {
        this.sprintDefalut.id = Number(sprintDefaultId);
      }
      this.getSprintById(this.sprintDefalut.id);
      this.loadPersons();
    },error => console.log(error));
  }

  getSprintById(id:number) {
    this.sprintService.getSprintById(id).subscribe(result => {
      this.sprintDefalut = result.data;
    }, error => console.log(error));
  }

  loadBoard() {
    console.log(this.id, this.sprintDefalut.id, this.personDefault.id)
    this.boardService.getBoardByProjectAndSprint(this.id, this.sprintDefalut.id, this.personDefault.id).subscribe(response =>{
      this.response = response;
      this.tickets = response.data.content;
      console.log(this.tickets)
    },error => console.log(error));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadSprints();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateTaskStatusAfterDragDrop(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openDialog(idTicket:number): void {
    const dialogRef = this.dialog.open(FormTaskModal, {
      data: {id: idTicket, task: this.task}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.tickets);
      console.log(result)
      let typeResult = typeof result;
      console.log(typeResult);
      if (typeResult === 'undefined') {return;}
      if (typeResult === 'string') {return;}
      if (result.code === 1) {
        const resultado = this.tickets.find( ticket => ticket.id === result.data.ticket );
        console.log(resultado);
        this.tickets.find( ticket => ticket.id === result.data.ticket )?.news.unshift(result.data);
      }
    });
  }

  openTicketForm(): void {
    const dialogRef = this.dialog.open(FormTicketModal, {
      data: {id: this.id, ticket: new Ticket("",""), sprintId: this.sprintDefalut.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      let typeResult = typeof result;
      console.log(typeResult);
      if (typeResult === 'undefined') {return;}
      if (typeResult != 'string') {
        this.tickets.unshift(result);
      }
    });
  }

  private updateTaskStatusAfterDragDrop(event: CdkDragDrop<Task[], Task[]>) {

    let idTask = Number(event.item.element.nativeElement.id);
    let idStatus : number;
    if (event.container.element.nativeElement.classList.contains("board-d-news")) {
      idStatus = 3;
    } else if (event.container.element.nativeElement.classList.contains("board-d-progress")) {
      idStatus = 1;
    } else if (event.container.element.nativeElement.classList.contains("board-d-complete")) {
      idStatus = 5;
    }
    
    this.boardService.getTaskById(idTask).subscribe(
        response => {
          this.updateTaskStatus(idTask, response.data, idStatus);
        }
    );
  }

  private updateTaskStatus(idTask:number, task: Task, idStatus: number): void {
    task.status = idStatus;
    this.boardService.updateTask(idTask, task).subscribe();
  }

  selectSprint(event:Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.sprintDefalut.id = Number((event.target as HTMLSelectElement).value);
    localStorage.setItem('gestion-soporte-ti-default-sprint', (event.target as HTMLSelectElement).value);
    this.tickets = new Array;
    this.getSprintById(this.sprintDefalut.id);
    this.loadBoard();
  }

  loadPersons() {
    this.personService.getPersons().subscribe(result => {
      this.persons = result.data.content;
      let personDefaultId = localStorage.getItem('gestion-soporte-ti-default-person')
      if (personDefaultId == undefined || personDefaultId == '' || personDefaultId == null) {
        this.personDefault = this.persons[0];
      } else {
        this.personDefault.id = Number(personDefaultId);
      }
      this.loadBoard();
    },error => console.log(error));
  }

  selectPerson(event:Event) {
    console.log((event.target as HTMLSelectElement).value);
    localStorage.setItem('gestion-soporte-ti-default-person', (event.target as HTMLSelectElement).value);
    this.personDefault.id = Number((event.target as HTMLSelectElement).value);
    this.loadBoard();
  }
}

@Component({
  selector: 'app-task-modalForm',
  templateUrl: './new-task-modal.html',
})
export class FormTaskModal implements OnInit {

  task: Task = new Task("","");
  persons: PersonDto[] = new Array;
  personDefault: PersonDto = new PersonDto();

  constructor (
    private boardService:BoardService,
    private snack:MatSnackBar,
    public dialogRef: MatDialogRef<FormTaskModal>,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data:TaskData,
    ) {}

    ngOnInit(): void {
      this.loadPersons();
    }

    loadPersons() {
      this.personService.getPersons().subscribe(result => {
        this.persons = result.data.content;
        let personDefaultId = localStorage.getItem('gestion-soporte-ti-default-person')
        if (personDefaultId == undefined || personDefaultId == '' || personDefaultId == null) {
          this.personDefault = this.persons[0];
        } else {
          this.personDefault.id = Number(personDefaultId);
        }
        console.log(this.personDefault.id);
      },error => console.log(error));
    }
  
    selectPerson(event:Event) {
      console.log((event.target as HTMLSelectElement).value);
      this.personDefault.id =  Number((event.target as HTMLSelectElement).value);
    }

    formSubmit(ticket:number) {
      this.task.status = EnumStatus.NEW;
      this.task.files = "";
      this.task.ticket = ticket;

      if (this.task.name == '' || this.task.name == null) {
        this.snack.open('Complete los campos', 'Ok', {
          duration: 3000
        });
        return;
      } else {
        this.boardService.saveTask(this.task).subscribe((response:Response) => {
          this.dialogRef.close(response);
        }, (error) => {
          console.log(error);
        });
      }
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}


@Component({
  selector: 'app-ticket-modalForm',
  templateUrl: './new-ticket-modal.html',
})
export class FormTicketModal implements OnInit {
 
  ticket: Ticket = new Ticket("","");
  response:Response = new Response();
  listCategories: CategoriesDto[] = new Array;
  sprints:SprintDto[] = new Array;

  persons: PersonDto[] = new Array;
  sprintDefalut: SprintDto = new SprintDto();
  personDefault: PersonDto = new PersonDto();

  constructor (
    private boardService:BoardService,
    private sprintService:SprintService,
    private parametersService: ParametersService,
    private snack:MatSnackBar,
    public dialogRef: MatDialogRef<FormTaskModal>,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: TicketData,
    ) {}

  ngOnInit(): void {
    this.loadParameters();
    this.loadSprints();
    this.loadPersons();
  }

  loadParameters(){
    this.parametersService.getCategories().subscribe(response =>{
      this.response = response;
      this.listCategories = response.data.content;
      console.log(this.listCategories)
    },error => console.log(error));
  }

  loadSprints(){
    this.sprintService.getSprint().subscribe(response =>{
      this.sprints = response.data.content;
      console.log(this.sprints)
      let sprintDefaultId = localStorage.getItem('gestion-soporte-ti-default-sprint')
      if (sprintDefaultId == undefined || sprintDefaultId == '' || sprintDefaultId == null) {
        this.sprintDefalut = this.sprints[0];
      } else {
        this.sprintDefalut.id = Number(sprintDefaultId);
      }
    },error => console.log(error));
  }

  loadPersons() {
    this.personService.getPersons().subscribe(result => {
      this.persons = result.data.content;
      let personDefaultId = localStorage.getItem('gestion-soporte-ti-default-person')
      if (personDefaultId == undefined || personDefaultId == '' || personDefaultId == null) {
        this.personDefault = this.persons[0];
      } else {
        this.personDefault.id = Number(personDefaultId);
      }

      console.log(this.sprintDefalut.id);
      console.log(this.personDefault.id);
    },error => console.log(error));
  }

  selectPerson(event:Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.personDefault.id =  Number((event.target as HTMLSelectElement).value);
  }
  
    formSubmit(idProject: number, idSprint:number) {
      this.ticket.project = idProject;
      this.ticket.status = EnumStatus.NEW;
      this.ticket.sprint = idSprint;
      this.ticket.assignedTo = this.personDefault.id;

      console.log(this.ticket);

      if (this.ticket.name == '' || this.ticket.name == null) {
        this.snack.open('Complete los campos', 'Ok', {
          duration: 3000
        });
        return;
      } else {
        this.boardService.saveTicket(this.ticket).subscribe((response:Response) => {
          console.log(response);
          this.dialogRef.close(response.data);
        }, (error) => {
          console.log(error);
        });
      }
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}