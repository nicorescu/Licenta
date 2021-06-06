import { environment } from '../../environments/environment';
import { Config } from '@hkworkspace/utils';

export const config: Config = {
  apiURI: environment.apiUri,
  accessTokenKey: environment.accessTokenKey,
  roleClaim: environment.roleClaim,
  redirectUrl: environment.redirectUrl,
  logoutUrl: environment.logoutUrl,
  googleApiKey: environment.googleApiKey,
  pixabayApiKey: environment.pixabayApiKey,
  websocketURI: environment.websocketURI,
};
