export default function template(tmpl, params) {
  var idx = params.length;
  while (idx--) {
    var whatIs = typeof params[idx];
    var param = (whatIs === 'object' || whatIs === 'null') ? JSON.stringify(params[idx]) : params[idx];
    tmpl = tmpl.replace('{' + idx + '}', param);
  }
  return tmpl;
}
