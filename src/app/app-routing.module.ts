import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth'

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/user/authentication/authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  {
  path: 'index',
    loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
