import { Component, OnInit } from '@angular/core';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/Services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  album: number[];

  constructor(private fb: FacebookService) {
    fb.init({
      appId: '1592468820788220',
      version: 'v2.9'
    });
  }

  private static handleError(error: any) {
    const errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

  ngOnInit() {
/*    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_photos'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log(res);
      })
      .catch(AlbumsComponent.handleError);*/
  }

  connect() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_photos'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log(res);
      })
      .catch(AlbumsComponent.handleError);
  }

  getAlbums() {
    this.fb.api('/me/albums?fields=id')
      .then((res: any) => {
      this.album = res;
      console.log('test', this.album);
        //console.log('got the user albums', this.album);
      })
      .catch(AlbumsComponent.handleError);
  }

}
