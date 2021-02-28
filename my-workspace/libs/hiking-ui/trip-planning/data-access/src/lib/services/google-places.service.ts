import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  private googleApiKey = 'AIzaSyArPwWq2P6AeqMApw2IzZKjaj5Ep1W7CBg';

  constructor(private httpCLient: HttpClient) {
    
  }
  
  public getLocationDetails(placeId: string) {
    return this.httpCLient.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${this.googleApiKey}`
    );
  }
}
