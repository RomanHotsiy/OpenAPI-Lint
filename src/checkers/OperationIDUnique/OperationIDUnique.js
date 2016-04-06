import BaseChecker from '../BaseChecker/BaseChecker';

const message = 'Cannot have multiple operations with the same operationId: ';

export default class OperationIDUnique extends BaseChecker {
  constructor() {
    super();
    this.subscribeDeref(['$.paths.*.*']);

    this.operationIDSet = new Set();
  }

  check(obj, path, api) {
    let operationId = obj.operationId;
    if (!operationId) {
      return;
    }

    if (this.operationIDSet.has(operationId)) {
      return this.report('DUPLICATE_OPERATIONID', message + operationId, path.concat('operationId'));
    }

    this.operationIDSet.add(operationId);
  }
}
