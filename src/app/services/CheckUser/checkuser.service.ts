import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class CheckuserService {
    url = 'http://localhost:2000/';
    constructor(private http: HttpClient) { }

    checkUser(data: any) {
        return this.http.post(this.url + 'checkUser', data);
    }
}
