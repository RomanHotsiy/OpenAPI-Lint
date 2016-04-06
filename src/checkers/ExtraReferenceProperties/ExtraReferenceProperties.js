import BaseChecker from '../BaseChecker/BaseChecker';
import jp from 'jsonpath';
import {keys, without} from 'lodash';

const message = 'Extra JSON Reference properties will be ignored:';

export default class OperationIDUnique extends BaseChecker {
  constructor() {
    super();
    this.subscribe(['$..*["$ref"]']);
  }

  check(obj, path, api) {
    // if $ref field is not string it is not reference
    if (typeof obj !== 'string') {
      return;
    }

    let parentPath = path.slice(0, -1);
    let parent = jp.value(api.spec, parentPath);
    let extraKeys = without(keys(parent), '$ref');
    if (extraKeys.length) {
      return this.report('EXTRA_REFERENCE_PROPERTIES', `${message} ${extraKeys.join(', ')}`, parentPath);
    }
  }
}
