import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Config } from '@hkworkspace/utils';
import { Geometry } from '../models/geometry.model';

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  constructor(
    @Inject(Config) private config: Config,
    private httpCLient: HttpClient
  ) {}

  public getDetailsByPlaceId(placeId: string) {
    return this.httpCLient.get(
      `/placesApi/maps/api/place/details/json?place_id=${placeId}&key=${this.config.googleApiKey}`
    );
  }

  public getDetailsByGeometry(
    geometry: Geometry,
    radius: number,
    types: string
  ) {
    return this.httpCLient.get(
      `/placesApi/maps/api/place/nearbysearch/json?location=${geometry.lat},${geometry.lng}&radius=${radius}&types=${types}&key=${this.config.googleApiKey}`
    );
  }

  public getDetailsByQuery(location: string, types: string) {
    location = location.replace(' ', '+');
    location = location.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log(types);

    types = types.split('_').join('+');
    console.log(types);
    console.log(
      `/placesApi/maps/api/place/textsearch/json?query=${location}+${types}&language=en&key=${this.config.googleApiKey}`
    );
    return this.httpCLient.get(
      `/placesApi/maps/api/place/textsearch/json?query=${location}+${types}&language=en&key=${this.config.googleApiKey}`
    );
  }

  public getPhotoUrl(photoReference: string, maxWidth: number) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${this.config.googleApiKey}`;
  }
}
