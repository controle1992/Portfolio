import { Component, OnInit } from '@angular/core';
import {User} from "../../../core/model/user.model";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: User;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.model = new User();
  }

  onSubmit(): void {
    this.authService
      .register(this.model)
      .subscribe(isRegistered => {
        if (isRegistered) {
          this.router.navigate(['/login']);
        } else {
          alert('email already in use');
        }
      });
  }

}
