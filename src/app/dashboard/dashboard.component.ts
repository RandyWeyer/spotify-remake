import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  clientId = 'e81482fe84c24fe49202c406b0b146bf';
  clientSecret = 'BQBbPwcUTnt8BNcWmo2bW6XFA8-QSpo2ZQnxGZmwYAW7L4WGfZFBR1p3Nhmj8fKHWoCaIWKMZECxqLR8eIA_T-bDbWFQjbUgEZrgiL20YuUNpP0iyHG4oYFK9ZWeuIiqK3vY0w_fZSLhPSc';
  redirectUri = 'http://localhost:4200/callback';

  options: any;
  values: any;
  artists: any[];

  async searchArtist() {
    const artist = (document.getElementById('artist-input') as HTMLInputElement).value;
    await this.searchArtist2(artist);

    // Await function should be done now
    console.log(this.options);

    this.fillTable();
  }

  async searchArtist2(artist) {
    return new Promise(resolve => {
    const params = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.clientSecret}`);

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

  ngOnInit() {
  }

}
