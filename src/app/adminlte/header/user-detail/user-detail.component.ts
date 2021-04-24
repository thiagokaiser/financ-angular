import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/security/login/login.service';
import { User } from 'src/app/security/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {  

  constructor(private loginService: LoginService) { }

  ngOnInit() {    
  }

  user(): User{    
    if(this.loginService.user != undefined){
      if(this.loginService.user.nome != undefined){        
        return this.loginService.user;        
      }      
    }    
  }

  logout(){
    this.loginService.logout();
  }

}
