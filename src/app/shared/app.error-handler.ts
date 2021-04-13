import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './messages/notification.service';
import { LoginService } from '../security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

    constructor(private ns: NotificationService,
                private injector: Injector,
                private zone: NgZone){
        super()        
    }

    handleError(errorResponse: HttpErrorResponse | any){                
        this.zone.run(() => {        
            if(errorResponse instanceof Error){                
                this.ns.notify('Recurso não encontrado.')
            }
            if(errorResponse instanceof HttpErrorResponse){                        
                switch(errorResponse.status){        
                    case 0:
                        this.ns.notify('Banco fora.')
                        break;            
                    case 400:
                        this.ns.notify('Ocorreram erros.')
                        break;
                    case 401:                        
                        this.injector.get(LoginService).logout()
                        this.ns.notify('Não Autorizado.')
                        break;
                    case 403:
                        this.ns.notify('Não Autorizado.')
                        break;
                    case 404:                        
                        this.ns.notify('Recurso não encontrado.')
                        break;                    
                    default:                        
                        this.ns.notify('Recurso não encontrado.')
                        break;
                                       
                }
            }
        })                
        super.handleError(errorResponse);
    }    
}