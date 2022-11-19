import { NgModule, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SprintDto } from 'src/app/models/sprint';
import { ReportService } from 'src/app/services/report.service';
import { SprintService } from 'src/app/services/sprint.service';


interface Report {
  sprint: number;
  value: number;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public chartPie: any;
  sprintDefalut: SprintDto = new SprintDto();
  sprints:SprintDto[] = new Array;
  constructor(
    private sprintService:SprintService,
    private reportSerice: ReportService
  ) {}

  single: Report[] = new Array;
  view: [number,number] = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  ngOnInit(): void {
    this.getSprintsFromService();
  }

  getSprintsFromService(){
    this.sprintService.getSprint().subscribe(response =>{
      this.sprints = response.data.content;
      let sprintDefaultId = localStorage.getItem('gestion-soporte-ti-default-sprint-dashboard')
      if (sprintDefaultId == undefined || sprintDefaultId == '' || sprintDefaultId == null) {
        this.sprintDefalut = this.sprints[0];
      } else {
        this.sprintDefalut.id = Number(sprintDefaultId);
      }
    
      this.printPieChart(this.sprintDefalut.id);

    },error => console.log(error));
  }

  selectSprint(event:Event) {
    this.sprintDefalut.id = Number((event.target as HTMLSelectElement).value);
    localStorage.setItem('gestion-soporte-ti-default-sprint-dashboard', (event.target as HTMLSelectElement).value);
    this.printPieChart(this.sprintDefalut.id);
  }
  printPieChart(sprint:number) {
    this.reportSerice.getReportTaskBySprint(sprint).subscribe(result => {
      this.single = result.data.content;
    },error => console.log(error));
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
