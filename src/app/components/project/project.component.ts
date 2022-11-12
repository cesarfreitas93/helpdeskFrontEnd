import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Response } from 'src/app/models/response';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects!: Project[];

  constructor(
    private projectService:ProjectService,
    public dialog: MatDialog,
    private router:Router
    ) {}

  loadProjects() {
    this.projectService.getProjects().subscribe(response => {
      this.projects = response.data.content;
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogModal, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadProjects();
    });
  }

  showBoard(id:number) {
    this.router.navigate(['project', id,'board']);
  }

}


@Component({
  selector: 'app-project-form-modal',
  templateUrl: 'form-project.html',
})
export class FormDialogModal {
  constructor (
    private projectService:ProjectService,
    private snack:MatSnackBar,
    public dialogRef: MatDialogRef<FormDialogModal>,
    @Inject(MAT_DIALOG_DATA) public response:Response,
    ) {}
  project: Project = new Project("", "");
  formSubmit() {
    this.project.status = 1;
    this.project.config = "";
    this.project.files = "";
    if (this.project.name == '' || this.project.name == null) {
      this.snack.open('Complete los campos', 'Ok', {
        duration: 3000
      });
      return;
    } else {
      this.projectService.saveProject(this.project).subscribe((data:Response) => {
        console.log(data);
        if (data.code != 1) {

        } else {
          this.dialogRef.close();
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}