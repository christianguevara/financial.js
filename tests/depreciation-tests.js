var moment = require("moment");
var should = require("should");
var Depreciation = require("../lib/depreciation.js");


describe("test DB", function() {

    it("", function() {
        Depreciation.DB(1000000, 100000, 6, 1, 7).should.equal(186083.33333333334);
    });

});

describe("test SLN", function() {

    it("", function() {
        Depreciation.SLN(30000, 7500, 10).should.equal(2250);
    });

});

describe("test SYD", function() {

    it("", function() {
        Depreciation.SYD(30000, 7500, 10, 10).should.equal(409.09090909090907);
    });

});

describe("test DDB", function() {

    it("", function() {
        Depreciation.DDB(2400, 300, 120, 1, 2).should.equal(40);
    });

});

describe("test VDB", function() {

    it("", function() {
        Depreciation.VDB(2400, 300, 10, 0, 1).should.equal(480);
    });

});

describe("test AMORLINC", function() {

    it("", function() {
        Depreciation.AMORLINC(2400, "8/19/2008", "12/31/2008", 300, 1, .15, 1).should.equal(360);
    });

});

describe("test AMORDEGRC", function() {

    it("", function() {
        Depreciation.AMORDEGRC(2400, "8/19/2008", "12/31/2008", 300, 1, .15, 1, false).should.equal(776);
    });

});