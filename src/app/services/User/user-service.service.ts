import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class UserServiceService {
	url = 'http://localhost:2000/';
	constructor(private http: HttpClient, private router: Router) {
	}

	getUserService(email: any) {
		return this.http.post(this.url + 'getUsers', email);
	}

	updateUserService(email: any, data: any) {
		let result = {
			email,
			data
		}
		return this.http.put(this.url + 'updateUser', result);
	}

	addLeaveService(data: any) {
		console.log(data);
		return this.http.post(this.url + 'leaveRecord', data);
	}
}
