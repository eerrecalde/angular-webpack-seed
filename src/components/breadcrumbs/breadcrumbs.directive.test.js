import './index';
import '../../template'; // eslint-disable-line import/no-unresolved

describe('Directive - Breadcrumbs', () => {
  // List of modules to include
  const modules = ['templates', 'breadcrumbsModule'];
  modules.forEach((el) => {
    beforeEach(angular.mock.module(el)); // eslint-disable-line
  });

  let compile;
  let scope;

  const injectModules = (_$compile_, _$rootScope_) => {
    const rootScope = _$rootScope_;
    compile = _$compile_;
    scope = rootScope.$new();
  };

  function getCompiledElement(lst) {
    scope.breadcrumbList = lst || [{ displayName: 'Home' }];
    let element = '<breadcrumbs breadcrumb-list="breadcrumbList"></breadcrumbs>';
    element = compile(element)(scope);
    scope.$digest();
    return element;
  }

  beforeEach(() => {
    inject(injectModules); // eslint-disable-line
  });

  it('Component by default should render one breadcrumb with text Home', () => {
    const component = getCompiledElement();
    const txt = component.text().replace(/\n|\r/g, ' ').replace(/\s\s+/g, ' ').trim();
    expect(component.html()).toMatchSnapshot();
    expect(txt).toBe('Home');
  });

  it('Creating a whole new breadcrumb with Test 1 and Test 2 should render both', () => {
    const component = getCompiledElement([{ displayName: 'Test 1', href: 'http://google.com/' }, { displayName: 'Test 2', href: 'http://google.com/' }]);
    const txt = component.text().replace(/\n|\r/g, ' ').replace(/\s\s+/g, ' ').trim();
    expect(component.html()).toMatchSnapshot();
    expect(txt).toBe('Test 1 Test 1 Test 2');
  });
});
