import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class AdminService {
    url = 'http://localhost:2000/';
    constructor(private http: HttpClient) { }

    getAllUsersService(data: any) {
        return this.http.post(this.url + 'getUsers', data);
    }

    createUserService(userdata: any) {
        return this.http.post(this.url + 'addUser', userdata)
    }
}
