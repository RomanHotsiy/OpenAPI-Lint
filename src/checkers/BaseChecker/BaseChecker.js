export default class BaseChecker {
  constructor(code) {
    this.code = code;
    this.paths = [];
    this.pathsDeref = [];
  }

  subscribeDeref(paths) {
    this.pathsDeref = paths;
  }

  subscribe(paths) {
    this.paths = paths;
  }

  report(message, path) {
    return {
      code: this.code,
      message,
      path
    };
  }

}
