import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { SprintDto } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  constructor(
    private dateAdapter: DateAdapter<any>,
    public srintService: SprintService,
    private snack:MatSnackBar,
    private notificationService: NotificationsService
  ) { }
  displayedColumns: string[] = ['name', 'range'];

  springDto : SprintDto = new SprintDto();
  sprintLista: SprintDto[] = new Array;

  ngOnInit(): void {
    this.dateAdapter.setLocale('es-PE');
    this.loadData();
  }

  formSubmit() {

    console.log(this.springDto);

    if (this.springDto.beginDate == '' || this.springDto.beginDate == null ) {
      this.snakValidacion();
      return;
    }else if (this.springDto.endDate == '' || this.springDto.endDate == null ) {
      this.snakValidacion();
      return;
    }else if (this.springDto.name == '' || this.springDto.name == null ) {
      this.snakValidacion();
      return;
    } else {
      this.srintService.saveSprint(this.springDto).subscribe((response:Response) => {
        console.log(response);
        this.springDto = response.data;
        if (response.code === 1) {
          this.notificacionSuccess("Mensaje del sistema", "Registro exitoso")
        }
        this.loadData();
      }, (handle) => {
        console.log(handle);
        if (handle.error.code === 3) {
          this.notificacionError("Mensaje del sistema: Error 3", handle.error.msg)
        } else if (handle.error.code === 0) {
          this.notificacionError("Mensaje del sistema: Error 0", "Error 500")
        } else if (!handle.ok) {
          this.notificacionError("Mensaje del sistema: Error 0", "Los periodos y nombres no pueden repetirse")
        }
      });
    }

  }

  dateRangeChange(input: string, begin:any) {
    var newdateBegin = new Date(begin.value);
    var day: string;
    var month: string;
    if (newdateBegin.getDate() < 10) {
      day = '0'+ newdateBegin.getDate();
    } else { day = ""+newdateBegin.getDate()}
    
    if ((newdateBegin.getMonth() +1) < 10) {
      month = '0'+ (newdateBegin.getMonth() +1);
    } else { month = ""+(newdateBegin.getMonth() +1)}
    
    if (input === 'begin'){
      this.springDto.beginDate = newdateBegin.getFullYear()+"-"+month+"-" +day;
    } else {
      this.springDto.endDate = newdateBegin.getFullYear()+"-"+month+"-" +day;
    }
  }

  loadData() {
    this.srintService.getSprint().subscribe(response =>{
      this.sprintLista = response.data.content;
      console.log(this.sprintLista)
    },error => console.log(error));
  }

  notificacionSuccess( titulo: string, mensaje: string) {
    this.notificationService.success( titulo, mensaje, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  notificacionError( titulo: string, mensaje: string) {
    this.notificationService.error( titulo, mensaje, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  
  notificacionAlert( titulo: string, mensaje: string) {
    this.notificationService.alert( titulo, mensaje, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  snakValidacion() {
    this.snack.open('Complete todos los campos', 'Ok', {
      duration: 3000
    });
    return;
  }

}
