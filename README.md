# WorldCup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.  
You need a [firebase](https://firebase.google.com/) to build and run it.  
Then update settings from [bdd.ts](https://github.com/aguacongas/worl-cup/blob/develop/bdd.ts) and copy it to *src/environment*.

**bdd.ts**  
``` ts
export const bdd = {
  firebase: {
    apiKey: 'Your api key',
    authDomain: 'Your auth domain',
    databaseURL: 'Your database url',
    projectId: 'Your firebase project id'
  },
  admin: 'Your admin email address'
};
```

### Database rules

Database rules should be set as this: 

``` json
{
  "rules": {
    ".read": true,
    ".write": "auth.email === 'Your admin email address'",
    "bets": {
      "$uid": {
        ".read": "$uid === auth.uid || auth.email === 'Your admin email address'",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
