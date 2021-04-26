import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';
import { PixabayResult } from '../models/pixabay-result.model';
import {searchImages} from 'pixabay-api';

@Injectable({
  providedIn: 'root',
})
export class PixabayService {
  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient
  ) {}

  public getPlacesImages(location: string) {
    return searchImages(this.config.pixabayApiKey,`travel+${location}`,{image_type: 'photo', order: 'latest'});
    // return this.httpClient.get<PixabayResult>(
    //   `/pixabayApi/api/?key=${this.config.pixabayApiKey}&q=${location}&category=places&image_type=photo&order=latest&lang=en`
    // );
  }
}
