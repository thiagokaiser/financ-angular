import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    standalone: false
})
export class UsuarioFormComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;

  constructor(
    private fb: UntypedFormBuilder,
    private service: UsuarioService,        
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService,
    private location: Location
  ) { }

  ngOnInit() {
    const usuario = this.route.snapshot.data['usuario'];
    this.formLabel = 'Editar'
    
    this.form = this.fb.group({
      id: [usuario.id],
      email: [usuario.email, [Validators.required, Validators.email]],     
      nome: [usuario.nome, [Validators.required]],  
      sobrenome: [usuario.sobrenome, [Validators.required]],  
      dtNascimento:  [new Date(usuario.dtNascimento).toISOString().substring(0,10)],
      cidade:  [usuario.cidade],
      estado:  [usuario.estado],
      descricao: [usuario.descricao],
      imagemPerfil:  [usuario.imagemPerfil]      
    });
  }

  onSubmit() {    
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Alterado com sucesso';
      this.idRegistro = this.form.value.id;      
      this.service.updateAdmin(this.form.value).subscribe(
        success => {
          this.ns.notify(msgSuccess)                    
          this.router.navigate(['/admin/usuario/detalhe', this.idRegistro]);          
        },
        error => {          
          this.erros = error.error.errors;
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
