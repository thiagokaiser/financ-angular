import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from './security/login/login.service';
import { LoadingService } from './shared/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'FinancAngular';  

  constructor(
    private loginService: LoginService,
    public loadingService: LoadingService
    ){}

  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }
  
}
