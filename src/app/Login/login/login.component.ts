import { Component } from '@angular/core';
import { CheckuserService } from 'src/app/services/CheckUser/checkuser.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/User/user-service.service';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    emailid: string;
    password: string;
    emailPattern = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    constructor(private finduser: CheckuserService, private router: Router, private snackBar: MatSnackBar, private user: UserServiceService) {
        this.emailid = '';
        this.password = '';
    }

    checkUser(formData: NgForm) {
        if (formData.invalid) {
            this.snackBar.open('Please fill up required fields', 'Close', {
                duration: 3000
            });
            return;
        }
        this.finduser.checkUser(formData.value).subscribe((data) => {
            if (data === 'Admin') {
                this.router.navigateByUrl('/Dashboard');
            }
            if (data === "User") {
                localStorage.setItem('useremail', JSON.stringify({ email: formData.value['email'] }));
                this.router.navigateByUrl('/User');
            }
            if (data === 'Invalid User') {
                this.snackBar.open('Invalid Credentials', 'Close', {
                    duration: 5000
                });
            }
        });
    }
}
