import TypeObjectMissing from './TypeObjectMissing';

describe('Checkers:', () => {
  describe('TypeObjectMissing:', () => {
    let checker;
    beforeEach(() => {
      checker = new TypeObjectMissing();
    });

    it('should report error for type object without type object', () => {
      let res = checker.check({properties: {}}, ['/testpath']);
      res.should.be.an('object');
      res.code.should.be.equal('TYPE_OBJECT_MISSING');
      res.path.should.be.deep.equal(['/testpath']);
    });

    it('should not report error if type object is specified', () => {
      let res = checker.check({properties: {}, type: 'object'}, ['/testpath']);
      expect(res).to.be.undefined;
    });
  });
});
