import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, ChangePasswordViewModel } from '../user';
import { take } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
    providedIn: 'root'
})
export class PerfilService{

    host = `${environment.API}security/`

    constructor(
        private http: HttpClient
        ){}

    loadPerfil(email: string){        
        return this.http.post<User>(`${this.host}perfil`, {'email': email}).pipe(take(1));
    }

    updatePerfil(user: User){                
        return this.http.put(`${this.host}perfil`, user).pipe(take(1));
    }

    registrar(user: User){        
        return this.http.post(`${this.host}registrar`, user).pipe(take(1));
    }

    changePassword(changePass: ChangePasswordViewModel){                
        return this.http.put(`${this.host}senha`, changePass).pipe(take(1));
    }

}