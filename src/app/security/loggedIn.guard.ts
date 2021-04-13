import { CanLoad, CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class loggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){}

    canLoad(route: Route): boolean {
        console.log('canLoad');
        return this.checkAuthentication(route.path);
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        console.log('canActivate');
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }

    checkAuthentication(path: string): boolean{
        const loggedIn = this.loginService.isLoggedIn();
        if(!loggedIn){            
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedIn;
    }
    
}