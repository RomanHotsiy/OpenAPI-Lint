import runCheckers from './checkers';
import applyRules from './rules';
import API from './types/api';

const OpenAPILint = {
  lint(specUrl) {
    return API.create(specUrl).then((api) => {
      var checks = runCheckers(api);
      return applyRules(checks);
    });
  }
};

export default OpenAPILint;
