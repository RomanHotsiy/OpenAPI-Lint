import ExtraReferenceProperties from './ExtraReferenceProperties';
import {cloneDeep} from 'lodash';

describe('Checkers:', () => {
  describe('ExtraReferenceProperties:', () => {
    let checker;
    let spec = {
      paths: {
        $ref: 'test'
      }
    };
    let api = {};

    beforeEach(() => {
      checker = new ExtraReferenceProperties();
      api.spec = cloneDeep(spec);
    });

    it('should report warning for extra reference properties', () => {
      api.spec.paths.type = 'test';
      api.spec.paths.description = 'test';

      let res = checker.check('ref', ['$', 'paths', '$ref'], api);

      res.should.be.an('object');
      res.code.should.be.equal(checker.code);
      res.message.should.contain('type, description');
      res.path.should.be.deep.equal(['$', 'paths']);
    });

    it('should not report warning if no extra reference properties', () => {
      let res = checker.check('ref', ['$', 'paths', '$ref'], api);
      expect(res).to.be.undefined;
    });
  });
});
