import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './auth/components/register/register.component';
import {AlbumsComponent} from './albums/albums/albums.component';
import {AuthGuard} from './auth/Services/auth-guard.service';
import {LoginComponent} from './auth/components/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
