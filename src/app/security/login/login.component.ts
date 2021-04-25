import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  erros = null;
  navigateTo: string;
  hasError = false;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private ns: NotificationService) { }

  ngOnInit() {

    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/'])
    }    

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');    
  }  

  login(){
    this.submitted = true;    
    this.loginService.login(this.form.value.email,this.form.value.senha).subscribe(
      success => {
        this.ns.notify('Login realizado com sucesso.')
      },
      error => {                              
        this.hasError = true;                               
        this.erros = error.error.message;                              
        throw error;                              
      },
      ()=>{
        this.loginService.saveToken();
        this.router.navigate([atob(this.navigateTo)]);
      });
  }

  forgotPass(){
    this.router.navigate(['/security/forgot']);                              
  }

}
