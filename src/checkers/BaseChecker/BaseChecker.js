export default class BaseChecker {
  constructor() {
    this.paths = [];
    this.pathsDeref = [];
  }

  subscribeDeref(paths) {
    this.pathsDeref = paths;
  }

  subscribe(paths) {
    this.paths = paths;
  }

  report(code, message, path) {
    return {
      code: code,
      message,
      path
    };
  }

}
