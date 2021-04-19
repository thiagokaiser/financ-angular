import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../perfil.service';
import { LoginService } from '../../login/login.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  form: FormGroup
  submitted = false
  erros = null
  hasError = false

  constructor(
    private fb: FormBuilder,
    private service: PerfilService,
    private loginService: LoginService,
    private ns: NotificationService,
    private router: Router,
    
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],      
      senha: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.senha.value;
    let confirmPass = group.controls.confirmPassword.value;    
    return pass === confirmPass ? null : { notSame: true }     
  }

  hasSuccessPass(): boolean{            
    return this.form.controls.senha.dirty && (this.checkPasswords(this.form) == null)
  } 

  onSubmit() {        
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Registrado com sucesso';              
      this.service.registrar(this.form.getRawValue())
                  .subscribe(
                    success => {                                                      
                      //this.loginService.user = {accessToken : success['accessToken']}                      
                      //this.loginService.saveToken()
                      this.ns.notify(msgSuccess)                    
                      this.router.navigate(['/security/login']);          
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
    this.router.navigate(['/security/login'])
  }
}
