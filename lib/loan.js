var moment = require("moment");
var Common = require("../lib/common.js");
var Tvm    = require("../lib/tvm.js");


var Loan = ( function() {

    var scope = this.Loan = {};

    var pmt      = Tvm.pmt;
    var fvFactor = Tvm.fvFactor;

    var ipmt = function(r, per, nper, pv, fv, pd) {
        var result = -( pv * fvFactor(r, per - 1) * r + pmt(r, nper, pv, fv, Common.PaymentDue.EndOfPeriod) * (fvFactor(r, per - 1) - 1) );
        if (pd === Common.PaymentDue.EndOfPeriod) {
            return result;
        } else {
            return result / (1 + r);
        }
    };

    var ppmt = function(r, per, nper, pv, fv, pd) {
        return pmt(r, nper, pv, fv, pd) - ipmt(r, per, nper, pv, fv, pd);
    };

    var ispmt = function(r, per, nper, pv) {
        var coupon = -pv * r;
        return coupon - (coupon / nper * per);
    };



    scope.IPMT = function(r, per, nper, pv, fv, pd) {

        // Validation

        if (per === 1 && pd === Common.PaymentDue.BeginningOfPeriod) {
            return 0;
        }
        else if (r === -1) {
            return -fv;
        }
        else {
            return ipmt(r, per, nper, pv, fv, pd);
        }
    };

    scope.PPMT = function(r, per, nper, pv, fv, pd) {

        // Validation

        if (per === 1 && pd === Common.PaymentDue.BeginningOfPeriod) {
            return pmt(r, nper, pv, fv, pd);
        }
        else if (r === -1) {
            return 0;
        }
        else {
            return ppmt(r, per, nper, pv, fv, pd);
        }
    };

    scope.CUMIPMT = function(r, nper, pv, startPeriod, endPeriod, pd) {

        // Validation

        var f = function(acc, per) {
            return acc + scope.IPMT(r, per, nper, pv, 0, pd);
        };

        return Common.aggrBetween(Math.ceil(startPeriod), endPeriod, f, 0);
    };

    scope.CUMPRINC = function(r, nper, pv, startPeriod, endPeriod, pd) {

        // Validation

        var f = function(acc, per) {
            return acc + scope.PPMT(r, per, nper, pv, 0, pd);
        };

        return Common.aggrBetween(Math.ceil(startPeriod), endPeriod, f, 0);
    };

    scope.ISPMT = function(r, per, nper, pv) {

        // Validation

        return ispmt(r, per, nper, pv);
    };

    return scope;

})();

module.exports = Loan;