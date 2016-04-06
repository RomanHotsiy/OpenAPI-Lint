import {RULE_TYPE} from '../types/ruleType';
import {groupBy, keys} from 'lodash';

export default function applyRules(checks) {
  let points = 0;
  let error = false;
  let rules = [];
  let groupedChecks = groupBy(checks, 'code');

  for (let _rule of RULES) {
    let rule = Object.assign({}, _rule);
    let check = groupedChecks[rule.code];
    if (check) {
      rule.details = check;

      if (rule.type === RULE_TYPE.ERROR) {
        error = true;
        continue;
      }
    } else {
      points += rule.points || 0;
    }
    rules.push(rule);
  }

  if (error) {
    points = 0;
  }

  return {error, points, rules};
}

export const RULES = [
  {
    type: RULE_TYPE.ERROR,
    code: 'DUPLICATE_OPERATIONID',
    name: 'Uniqueness of operationId',
    description: 'Cannot have multiple operations with the same operationId'
  },
  {
    type: RULE_TYPE.WARNING,
    code: 'EXTRA_REFERENCE_PROPERTIES',
    name: 'Extra referece properties',
    description: 'Extra JSON Reference properties will be ignored according to JSONSchema spec',
    points: 4
  },
  {
    type: RULE_TYPE.WARNING,
    code: 'TYPE_OBJECT_MISSING',
    name: 'Type object expected',
    description: 'You have specified `properties` on schema. Usually it works together with type: object',
    points: 2
  }
];

const maxPoints = RULES.reduce((rule, sum) => sum + rule.points || 0, 0);

export function pointsToScore(points = 0) {
  return points / maxPoints * 100;
}
