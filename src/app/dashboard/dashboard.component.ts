import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'spotify-web-api-node';
declare var $: any;

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
  tracks: any[];
  playlist: string;
  playlistLink: any;

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
        .get(`https://api.spotify.com/v1/search?q=${artist}&type=track`, { headers: params })
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
    console.log(this.options.tracks.items);
    this.tracks = this.options.tracks.items;
  }

  addToPlaylist(track) {
    const name = track.name;
    const artist = track.artists[0].name;
    const album = track.album.name;
    const popularity = track.popularity;
    const externalURL = track.external_urls.spotify;

    (document.getElementById('static-playlist')).innerHTML += (`
                <th scope="row"></th>
                <td>${name}</td>
                <td>${artist}</td>
                <td>${album}</td>
                <td>${popularity}</td>
                <td><a href='${externalURL}'>Listen</a></td>
                <td><a class="clickToRemove" (click)="removeFromPlaylist($event)">Remove</a></td>`);
    $('.clickToRemove').on('click', function() {
      $(this).parent().parent().remove();
    });
    this.checkPlaylist();
  }
  checkPlaylist() {
    this.playlistLink = [];
    const tablePlaylist = (document.getElementById('static-playlist') as HTMLTableElement);
    const tableRows = $('#static-playlist tr').length;

    for (let i = 1; i < tableRows; i++) {
      let tempPlaylist = tablePlaylist.rows[i].cells[5].innerHTML.match(/\".*?\"/)[0];
      tempPlaylist = tempPlaylist.substring(1, tempPlaylist.length - 2);
      this.playlistLink.push(tempPlaylist);
      console.log(tablePlaylist.rows[i].cells[5].innerHTML);
    }
    console.log(this.playlistLink.join(' '));
  }

  ngOnInit() {
  }

}
