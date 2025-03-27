// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // This value is found under Firebase->(star) Project Settings->Web API Key
  firebaseAPIKey: 'AIzaSyBB0SpHDQTSYud0egQ0Afj0d8vXavUXQZY',

  DB_USER: 'postgres',
  DB_PASSWORD: 'opus12',
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_DATABASE: 'bardb'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
