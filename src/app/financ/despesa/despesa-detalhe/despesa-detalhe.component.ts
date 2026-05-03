import { Component, OnInit } from '@angular/core';
import { Despesa } from '../despesa';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { DespesaService } from '../despesa.service';
import { take, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
    selector: 'app-despesa-detalhe',
    templateUrl: './despesa-detalhe.component.html',
    standalone: false
})
export class DespesaDetalheComponent implements OnInit {

  despesa: Despesa;
  uploading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private service: DespesaService,
    private ns: NotificationService) {
      route.params.subscribe(val => {
        this.onRefresh();
      });
    }

  ngOnInit() {        
  }

  onEdit(id) {    
    this.router.navigate(['/financ/despesa/editar',id,'edit']);    
  }

  onEditAll(id){
    this.router.navigate(['/financ/despesa/editar', id, 'all']);    
  }

  onEditUnpaid(id){
    this.router.navigate(['/financ/despesa/editar', id, 'unpaid']);    
  }

  onCancel(){
    this.router.navigate(['/financ/despesa']);
  }
  onRefresh(){    
    let categ = this.route.snapshot.data['despesa'];           
    this.despesa = categ;    
  }  

  onNew(){
    this.router.navigate(['/financ/despesa/novo']);    
  }

  onDelete(despesa: Despesa) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar a despesa "' + despesa.descricao + '" ?');
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.remove(despesa.id) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Despesa eliminada com sucesso.')
        this.router.navigate(['/financ/despesa'])
      }
    );
  }

  onDeleteAll(despesa: Despesa){
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar todas as parcelas não pagas da despesa "' + despesa.descricao + '" ?');
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.removeByIdParcela(despesa.idParcela) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Despesas eliminadas com sucesso.')
        this.router.navigate(['/financ/despesa'])
      }
    );
  }

  onRemoveComprovante() {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover o comprovante desta despesa?');
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.removeComprovante(this.despesa.id) : EMPTY)
    ).subscribe({
      next: () => {
        this.despesa.comprovanteUrl = null;
        this.ns.notify('Comprovante removido com sucesso.');
      }
    });
  }

  onUploadComprovante(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) { return; }
    const file = input.files[0];
    this.uploading = true;
    this.service.uploadComprovante(this.despesa.id, file).subscribe({
      next: (response) => {
        const location = response.headers.get('Location');
        this.despesa.comprovanteUrl = location;
        this.ns.notify('Comprovante enviado com sucesso.');
        this.uploading = false;
        input.value = '';
      },
      error: () => {
        this.ns.notify('Erro ao enviar comprovante. Verifique o tipo e tamanho do arquivo.');
        this.uploading = false;
        input.value = '';
      }
    });
  }

}
