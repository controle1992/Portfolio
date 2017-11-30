import {Component, Input, OnInit} from '@angular/core';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  album: any;
  mode = 1;
  user: any;

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
  }

  connect() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_photos'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        this.user = res;
        console.log(this.user['authResponse']['accessToken']);
      })
      .catch(AlbumsComponent.handleError);
  }

  getAlbums() {
    console.log('hello')
    this.fb.api('/me/albums'/*?fields=id,cover_photo*/)
      .then((res: any) => {
      this.album = res;
      console.log(this.album);
      this.mode = 2;
      })
      .catch(AlbumsComponent.handleError);
    //const album_cont = this.album['data'].length;
  }

}
