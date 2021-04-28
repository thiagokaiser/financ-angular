import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;

  constructor(
    private fb: FormBuilder,
    private service: CategoriaService,        
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService,
    private location: Location
  ) { }

  ngOnInit() {
    const categoria = this.route.snapshot.data['categoria'];
    this.formLabel = categoria.id == 0 ? 'Novo' : 'Editar'
    
    this.form = this.fb.group({
      id: [categoria.id],
      descricao: [categoria.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      cor: [categoria.cor, [Validators.required]]      
    });
  }

  onSubmit() {    
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Criado com sucesso';      
      this.idRegistro = this.form.value.id;
      if (this.idRegistro){
        msgSuccess = 'Alterado com sucesso';
      }      
      this.service.save(this.form.value).subscribe(
        success => {
          this.ns.notify(msgSuccess)          
          if(this.idRegistro){
            this.router.navigate(['/financ/categoria/detalhe', this.idRegistro]);
          }
          else{
            this.router.navigate(['/financ/categoria']);
          }                              
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
