import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/security/login/login.service';
import { User } from 'src/app/security/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  userAdmin(){    
    return this.loginService.isAdmin();
  }

  onDespesa(){
    this.router.navigate(['/financ/despesa']);
    this.render.removeClass(this.document.body, 'sidebar-open')
  }

  onHome(){
    this.router.navigate(['/financ/home']);
    this.render.removeClass(this.document.body, 'sidebar-open')
  }

  onCategoria(){
    this.router.navigate(['/financ/categoria']);
    this.render.removeClass(this.document.body, 'sidebar-open')
  }

  onConta(){
    this.router.navigate(['/financ/conta']);
    this.render.removeClass(this.document.body, 'sidebar-open')
  }

  onUser(){
    this.router.navigate(['/admin/usuario']);
    this.render.removeClass(this.document.body, 'sidebar-open')
  }
}
