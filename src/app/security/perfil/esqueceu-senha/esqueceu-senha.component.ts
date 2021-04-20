import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PerfilService } from '../perfil.service';
import { LoginService } from '../../login/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  form: FormGroup
  submitted = false
  erros = null
  hasError = false
  email = ""
  emailReadyonly = false

  constructor(
    private fb: FormBuilder,
    private service: PerfilService,
    private loginService: LoginService,
    private ns: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location    
    ) { }

  ngOnInit() {

    this.email = this.route.snapshot.params['email'];

    this.form = this.fb.group({
      email: [this.email, [Validators.email, Validators.required]]
    })          

    if(this.email != undefined){
      this.emailReadyonly = true;      
    }
  } 

  onSubmit() {        
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Email enviado com sucesso';              
      this.service.forgotPassword(this.form.getRawValue())
      .subscribe(
        success => {                                                                            
          this.ns.notify(msgSuccess)                    
          this.location.back();
        },
        error => { 
          this.hasError = true;                   
          this.erros = error.error.erros;
          console.log(this.erros);
          
          throw error          
        }
      );      
    }
    else{      
      this.form.markAllAsTouched();      
    }
  }

  onCancel() {    
    this.submitted = false;
    this.form.reset();        
    this.location.back();
  }
}
