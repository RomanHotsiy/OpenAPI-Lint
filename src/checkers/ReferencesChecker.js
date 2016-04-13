import BaseChecker from './BaseChecker';
import {ISSUE_TYPE} from '../types';
import {keys, without} from 'lodash';

export default class ReferencesChecker extends BaseChecker {
  constructor() {
    super();
    this.subscribe(['properties', 'paths', 'patternProperties', '^/'], this.check);
    this.subscribe(['definitions', 'response'], this.check);
    this.subscribe(['definitions', 'parameter'], this.check);
    this.subscribe(['definitions', 'schema'], this.check);
  }

  static getInfo() {
    return {
      'EXTRA_REFERENCE_PROPERTIES': {
        type: ISSUE_TYPE.WARNING,
        message: 'Extra JSON Reference properties will be ignored: {0}',
        summary: 'No extra JSON Reference properties'
      }
    };
  }

  check(obj, path, api) {
    // if no $ref field this is not reference
    if (!obj.$ref) {
      return;
    }

    let extraKeys = without(keys(obj), '$ref');
    if (extraKeys.length) {
      return this.report('EXTRA_REFERENCE_PROPERTIES', [extraKeys[0]], path);
    }
  }
}
