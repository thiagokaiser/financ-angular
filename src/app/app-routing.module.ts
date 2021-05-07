import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loggedInGuard } from './security/loggedIn.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';


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
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [loggedInGuard], canActivate: [loggedInGuard]
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'financ/home'
  },
  { 
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
