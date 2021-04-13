import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/security/login/login.service';
import { User } from 'src/app/security/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  imagePath = '/assets/img-user.jpg';

  constructor(private loginService: LoginService) { }

  ngOnInit() {    
  }

  user(): User{
    return this.loginService.user;
  }

  logout(){
    this.loginService.logout();
  }

}
