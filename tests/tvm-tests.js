var moment = require("moment");
var should = require("should");
var Tvm = require("../lib/tvm.js");


describe("test PV", function() {

    it("", function() {
        Tvm.PV(.08/12, 12*120, 500, 0, 0).should.equal(-59777.15);
    });

});

describe("test FV", function() {

    it("", function() {
        Tvm.FV(.06/12, 10, -200, -500, 1).should.equal(2581.40);
    });

});

describe("test PMT", function() {

    it("", function() {
        Tvm.PMT(.08/12, 10, 10000, 0, 1).should.equal(-1030.16);
    });

});

describe("test NPER", function() {

    it("", function() {
        Tvm.NPER(.12/12, -100, -1000, 10000, 1).should.equal(59.67387);
    });

});

describe("test RATE", function() {

    it("", function() {
        Tvm.RATE().should.equal();
    });

});

describe("test FVSCHEDULE", function() {

    it("", function() {
        Tvm.FVSCHEDULE(1, [.09, .11, .1]).should.equal(1.33089);
    });

});