import { Component, OnInit } from '@angular/core';
import {User} from '../../../core/model/user.model';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: User;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.model = new User();
  }

  onSubmit(): void {
    this.authService
      .login(this.model)
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/albums']);
        } else {
          alert('Email/password incorrect!');
        }
      });
  }

}
