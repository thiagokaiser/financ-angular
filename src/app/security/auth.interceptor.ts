import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../shared/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    private totalRequests = 0;

    constructor(
        private loginService: LoginService,
        private loadingService: LoadingService
        ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{   
        let requestAux = request.clone();
        this.totalRequests++;
        this.loadingService.setLoading(true);
        
        if(this.loginService.isLoggedIn()){
            requestAux = request.clone({setHeaders:{
                'Authorization': `Bearer ${this.loginService.user.accessToken}`
            }})            
        }       

        return next.handle(requestAux).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {                    
                    this.loadingService.setLoading(false);
                }
            })
        );

    }
}