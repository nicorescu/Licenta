import { environment } from "../../environments/environment";
import { Config } from "@hkworkspace/shared/app-authentication/data-access";

export const config: Config = {
  apiURI: environment.apiUri,
  accessTokenKey: environment.accessTokenKey,
  roleClaim: environment.roleClaim,
  redirectUrl: environment.redirectUrl,
  logoutUrl: environment.logoutUrl
}