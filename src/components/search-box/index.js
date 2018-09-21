import angular from 'angular';
import searchBox from './search-box.directive';

export default angular
  .module('searchBoxModule', [])
  .directive('searchBox', searchBox)
  .name;
