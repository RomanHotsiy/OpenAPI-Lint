import template from '../utils/template';
import jp from 'json-pointer';

export default class BaseChecker {
  constructor() {
    this.pointers = [];
    this.pointersDeref = [];

    this.issuesInfo = this.constructor.getInfo();
  }

  subscribeDeref(pointer, func) {
    this.pointersDeref.push({pointer, func: func.bind(this)});
  }

  subscribe(pointer, func) {
    this.pointers.push({pointer, func: func.bind(this)});
  }

  report(code, params, path) {
    let issueDetails = this.issuesInfo[code];
    if (!issueDetails) throw new Error('Checker reports non-registered error or warning');
    return {
      code,
      params,
      type: issueDetails.type,
      message: template(issueDetails.message, params),
      path
    };
  }

}
