import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthService} from './Services/auth.service';
import {AuthGuard} from './Services/auth-guard.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [AuthService, AuthGuard],
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent, LoginComponent]
})
export class AuthModule { }
