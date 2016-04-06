import jp from 'jsonpath';
import {flatten} from 'lodash';

import OperationIDUnique from './OperationIDUnique/OperationIDUnique';
import ExtraReferenceProperties from './ExtraReferenceProperties/ExtraReferenceProperties';
import TypeObjectMissing from './TypeObjectMissing/TypeObjectMissing';

export var CHECKERS = [
  OperationIDUnique,
  ExtraReferenceProperties
];

export default function runCheckers(api) {
  let results = [];

  function runOnPaths(checker, paths, spec) {
    let nodes = paths.map(path => {
      return jp.nodes(spec, path);
    });
    nodes = flatten(nodes);
    for (let node of nodes) {
      let res = checker.check(node.value, node.path, api);
      if (res) {
        results.push(res);
      }
    }
  }

  for (let CheckerType of CHECKERS) {
    let checker = new CheckerType();

    runOnPaths(checker, checker.pathsDeref, api.specDeref);
    runOnPaths(checker, checker.paths, api.spec);
  }

  return flatten(results);
}
