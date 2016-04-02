import OpenAPILint from '../../src/openapi-lint';

describe('OpenAPILint', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(OpenAPILint, 'greet');
      OpenAPILint.greet();
    });

    it('should have been run once', () => {
      expect(OpenAPILint.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(OpenAPILint.greet).to.have.always.returned('hello');
    });
  });
});
