#!/usr/bin/env node

'use strict';

require('babel-core/register');
var chalk = require('chalk');
var ISSUE_TYPE = require('../src/types/issueType').ISSUE_TYPE;
var OpenAPILint = require('../src/openapi-lint').default;

var argv = require('yargs')
  .usage('Usage: $0 <file> [options]')
  .demand(1)
  .help('h')
  .alias('h', 'help')
  .version(function() {
    return require('../package.json').version;
  })
  .argv;

// executed as commandline
if (require.main === module) {
  main(argv._[0]);
}

function issueLine(issueInfo, issueInstances) {
  let summary = issueInfo.summary;
  let pass = !(issueInstances && issueInstances.length > 0);
  if (pass) {
    return chalk.green('✓ ' + summary);
  }

  if (rule.type === ISSUE_TYPE.ERROR) {
    return chalk.red('x ' + summary);
  } else if (rule.type === ISSUE_TYPE.WARNING) {
    return chalk.yellow('x ' + summary);
  }
}

function main(specUrl) {
  const issuesInfo = OpenAPILint.getIssuesInfo();
  OpenAPILint.lint(specUrl)
  .then((issues)=> {
    for (let code of Object.keys(issuesInfo)) {
      console.log(issueLine(issuesInfo[code], issues[code]));
    }
  }).catch((err) => {
    console.log(err);
  });
}
