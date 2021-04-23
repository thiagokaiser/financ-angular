import { Injectable } from "@angular/core";
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { tap, filter, take } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class LoginService{

    user: User;
    lastUrl: string;
    baseImagePath = 'https://curso-spring-avancado.s3-sa-east-1.amazonaws.com/cp';

    constructor(private http:HttpClient,
                private httpBackend: HttpBackend,
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
        this.user.id = tokenDecoded['id']
        this.user.imagePath = "https://curso-spring-avancado.s3-sa-east-1.amazonaws.com/cp.jpg"
        this.checkImagePath()
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

    checkImagePath(){
        console.log('checkImage')
        const newHttpClient = new HttpClient(this.httpBackend);        
        let path = this.baseImagePath + this.user.id + '.jpg?time=' + (new Date()).getTime();                
        newHttpClient.get(path, {responseType: 'blob'}).subscribe(
            success => {                
                this.user.imagePath = path
            },           
            error =>{
                console.log(error)
            } 
        );
    }
}