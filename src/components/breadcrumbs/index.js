import angular from 'angular';
import breadcrumbs from './breadcrumbs.directive';

export default angular
  .module('breadcrumbsModule', [])
  .directive('breadcrumbs', breadcrumbs)
  .name;
