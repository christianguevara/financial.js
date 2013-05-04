var moment = require("moment");
var should = require("should");
var Loan = require("../lib/loan.js");


describe("test IPMT", function() {

    it("", function() {
        Loan.IPMT(.1/12, 1*3, 3, 8000, 0, 0).should.equal(-22.41);
    });

});

describe("test PPMT", function() {

    it("", function() {
        Loan.PPMT(.08, 10, 10, 200000, 0, 0).should.equal(-27598.05);
    });

});

describe("test CUMIPMT", function() {

    it("", function() {
        Loan.CUMIPMT(.09/12, 30*12, 125000, 13, 24, 0).should.equal(-11135.23);
    });

});

describe("test CUMPRINC", function() {

    it("", function() {
        Loan.CUMPRINC(.09/12, 30*12, 125000, 13, 24, 0).should.equal(-934.1071);
    });

});

describe("test ISPMT", function() {

    it("", function() {
        Loan.ISPMT(.1, 1, 3, 8000000).should.equal(-533333);
    });

});
