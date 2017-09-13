import angular from 'angular';
import filterIo from './filterIo';
import paginator from './paginator';
// mod.directive('ctpFilterIo', filterIo);

export default angular.module('directive.data', [])
  .directive('ctpFilterIo', filterIo)
  .directive('ctpPaginator', paginator);
