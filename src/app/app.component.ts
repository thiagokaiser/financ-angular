import { Component } from '@angular/core';
import { LoginService } from './security/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinancAngular';

  constructor(private loginService: LoginService){}

  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }
}
