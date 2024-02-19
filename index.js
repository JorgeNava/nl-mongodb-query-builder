const DatabaseQuery = require('./lib/DatabaseQuery');
const QueryBuilder = require('./lib/QueryBuilder');
const fs = require('fs');

class NL2Mongo {
  constructor() {
    this.secretKeys = {};
  }

  setSecretKeys(keys) {
    this.secretKeys = keys;
  }

  getQuery(question, option = undefined) {
    if (option !== '--cached') {

      QueryBuilder.handle(question, this.secretKeys).then(response => {

        if (response.startsWith("<!--") && response.endsWith("--!>")) {
          response = response.substring(4, response.length - 4);
        }

        DatabaseQuery.handle(JSON.parse(response), this.secretKeys);
      })
    } else {
      const filename = __dirname + '/templates/last_response.txt';
      const response = fs.readFileSync(filename, 'utf8');
      DatabaseQuery.handle(response)
    }
  }
}

module.exports = new NL2Mongo();
