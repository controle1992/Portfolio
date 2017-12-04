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
  user: any;
  photos: any;

  constructor(public fbs: FacebookService) {
    fbs.init({
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
    this.connect();
  }

  connect() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_photos'
    };
    this.fbs.login(loginOptions)
      .then((res: LoginResponse) => {
        this.user = res;
        this.getAlbums();
      })
      .catch(AlbumsComponent.handleError);
  }

  getAlbums() {
    this.fbs.api('/me/albums')
      .then((res: any) => {
      this.album = res;
      })
      .catch(AlbumsComponent.handleError);
  }

}
