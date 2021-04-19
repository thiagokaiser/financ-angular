import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { tap, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class LoginService{

    user: User;
    lastUrl: string;

    constructor(private http:HttpClient,
                private router: Router){
                    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
                                      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
                }

    login(email: string, senha: string): Observable<User>{                        

        return this.http.post<User>(`${environment.API}login`,
                                    {email: email, senha: senha}).pipe(
                                        tap(user => this.user = {
                                            email: user.email,                                            
                                            accessToken: user.accessToken
                                        })
                                    )   
    }

    saveToken(){        
        localStorage.clear();
        localStorage.setItem('sessionToken', this.user.accessToken);
        this.saveUserName()
    }

    saveUserName(){        
        var tokenDecoded = jwt_decode(this.user.accessToken);        
        this.user.email = tokenDecoded['email'];
        this.user.nome = tokenDecoded['nome'];
        this.user.sobrenome = tokenDecoded['sobrenome'];
    }

    isLoggedIn(): boolean {        
        if(this.user == undefined){
            var sessionToken = localStorage.getItem('sessionToken');        
            if(sessionToken){
                this.user = { accessToken: sessionToken }                                    
                this.saveUserName()
            }        
        }        
        return this.user !== undefined;
    }

    handleLogin(path: string = this.lastUrl){        
        this.router.navigate(['/security/login', btoa(path)]);
    }

    logout(){
        this.user = undefined;
        localStorage.clear();
        this.router.navigate(['/security/login']);
    }
}