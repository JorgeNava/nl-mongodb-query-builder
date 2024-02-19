const DatabaseQuery = require('./lib/DatabaseQuery');
const QueryBuilder = require('./lib/QueryBuilder');

const question = process.argv[2];
const option = process.argv[3] ?? undefined;

if (option !== '--cached') {

  // TODO: HANDLE DIFFERENT DB OPERATIONS (NEXT WILL BE WRITE OPERATIONS)
  //? Maybe we can ask first chatgpt if it thinks its a write, read, delete, modify request and then handle them in source code

  QueryBuilder.handle(question).then(response => {

    if (response.startsWith("<!--") && response.endsWith("--!>")) {
      response = response.substring(4, response.length - 4);
    }

    DatabaseQuery.handle(JSON.parse(response))
  })
} else {
  const fs = require('fs');
  const filename = __dirname + '/templates/last_response.txt';
  const response = fs.readFileSync(filename, 'utf8');
  DatabaseQuery.handle(response)
}
