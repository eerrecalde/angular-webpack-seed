import angular from 'angular';
import footerDirective from './footer/footer.directive';
import Breadcrumbs from './breadcrumbs/index';
import SearchBox from './search-box/index';

export default angular
  .module('app.components', ['templates', Breadcrumbs, SearchBox])
  .directive('ctpEcomFooter', footerDirective)
  .name;