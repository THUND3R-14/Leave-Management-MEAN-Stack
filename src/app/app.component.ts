import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Leave-Management';

    constructor(private router: Router) { }
    logOut() {
        localStorage.removeItem('useremail');
        this.router.navigateByUrl('/Login');
    }

    logIn()
    {
        localStorage.removeItem('useremail');
        this.router.navigateByUrl('/Login');
    }
}
