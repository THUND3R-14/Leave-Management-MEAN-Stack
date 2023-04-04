import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
    phoneValidator = '^[0-9]{10}$';
    emailValidator = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    today: any;
    date: any;
    datepipe: any;
    constructor(private router: Router, private snackBar: MatSnackBar, private admin: AdminService) {
        this.date = new Date();
        this.datepipe = new DatePipe('en-US');
        this.today = this.datepipe.transform(this.date, 'yyyy-MM-dd')
    }

    saveUser(formData: NgForm) {
        if (formData.invalid) {
            this.snackBar.open('Please fill up required fields', 'Close', {
                duration: 3000
            });
            return;
        }
        this.admin.createUserService(formData.value).subscribe((data) => {
            if (data === 11000) {
                this.snackBar.open('Email or Phone number already exists', 'Close', {
                    duration: 3000
                });
            }

            if (data === 500) {
                this.snackBar.open('Something went wrong!!', 'Close', {
                    duration: 3000
                });
            }
            if (data !== 500 && data !== 11000) {
                this.snackBar.open('User added!!', 'Close', {
                    duration: 3000
                })
                this.router.navigate(['Dashboard']);
            }
        })
    }

    clearForm(myForm: NgForm) {
        myForm.reset();
    }

    goToList() {
        this.router.navigateByUrl('/Dashboard')
    }
}
