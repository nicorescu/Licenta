import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  private googleApiKey = 'AIzaSyArPwWq2P6AeqMApw2IzZKjaj5Ep1W7CBg';

  constructor(private httpCLient: HttpClient) {
    
  }

  options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: 'AIzaSyArPwWq2P6AeqMApw2IzZKjaj5Ep1W7CBg',
      "Access-Control-Allow-Origin":"localhost"
    },
    "resolveWithFullResponse": true,
    json: true,
    "accept": "text/plain"
  };

  public getLocationDetails(placeId: string) {
    return this.httpCLient.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${this.googleApiKey}`
    );
  }
}
