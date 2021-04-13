import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService: LoginService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{   
        //console.log(request);             
        if(this.loginService.isLoggedIn()){
            const authRequest = request.clone({setHeaders:{
                'Authorization': `Bearer ${this.loginService.user.accessToken}`
            }})
            return next.handle(authRequest)
        }        
        return next.handle(request)

    }
}