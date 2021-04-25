import { Injectable } from "@angular/core";

@Injectable()
export class Config {
  apiURI: string;
  accessTokenKey: string;
  roleClaim: string;
  redirectUrl: string;
  logoutUrl: string;
  googleApiKey: string;
  pixabayApiKey: string;
}