{
  "name": "angular-backend",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build --deploy-url='/js/'",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "try-watch": "ng build --watch --deploy-url='/js/'",
    "postbuild": "(cp ../public/js/index.html ../resources/views/backend/backend-angular.blade.php)"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^4.2.4",
    "@angular/common": "^4.2.4",
    "@angular/compiler": "^4.2.4",
    "@angular/core": "^4.2.4",
    "@angular/forms": "^4.2.4",
    "@angular/http": "^4.2.4",
    "@angular/platform-browser": "^4.2.4",
    "@angular/platform-browser-dynamic": "^4.2.4",
    "@angular/router": "^4.2.4",
    "@ng-bootstrap/ng-bootstrap": "^1.0.0-beta.5",
    "bootstrap": "^4.0.0-beta",
    "core-js": "^2.4.1",
    "font-awesome": "^4.7.0",
    "ionicons": "^3.0.0",
    "jquery": "^3.2.1",
    "jvectormap": "^2.0.4",
    "morris.js": "^0.5.0",
    "popper.js": "^1.12.5",
    "rxjs": "^5.4.2",
    "tether": "^1.4.0",
    "tinymce": "^4.7.2",
    "zone.js": "^0.8.14"
  },
  "devDependencies": {
    "@angular/cli": "1.4.3",
    "@angular/compiler-cli": "^4.2.4",
    "@angular/language-service": "^4.2.4",
    "@types/jasmine": "~2.5.53",
    "@types/jasminewd2": "~2.0.2",
    "@types/node": "~6.0.60",
    "codelyzer": "~3.1.1",
    "jasmine-core": "~2.6.2",
    "jasmine-spec-reporter": "~4.1.0",
    "karma": "~1.7.0",
    "karma-chrome-launcher": "~2.1.1",
    "karma-cli": "~1.0.1",
    "karma-coverage-istanbul-reporter": "^1.2.1",
    "karma-jasmine": "~1.1.0",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.1.2",
    "ts-node": "~3.2.0",
    "tslint": "~5.3.2",
    "typescript": "~2.3.3"
  }
}
