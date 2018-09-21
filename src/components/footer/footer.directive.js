export default function footer() {
  const ftr = {};

  ftr.restrict = 'E';
  ftr.template = require('./footer.tpl.html');
  return ftr;
}
