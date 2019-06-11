import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'spotify-web-api-node';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public httpClient: HttpClient
    ) { }

  accessToken: any;
  tokenType: string;

  options: any;
  values: any;
  artists: any[];

  async searchArtist() {
    const artist = (document.getElementById('artist-input') as HTMLInputElement).value;
    await this.ApiRequest(artist);

    // Await function should be done now
    console.log(this.options);

    this.fillTable();
  }

  async ApiRequest(artist) {
    return new Promise(resolve => {
    const params = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${environment.clientSecret}`);

    this.httpClient
      .get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, { headers: params })
      .subscribe(
        data => {
        this.options = data;
        console.log(this.options);
        resolve();
        },
        error => {
          console.log('Error', error);
        }
      );
    });
  }

  fillTable() {
    this.artists = this.options.artists.items;
  }

  addToPlaylist(artist) {
    const name = artist.name;
    const genre = artist.genres[0];
    const popularity = artist.popularity;
    const externalURL = artist.external_urls.spotify;

    (document.getElementById('static-playlist')).innerHTML += (`
                <th scope="row"></th>
                <td>${name}</td>
                <td>${genre}</td>
                <td>${popularity}</td>
                <td><a href='${externalURL}' target='_blank'>Listen</a></td>
                <td><a class="clickToRemove" (click)="removeFromPlaylist($event)">Remove</a></td>`);
    $('.clickToRemove').on('click', function() {
      $(this).parent().parent().remove();
    });
  }

  ngOnInit() {
  }

}
