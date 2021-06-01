// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUri: 'https://localhost:5001',
  accessTokenKey: 'Trip_Auth_Access_Token_Secret_Key',
  roleClaim: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  redirectUrl: '/trip-planning',
  logoutUrl: '/trip-planning',
  googleApiKey: 'AIzaSyBPgVrWygCqhFiOdZL3a0ECSPJ7moDHn4Q',
  pixabayApiKey: '21324810-8c4b7a10637519665fb72e279',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
