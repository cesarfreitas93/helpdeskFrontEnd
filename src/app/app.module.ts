import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { MainComponent } from './components/main/main.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProjectComponent, FormDialogModal } from './components/project/project.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskComponent } from './components/task/task.component';
import { TicketitComponent } from './components/ticketit/ticketit.component';
import { BoardComponent, FormTaskModal, FormTicketModal } from './components/board/board.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSelectModule} from '@angular/material/select';
import { SprintComponent } from './components/sprint/sprint.component';
import { ParameterComponent } from './components/parameter/parameter.component';
import { PeopleComponent } from './components/people/people.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    ProjectComponent,
    FormDialogModal,
    TaskComponent,
    TicketitComponent,
    BoardComponent,
    FormTaskModal,
    FormTicketModal,
    SprintComponent,
    ParameterComponent,
    PeopleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule,
    DragDropModule,
    MatSelectModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
