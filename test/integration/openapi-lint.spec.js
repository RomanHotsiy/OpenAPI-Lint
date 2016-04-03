import OpenAPILint from '../../src/openapi-lint';

describe('OpenAPILint:', () => {
  describe('lint function', () => {
    it('should return score > 0 for valid spec', () => {
      return OpenAPILint.lint('./test/specs/petstore.json').then(res => {
        res.totalScore.should.be.above(0);
        res.error.should.be.false;
      });
    });
  });
});
