import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Login/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './Admin/Dashboard/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateUserComponent } from './Admin/CreateUser/create-user/create-user.component';
import { UserComponent } from './User/user/user.component';
import { CreateLeaveComponent } from './User/CreateLeave/create-leave/create-leave.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateUserComponent,
    UserComponent,
    CreateLeaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
