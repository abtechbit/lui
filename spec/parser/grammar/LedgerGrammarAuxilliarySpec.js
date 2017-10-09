describe("LedgerParser", function() {
  var peg = require("pegjs");
  var fs = require('fs');

  beforeEach(function() {
      var cliGrammar = fs.readFileSync('src/ledger-cli.pegjs', 'utf8');
      this.parser = peg.generate(cliGrammar);
  });

/*

http://ledger-cli.org/3.0/doc/ledger3.html#Transactions-and-Comments

      ; # % | *
          A line beginning with a semicolon, pound, percent, bar or asterisk indicates a comment, and is ignored. Comments will not be returned in a “print” response.

*/

  it("should be able to parse line comments", function() {
    var result = this.parser.parse(
      "; First phone bill "
    );
    expect(result).toEqual({type: 'comment'});
  });

  it("should be able to parse line comments with new line ", function() {
    var result = this.parser.parse(
      "; First phone bill \n"
    );
    expect(result).toEqual({type: 'comment'});
  });

  it("should be able to parse line comments starting with #", function() {
    var result = this.parser.parse(
      "# comment \n"
    );
    expect(result).toEqual({type: 'comment'});
  });

})