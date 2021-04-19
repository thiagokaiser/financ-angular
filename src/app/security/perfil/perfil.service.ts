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

    host = `${environment.API}usuarios/`

    constructor(
        private http: HttpClient
        ){}

    loadPerfil(email: string){        
        return this.http.get<User>(`${this.host}email?email=${email}`).pipe(take(1));
    }

    updatePerfil(user: User){                
        return this.http.put(`${this.host}${user.email}`, user).pipe(take(1));
    }

    registrar(user: User){        
        return this.http.post(`${this.host}`, user).pipe(take(1));
    }

    changePassword(changePass: ChangePasswordViewModel){                
        return this.http.put(`${this.host}senha`, changePass).pipe(take(1));
    }

    refreshToken(){                
        return this.http.post(`${environment.API}auth/refresh_token`, null).pipe(take(1));
    }

}