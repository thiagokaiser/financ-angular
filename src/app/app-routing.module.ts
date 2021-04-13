import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loggedInGuard } from './security/loggedIn.guard';


const routes: Routes = [
  {
    path: 'financ',
    loadChildren: './financ/financ.module#FinancModule',
    canLoad: [loggedInGuard], canActivate: [loggedInGuard]
  },
  {
    path: 'security',
    loadChildren: './security/security.module#SecurityModule'    
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'financ/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
