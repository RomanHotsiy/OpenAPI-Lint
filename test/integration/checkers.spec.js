import runCheckers from '../../src/checkers';
import API from '../../src/types/api';
import {cloneDeep} from 'lodash';

describe('Integration:', () => {
  let api;

  describe('Checkers:', () => {
    before(() => {
      return API.create('./test/specs/petstore.json').then((_api) => {
        api = _api;
      });
    });

    it('should return empty array for valid spec', () => {
      let res = runCheckers(api);
      res.should.be.empty;
    });

    it('multiple operations with the same operationId', () => {
      let cApi = cloneDeep(api);
      let operationId = cApi.specDeref.paths['/pet'].post.operationId;
      cApi.specDeref.paths['/pet'].put.operationId = operationId;

      let res = runCheckers(cApi);
      res.should.be.not.empty;
      res.should.have.lengthOf(1);
      res[0].should.be.deep.equal({
        code: 'DUPLICATE_OPERATIONID',
        message: 'Cannot have multiple operations with the same operationId: ' + operationId,
        path: ['$', 'paths', '/pet', 'put', 'operationId']
      });
    });

    it('extra reference properties', () => {
      let cApi = cloneDeep(api);
      cApi.spec.paths['/pet'].post.parameters[0].schema.extraField = 'This is an extra field';

      let res = runCheckers(cApi);
      res.should.be.not.empty;
      res.should.have.lengthOf(1);
      res[0].should.be.deep.equal({
        code: 'EXTRA_REFERENCE_PROPERTIES',
        message: 'Extra JSON Reference properties will be ignored: extraField',
        path: ['$', 'paths', '/pet', 'post', 'parameters', 0, 'schema']
      });
    });
  });

});
