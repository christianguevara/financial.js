var moment = require("moment");
var should = require("should");
var Irr = require("../lib/irr.js");


describe("test IRR", function() {

    it("", function() {
        Irr.IRR([-70000, 12000, 15000, 18000, 21000, 26000], .1).should.equal(0.08663094803653171);
    });

});

describe("test NPV", function() {

    it("", function() {
        Irr.NPV(.1, [-10000, 3000, 4200, 6800]).should.equal(1188.4434123352216);
    });

});

describe("test MIRR", function() {

    it("", function() {
        Irr.MIRR([-120000, 39000, 30000, 21000, 37000, 46000], .1, .12).should.equal(0.1260941303659051);
    });

});

describe("test XNPV", function() {

    it("", function() {
        Irr.XNPV(.09, [-10000, 2750, 4250, 3250, 2750], ["1/1/2008", "3/1/2008", "10/30/2008", "2/15/2009", "4/1/2009"]).should.equal(2086.647602031535);
    });

});

describe("test XIRR", function() {

    it("", function() {
        Irr.XIRR([-10000, 2750, 4250, 3250, 2750], ["1/1/2008", "3/1/2008", "10/30/2008", "2/15/2009", "4/1/2009"], .1).should.equal(0.3733625335188316);
    });

});
