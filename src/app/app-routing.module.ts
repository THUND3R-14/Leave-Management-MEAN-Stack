import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { DashboardComponent } from './Admin/Dashboard/dashboard/dashboard.component';
import { CreateUserComponent } from './Admin/CreateUser/create-user/create-user.component';
import { UserComponent } from './User/user/user.component';
import { CreateLeaveComponent } from './User/CreateLeave/create-leave/create-leave.component';
const routes: Routes = [
    { path: 'Login', component: LoginComponent },
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'User', component: UserComponent },
    { path: 'ApplyLeave', component: CreateLeaveComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
