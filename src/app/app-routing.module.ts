import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
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
    path : 'main/user',
    component : DashboardComponent,
    pathMatch : 'full' ,
    canActivate : [MasterGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
