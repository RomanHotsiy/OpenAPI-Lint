import SwayChecker from './SwayChecker';

describe('SwayChecker', () => {
  describe('Basic checks', () => {
    let checker;
    beforeEach(() => {
      checker = new SwayChecker();
    });

    it('should return empty error/warnings for valid schema', () => {
      return checker.check('./test/specs/petstore.json').then((res) => {
        res.should.be.empty;
      });
    });

    it('should return non-empty error/warnings array for invalid schema', () => {
      return checker.check({swagger: '2.0'}).then((res) => {
        res.should.not.be.empty;
      });
    });
  });
});
