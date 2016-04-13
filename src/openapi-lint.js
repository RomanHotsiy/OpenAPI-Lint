import {groupBy, mapValues} from 'lodash';

import {runCheckers, getIssuesInfo} from './checkers';
import API from './types/api';
import chalk from 'chalk';

const OpenAPILint = {
  lint(specUrl) {
    return API.create(specUrl).then((api) => {
      let checks = runCheckers(api);
      return groupBy(checks, 'code');
    });
  },

  getIssuesInfo
};

export default OpenAPILint;
