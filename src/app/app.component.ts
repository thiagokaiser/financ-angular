import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoginService } from './security/login/login.service';
import { LoadingService } from './shared/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit{
  title = 'FinancAngular';  
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    public loadingService: LoadingService
    ){}

  ngOnInit(){
    this.listenToLoading()
  }

  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }

  listenToLoading(): void {
    this.loadingService.isLoading$
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
  
}
