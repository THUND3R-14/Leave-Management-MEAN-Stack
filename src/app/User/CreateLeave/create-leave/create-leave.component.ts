import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/User/user-service.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-create-leave',
    templateUrl: './create-leave.component.html',
    styleUrls: ['./create-leave.component.css']
})
export class CreateLeaveComponent {
    today: any;
    date: any;
    datepipe: any;
    totalmonth: any;
    constructor(private snackBar: MatSnackBar, private user: UserServiceService, private router: Router) {
        this.date = new Date();
        this.datepipe = new DatePipe('en-US');
        this.today = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    }

    createLeave(formData: NgForm) {
        let updateddata: any;
        if (formData.invalid) {
            this.snackBar.open('Please fill up all required fields', 'Close', {
                duration: 3000,
            });
            return;
        }
        let useremail = localStorage.getItem('useremail');
        if (useremail) {
            useremail = JSON.parse(useremail);
        }
        this.user.getUserService(useremail).subscribe((data: any) => {
            let userdata = data.data;
            this.monthDifference(userdata['joinDate']);
            let totaldays = this.totalLeaveDays(formData.value['startdate'], formData.value['enddate']);

            if (totaldays > userdata['leaveBalance']) {
                this.snackBar.open('Sorry!! Applied leave days are more than leave balance', 'Close', {
                    duration: 3000,
                });
                return;
            }
            else {
                if (Math.abs(this.totalmonth) < 3) {
                    updateddata =
                    {
                        leaveBalance: userdata['leaveBalance'] - totaldays,
                        unpaid: userdata['unpaid'] + totaldays
                    }
                }
                else {
                    updateddata =
                    {
                        leaveBalance: userdata['leaveBalance'] - totaldays,
                        paid: userdata['paid'] + totaldays
                    }
                }
                this.user.updateUserService(userdata['email'], updateddata).subscribe((data) => {
                    if (data === true) {
                        let leaveRec = {
                            userid: userdata['userid'],
                            startDate: formData.value['startdate'],
                            endDate: formData.value['enddate'],
                            leaveReason: formData.value['leaveReason']
                        }
                        this.user.addLeaveService(leaveRec).subscribe((data) => {
                            console.log(data);
                        });
                        this.snackBar.open('Leave created!!', 'Close', {
                            duration: 3000,
                        });
                        this.router.navigateByUrl('/User');
                    }
                    else {
                        this.snackBar.open('Something went wrong!!', 'Close', {
                            duration: 3000,
                        });
                        this.router.navigateByUrl('/ApplyLeave');
                    }
                })
            }
        })
    }


    monthDifference = (sdate: any) => {
        const enddate = new Date();
        sdate = new Date(sdate);
        const datePipe = new DatePipe('en-US');
        let res = datePipe.transform(sdate, 'yyyy-MM-dd');
        let finaldate = res?.split('-');

        if (finaldate !== undefined) {
            const monthdiff = parseInt(finaldate[1]) - enddate.getMonth();
            const yeardiff = (parseInt(finaldate[0]) - enddate.getFullYear()) * 12;
            this.totalmonth = monthdiff + yeardiff;
        }
    }


    totalLeaveDays = (sdate: any, edate: any) => {
        const date1 = new Date(sdate);
        const date2 = new Date(edate);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays + 1;

    }
}
