import BaseChecker from '../BaseChecker/BaseChecker';

const message = 'Properties field usually requires `type: object`, but got type: ';

export default class TypeObjectMissing extends BaseChecker {
  constructor() {
    super();
    this.subscribeDeref(['$..schema']);
    this.subscribeDeref(['$..items']);
  }

  check(obj, path, api) {
    let type = obj.type || '<not specified>';
    if (obj.properties && type !== 'object') {
      return this.report('TYPE_OBJECT_MISSING', message + type, path);
    }
  }
}
