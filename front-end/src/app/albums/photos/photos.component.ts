import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {

  album: string;
  user: string;
  photos: any = [];
  constructor(private route: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
  this.route.queryParams
    .subscribe(params => {
      this.album = params['albumId'];
      this.user = params['userToken'];
      console.log(this.album);
      console.log(this.user);
    });
  this.http.get('https://graph.facebook.com/v2.9/'
    + this.album + '/photos?fields=source,images,name&access_token=' + this.user)
    .map(res => res.json())
    .subscribe(data => {
      this.photos = data;
    });
  }

}
