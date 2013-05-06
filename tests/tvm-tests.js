var moment = require("moment");
var should = require("should");
var Tvm = require("../lib/tvm.js");


describe("test PV", function() {

    it("", function() {
        Tvm.PV(.08/12, 12*20, 500, null, 0).should.equal(-59777.145851187815);
    });

});

describe("test FV", function() {

    it("", function() {
        Tvm.FV(.06/12, 10, -200, -500, 1).should.equal(2581.40337406012);
    });

    it("", function() {
        Tvm.FV(.12/12, 12, -1000, null, null).should.equal(12682.503013196972);
    });

    it("", function() {
        Tvm.FV(.11/12, 35, -2000, null, 1).should.equal(82846.24637190055);
    });

    it("", function() {
        Tvm.FV(.06/12, 12, -100, -1000, 1).should.equal(2301.401830340899);
    });

});

describe("test PMT", function() {

    it("", function() {
        Tvm.PMT(.08/12, 10, 10000, 0, 1).should.equal(-1030.1643271779744);
    });

});

describe("test NPER", function() {

    it("", function() {
        Tvm.NPER(.12/12, -100, -1000, 10000, 1).should.equal(59.67386567429457);
    });

});

describe("test RATE", function() {

    it("", function() {
        Tvm.RATE(4*12, -200, 8000).should.equal(0.0077014724882337356);
    });

});

describe("test FVSCHEDULE", function() {

    it("", function() {
        Tvm.FVSCHEDULE(1, [.09, .11, .1]).should.equal(1.3308900000000004);
    });

});