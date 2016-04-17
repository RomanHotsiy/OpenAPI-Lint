import fs from 'fs';
import {runCheckers} from '../src/checkers';
import OpenAPILint from '../src/openapi-lint';
import API from '../src/types/api';
import {cloneDeep} from 'lodash';

import applyPatch from './helpers/applyPatch';

describe('Linter', () => {
  let api;
  let origApi;

  before(() => {
    return API.create('./test/specs/petstore.json').then((_api) => {
      origApi = _api;
    });
  });

  beforeEach(() => {
    api = cloneDeep(origApi);
  });

  describe('General', () => {
    Object.keys(global.suitesInfo).forEach((suite) => {
      let suiteInfo = global.suitesInfo[suite];
      it(suiteInfo.title, () => {
        applyPatch(api.spec, suiteInfo.patch);
        let res = OpenAPILint.lintResolved(api.spec);
        if (process && process.env.WRITE_TESTS) {
          fs.writeFileSync(__dirname + '/suites/' + suite + '.expected.json', JSON.stringify(res, null, '  '));
        } else {
          res.should.be.deep.equal(suiteInfo.expected);
        }
      });
    });
  });

});
