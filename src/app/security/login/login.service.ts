import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { tap, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class LoginService{

    user: User;
    lastUrl: string;
    baseImagePath = 'https://curso-spring-avancado.s3-sa-east-1.amazonaws.com/cp.jpg'

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
        this.user.id = tokenDecoded['id']
        this.user.email = tokenDecoded['email'];        
        this.loadUserProfile();        
    }

    async loadUserProfile(){        
        let userProfile = await this.http.get<User>(`${environment.API}usuarios/${this.user.id}`).toPromise()
        this.user.nome = userProfile.nome;
        this.user.sobrenome = userProfile.sobrenome;
        this.user.perfis = userProfile.perfis;
        
        if(userProfile.imagemPerfil){
            this.user.imagemPerfil = userProfile.imagemPerfil + '?time=' + (new Date()).getTime();;            
        }else{
            this.user.imagemPerfil = this.baseImagePath
        }        
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
        localStorage.clear();
        this.user = undefined;        
        this.router.navigate(['/security/login']);
    }    

    updateImagePath(imagemPerfil){                
        this.user.imagemPerfil = imagemPerfil + '?time=' + (new Date()).getTime();
    }

    isAdmin(){
        if(this.user.perfis != undefined){
            return this.user.perfis.includes('ADMIN');
        }
        return false;        
    }
}