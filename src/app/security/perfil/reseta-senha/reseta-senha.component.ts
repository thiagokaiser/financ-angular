import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PerfilService } from '../perfil.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-reseta-senha',
  templateUrl: './reseta-senha.component.html',
  styleUrls: ['./reseta-senha.component.css']
})
export class ResetaSenhaComponent implements OnInit {

  form: UntypedFormGroup
  submitted = false
  erros = null
  hasError = false
  token = "";

  constructor(
    private fb: UntypedFormBuilder,
    private service: PerfilService,
    private loginService: LoginService,
    private ns: NotificationService,
    private router: Router,
    private route: ActivatedRoute
    
    ) { }

  ngOnInit() {    
    this.token = this.route.snapshot.params['token'];
    
    this.form = this.fb.group({      
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmNewPassword: [''],
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: UntypedFormGroup) {
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
      this.service.resetPassword(this.token, this.form.getRawValue())
      .subscribe(
        success => {                                                                            
          this.ns.notify(msgSuccess)                    
          this.loginService.logout()
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
