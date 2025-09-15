import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loggedInGuard } from './security/loggedIn.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: 'financ',
    loadChildren: () => import('./financ/financ.module').then(m => m.FinancModule),
    canLoad: [loggedInGuard], canActivate: [loggedInGuard]
  },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)    
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
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
