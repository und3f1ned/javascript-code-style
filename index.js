// index.js
#! /usr/bin/env node
const fs = require('fs');
const filePath = process.argv[2];
if (!fs.existsSync(filePath)) {
  console.log('Can not read commit message');
  process.exit(1);
}
const message = fs.readFileSync(filePath);

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
  {
    name: 'regexp',
    alias: 'r',
    type: String,
    defaultValue: '^[A-Z]+-[0-9]+\s-\s[\W\w\s]{5,}[\s]*$'
  }
];
const cli = commandLineArgs(optionDefinitions);

const commonRegexp = new RegExp(cli.regexp, 'ig');
if (!commonRegexp.test(message)) {
  console.log("Wrong commit message format");
  process.exit(3);
}
process.exit(0);
