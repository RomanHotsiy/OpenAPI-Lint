import SwaggerParser from 'swagger-parser';
import {cloneDeep} from 'lodash';

export default class API {
  constructor(spec, specDeref, origSpec) {
    this.spec = spec;
    this.specDeref = specDeref;
    this.origSpec = origSpec;
  }

  static create(specUrl) {
    let origSpec;
    let spec;

    return SwaggerParser.parse(specUrl)
      .then(_origSpec => {
        origSpec = cloneDeep(_origSpec);
        return SwaggerParser.bundle(_origSpec);
      })
      .then(_spec => {
        spec = cloneDeep(_spec);
        return SwaggerParser.dereference(_spec);
      })
      .then(specDeref => {
        return new API(spec, specDeref, origSpec);
      });
  }
}
