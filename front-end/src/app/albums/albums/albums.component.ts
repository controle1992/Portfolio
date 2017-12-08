import {Component, OnInit} from '@angular/core';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/model/user.model';
import {Http} from '@angular/http';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  email = '';
  model: User;
  album: any = [];
  photos: any = [];
  mode = 1;

  constructor(private facebookService: FacebookService, private route: ActivatedRoute, private userService: UserService,
              private http: Http) {
    this.model = new User();
    // init the facebook parameters
    facebookService.init({
      appId: '162201394391436',
      version: 'v2.11'
    });
  }

  public static handleError(error: any) {
    const errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

  ngOnInit() {
    // receive the user email
    this.route.queryParams
      .filter(params => params.email)
      .subscribe(params => {
        this.email = params.email;
      });
    // fetching user albums
    this.userService.getUser(this.email)
      .subscribe(data => {
        this.model = data;
          this.getAlbums();
      });
  }

  getToken() {
    // log in to the app
      const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'user_photos'
          };
          this.facebookService.login(loginOptions)
            .then((res: LoginResponse) => {
              this.model.accessToken = res['authResponse']['accessToken'];
              this.model.facebookId = res['authResponse']['userID'];
              // Requesting long term access token
              this.userService.accessToken(this.model)
                .subscribe(data => {
                  // fetching the user albums
                  this.userService.getUser(this.email)
                    .subscribe(user => {
                      this.model = user;
                      this.getAlbums();
                      // log out from the app
                      this.facebookService.logout().then();
                    });
                });
            })
            .catch(AlbumsComponent.handleError);
  }

  getAlbums() {
    // fetching the albums
    this.http.get('https://graph.facebook.com/v2.11/' + this.model.facebookId + '/albums?access_token=' + this.model.accessToken)
      .map(res => res.json())
      .subscribe(data => {
        this.album = data;
        this.mode = 1;
      }, err => {
        this.mode = 0;
      });
  }

  getPhotos(albumId: string) {
    /*
      albumId: the id of the album
      fetching photos of the album
     */
    this.http.get('https://graph.facebook.com/v2.11/' + albumId + '/photos?fields=source&access_token=' + this.model.accessToken)
      .map(res => res.json())
      .subscribe(data => {
        this.photos = data;
        this.mode = 2;
      }, err => {
        this.mode = 0;
      });
  }
}
