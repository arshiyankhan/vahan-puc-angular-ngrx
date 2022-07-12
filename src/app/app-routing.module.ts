import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PucCertificateComponent } from './pages/puc-certificate/puc-certificate.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: PagesComponent,
    // canActivateChild: [AuthGuard],
    children: [{
      path: '',
      //canActivate: [LoginActiveGuard],
      // pathMatch: 'full',
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
      data: {
        allowedRoles: []
      }
    }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
