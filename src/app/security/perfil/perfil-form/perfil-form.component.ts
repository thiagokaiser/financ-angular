import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PerfilService } from '../perfil.service';
import { LoginService } from '../../login/login.service';
import { Observable } from 'rxjs';
import { User } from '../../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;  
  hasError = false;
  erros = null;  

  constructor(
    private fb: FormBuilder,      
    private route: ActivatedRoute,  
    private router: Router,
    private ns: NotificationService,
    private location: Location,
    private service: PerfilService,    
    private loginService: LoginService
  ) { }

  ngOnInit() {

    const perfil = this.route.snapshot.data['user'];    
    
    this.form = this.fb.group({
      email: [{ value: perfil.email, disabled: true }],
      firstName: [perfil.firstName, [Validators.required]],
      lastName: [perfil.lastName, [Validators.required]],
      dtNascimento: [new Date(perfil.dtNascimento).toISOString().substring(0,10), [Validators.required]],
      cidade: [perfil.cidade, [Validators.required]],  
      estado: [perfil.estado, [Validators.required]],  
      descricao: [perfil.descricao, [Validators.required]],      
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {        
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Alterado com sucesso';            
      this.service.updatePerfil(this.form.getRawValue())
                  .subscribe(
                    success => {                                
                      this.loginService.user.accessToken = success['accessToken']
                      this.loginService.saveToken()
                      this.ns.notify(msgSuccess)                    
                      this.router.navigate(['/security/perfil']);          
                    },
                    error => { 
                      this.hasError = true;                   
                      this.erros = error.error.message;
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
