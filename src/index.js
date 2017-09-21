import angular from 'angular';

// import 'angular/angular-csp.css';
import {directiveData} from 'rollup-angular-framework/dist/angular.fwk.esm.js';
// import './index.scss';

import demoModule from './demo/demoModule';

angular.module('main', [
  demoModule,
  directiveData.name
]);

angular.bootstrap(document.documentElement, ['main']);
