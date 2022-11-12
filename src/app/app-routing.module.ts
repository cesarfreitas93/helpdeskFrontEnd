import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ParameterComponent } from './components/parameter/parameter.component';
import { PeopleComponent } from './components/people/people.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectComponent } from './components/project/project.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { TaskComponent } from './components/task/task.component';
import { MasterGuard } from './services/guard/master.guard';

const routes: Routes = [
  {
    path : '',
    component : DashboardComponent,
    pathMatch : 'full' 
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full' 
  },
  {
    path : 'main',
    component : DashboardComponent,
    pathMatch : 'full',
    canActivate : [MasterGuard] 
  },
  {
    path : 'project',
    component : ProjectComponent,
    pathMatch : 'full',
    canActivate : [MasterGuard] 
  },
  {
    path : 'project/:id/board',
    component : BoardComponent,
    canActivate : [MasterGuard] 
  },
  {
    path : 'sprints',
    component : SprintComponent,
    canActivate : [MasterGuard] 
  },
  {
    path : 'parameters',
    component : ParameterComponent,
    canActivate : [MasterGuard] 
  },
  {
    path : 'people',
    component : PeopleComponent,
    canActivate : [MasterGuard] 
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [MasterGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
