var moment = require("moment");
var Common = require("../lib/common.js");

var Tvm = ( function() {

    var scope = this.Tvm = {};

    var fvFactor = function(r, nper) {
        return Math.pow(1 + r, nper);
    };

    scope.fvFactor = fvFactor;

    var pvFactor = function(r, nper) {
        return (1 / fvFactor(r, nper));
    };

    scope.pvFactor = pvFactor;

    var annuityCertainPvFactor = function(r, nper, pd) {
        if (r === 0) {
            return nper;
        }
        else {
            return (1 + r * pd) * (1 - pvFactor(r, nper)) / r;
        }
    };

    var annuityCertainFvFactor = function(r, nper, pd) {
        return annuityCertainPvFactor(r, nper, pd * fvFactor(r, nper));
    };

    var nperFactor = function(r, pmt, v, pd) {
        return v * r + pmt * ( 1 + r * pd );
    };


    var pv = function(r, nper, pmt, fv, pd) {
        return -(fv * pvFactor(r, nper) + pmt * annuityCertainPvFactor(r, nper, pd));
    };

    var fv = function(r, nper, pmt, pv, pd) {
        return -(pv * fvFactor(r, nper) + pmt * annuityCertainFvFactor(r, nper, pd));
    };

    var pmt = function(r, nper, pv, fv, pd) {
        return -(pv + fv * pvFactor(r, nper) / annuityCertainPvFactor(r, nper, pd));
    };

    scope.pmt = pmt;

    var nper = function(r, pmt, pv, fv, pd) {
        return Math.log(nperFactor(r, pmt, -fv, pd) / nperFactor(r, pmt, pv, pd)) / Math.log(r+1);
    };


    //

    scope.PV = function(r, nper, pmt, fv, pd) {

        // validation

        return pv(r, nper, pmt, fv, pd);
    };

    scope.FV = function(r, nper, pmt, pv, pd) {

        // Validation

        if (r === -1 && pd === Common.PaymentDue.BeginningOfPeriod) {
            return -(pv * fvFactor(r, nper));
        }
        else if (r === -1 && pd === Common.PaymentDue.EndOfPeriod) {
            return -(pv * fvFactor(r, nper + pmt));
        }
        else {
            return fv(r, nper, pmt, pv, pd);
        }
    };

    scope.PMT = function(r, nper, pv, fv, pd) {

        // Validation

        if (r === -1) {
            return -fv;
        }
        else {
            return pmt(r, nper, pv, fv, pd);
        }
    };

    scope.NPER = function(r, pmt, pv, fv, pd) {

        // Validation

        if (r === 0 && pmt !== 0) {
            return -(fv + pv) / pmt;
        }
        else {
            return nper(r, pmt, pv, fv, pd);
        }
    };

    scope.RATE = function(nper, pmt, pv, fv, pd, guess) {
        // Validation

        // let haveRightSigns x y z =
        //     not( sign x = sign y && sign y = sign z) &&
        //     not (sign x = sign y && z = 0.) &&
        //     not (sign x = sign z && y = 0.) &&
        //     not (sign y = sign z && x = 0.)

        // ( pmt <> 0. || pv <> 0. )                   |> elseThrow "pmt or pv need to be different from 0"
        // ( nper > 0.)                                |> elseThrow "nper needs to be more than 0"
        // ( haveRightSigns pmt pv fv )                |> elseThrow "There must be at least a change in sign in pv, fv and pmt"

        if (fv === 0 && pv === 0) {
            return (pmt < 0 ? -1 : 1);
        }
        else {
            var f = function(r) {
                return scope.FV(r, nper, pmt, pv, pd-fv);
            };
            return Common.findRoot(f, guess);
        }
    };

    scope.FVSCHEDULE = function(pv, interests) {
        var result = pv;
        for (var i = 0; i < interests.length; i++) {
            result = result * (1 + interests[i]);
        }
        return result;
    };

    return scope;

})();

module.exports = Tvm;