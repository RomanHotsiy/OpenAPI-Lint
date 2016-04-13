import BaseChecker from './BaseChecker';
import {ISSUE_TYPE} from '../types';

export default class UniqueOperationIDChecker extends BaseChecker {
  constructor() {
    super();
    this.subscribeDeref(['definitions', 'operation', 'properties', 'operationId'], this.check);

    this.operationIDSet = new Set();
  }

  static getInfo() {
    return {
      'DUPLICATE_OPERATIONID': {
        type: ISSUE_TYPE.ERROR,
        message: 'Cannot have multiple operations with the same operationId: {0}',
        summary: 'operationId is unique'
      }
    };
  }

  check(obj, path, api) {
    let operationId = obj;
    if (!operationId) {
      return;
    }

    if (this.operationIDSet.has(operationId)) {
      return this.report('DUPLICATE_OPERATIONID', [operationId], path);
    }

    this.operationIDSet.add(operationId);
  }
}
