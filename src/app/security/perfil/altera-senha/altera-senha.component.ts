import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PerfilService } from '../perfil.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-altera-senha',
  templateUrl: './altera-senha.component.html',
  styleUrls: ['./altera-senha.component.css']
})
export class AlteraSenhaComponent implements OnInit {

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
    private route: ActivatedRoute
    
    ) { }

  ngOnInit() {
    const perfil = this.route.snapshot.data['user'];    

    this.form = this.fb.group({
      email: [{ value: perfil.email, disabled: true }],      
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: [''],
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmNewPassword.value;    
    return pass === confirmPass ? null : { notSame: true }     
  }

  hasSuccessPass(): boolean{            
    return this.form.controls.newPassword.dirty && (this.checkPasswords(this.form) == null)
  } 

  onSubmit() {        
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Senha alterada com sucesso';              
      this.service.changePassword(this.form.getRawValue())
                  .subscribe(
                    success => {                                                                            
                      this.ns.notify(msgSuccess)                    
                      this.router.navigate(['/security/perfil']);          
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
    this.router.navigate(['/security/perfil'])
  }
}
