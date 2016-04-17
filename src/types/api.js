import SwaggerParser from 'swagger-parser';
import {cloneDeep} from 'lodash';

export default class API {
  constructor(spec, $refs) {
    this.spec = spec;
    this.$refs = $refs;
  }

  static create(specUrl) {
    let spec;
    return SwaggerParser.parse(specUrl)
      .then(_spec => {
        spec = _spec;
        return SwaggerParser.resolve(spec, {$refs: {internal: true}});
      })
      .then($refs => {
        console.log($refs.paths());
        return new API(spec, $refs);
      });
  }
}
