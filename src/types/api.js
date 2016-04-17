import SwaggerParser from 'swagger-parser';
import $Refs from 'json-schema-ref-parser/lib/refs';
import {cloneDeep} from 'lodash';

export default class API {
  constructor(spec, $refs) {
    this.spec = spec;
    this.$refs = $refs;
  }

  static create(spec, resolved = false) {
    if (typeof spec === 'object' && resolved) {
      return API.createResolved(spec);
    }

    let parsed;
    return SwaggerParser.parse(spec)
      .then(_parsed => {
        parsed = _parsed;
        return SwaggerParser.resolve(parsed, {$refs: {internal: true}});
      })
      .then($refs => {
        return new API(parsed, $refs);
      });
  }

  // sync version of create
  static createResolved(spec) {
    let $refs = new $Refs();
    //carefull: using internal API
    $refs._add('#', spec);
    return new API(spec, $refs);
  }
}
