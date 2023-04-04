import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    public list: any;
    public totalpaid: number = 0;
    public totalunpaid: number = 0;
    constructor(private admin: AdminService, private router: Router) {
        this.getAllUsers();
    }

    getAllUsers() {
        this.admin.getAllUsersService('').subscribe((data: any) => {
            let result;
            for (let x in data.data) {
                result = this.monthDifference(data.data[x]['joinDate'])
                if (Math.abs(result) > 3) {
                    this.totalpaid += 1;
                }
                else {
                    this.totalunpaid++;
                }
            }
            this.list = data.data;
        })
    }

    toCreateUser() {
        this.router.navigateByUrl('/create-user');
    }


    monthDifference(startdate: any) {
        const enddate = new Date();
        let sdate = new Date(startdate);
        const datePipe = new DatePipe('en-US');
        let res = datePipe.transform(sdate, 'yyyy-MM-dd');
        let finaldate = res?.split('-');

        if (finaldate !== undefined) {
            const monthdiff = parseInt(finaldate[1]) - enddate.getMonth();
            const yeardiff = (parseInt(finaldate[0]) - enddate.getFullYear()) * 12;
            return monthdiff + yeardiff;
        }
        else {
            return 0;
        }
    }
}


