# AngularExams

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Componenter && Service upplägg
1. AppComponent
    1. LoginComponent
        * register()
        * login()
    2. MainComponent
        1. UploadComponent
            * files()
        2. AccountComponent
            * setting()
            * signout()
        3. ItemComponent
            * *ngFor() list-row item of array
    3. NavigationComponent
2. HandelLoadService
    * filesUpload()
    * downLoadFile(file)
3. DataService
    * getData()
4. AuthService
    * auth()
5. FirbaseService
    * firebasConnection()

## NamingConvention

* camelCase
* Namnge bra från början, efter var funktion eller variable gör/innehåller. Gör detta med engång så vi slipper vi göra om det.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
