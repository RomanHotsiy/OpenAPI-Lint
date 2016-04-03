import OperationIDUnique from './OperationIDUnique';

describe('Checkers:', () => {
  describe('OperationIDUnique:', () => {
    let checker;
    beforeEach(() => {
      checker = new OperationIDUnique();
    });

    it('should report error for duplicated operationId', () => {
      checker.check({operationId: 'test'}, ['/testpath']);
      let res = checker.check({operationId: 'test'}, ['/testpath2']);
      res.should.be.a('object');
      res.code.should.be.equal(checker.code);
      res.path.should.be.deep.equal(['/testpath2', 'operationId']);
    });

    it('should not report error for non-duplicated operationId', () => {
      checker.check({operationId: 'test'}, '/testpath');
      let res = checker.check({operationId: 'test2'}, '/testpath2');
      expect(res).to.be.undefined;
    });
  });
});
