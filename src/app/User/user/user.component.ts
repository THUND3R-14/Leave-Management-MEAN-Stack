import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/User/user-service.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent {
	useremail: any;
	userdata: any;
	constructor(private user: UserServiceService, private router: Router) {
		this.useremail = localStorage.getItem('useremail');
		this.useremail = JSON.parse(this.useremail)
		this.getUser();
	}

	getUser() {
		this.user.getUserService(this.useremail).subscribe((data: any) => {
			this.userdata = data.data;
			if (this.userdata.length > 1) {
				this.router.navigateByUrl('/Login');
			}
		});
	}

	takeLeave() {
		this.router.navigateByUrl('/ApplyLeave');
	}
}
