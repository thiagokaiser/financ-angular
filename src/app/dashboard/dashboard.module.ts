import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserDetailComponent } from './header/user-detail/user-detail.component';

@NgModule({
  declarations: [
    BodyComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    BodyComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent
  ]
})
export class DashboardModule { }
