var moment   = require("moment");
var Common   = require("../lib/common.js");
var DayCount = require("../lib/daycountbasis.js");

var TBill = ( function() {

    var scope = this.TBill = {};

    var getDsm = function(settlement, maturity, basis) {
        var dc = DayCount.dayCount(basis);
        return dc.DaysBetween(settlement, maturity, DayCount.NumDenumPosition.Numerator);
    };

    var TBillEq = function(settlement, maturity, discount) {
        var dsm = getDsm(settlement, maturity, DayCount.DayCountBasis.Actual360);
        if (dsm > 182) {
            var price     = (100 - discount * 100 * dsm / 360) / 100;
            var days      = (dsm === 366) ? 366 : 365;
            var tempTerm2 = Math.pow(dsm / days, 2.) - (2 * dsm / days - 1) * (1 - 1 / price);
            var term2     = Math.sqrt(tempTerm2);
            var term3     = 2 * dsm / days - 1;

            return 2 * (term2 - dsm / days) / term3;
        } else {
            // This is from the docs, but it is valid just above 182 ...
            return 365 * discount / (360 - discount * dsm);
        }
    };

    var TBillYield = function(settlement, maturity, pr) {
        var dsm = getDsm(settlement, maturity, DayCount.DayCountBasis.ActualActual);
        return (100 - pr) / pr * 360 / dsm;
    };

    var TBillPrice = function(settlement, maturity, discount) {
        var dsm = getDsm(settlement, maturity, DayCount.DayCountBasis.ActualActual);
        return 100 * (1 - discount * dsm / 360);
    };

    scope.TBILLEQ = function(settlement, maturity, discount) {
        // Validation

        settlement = moment(settlement);
        maturity = moment(maturity);

        return TBillEq(settlement, maturity, discount);
    };

    scope.TBILLYIELD = function(settlement, maturity, pr) {
        // Validation

        settlement = moment(settlement);
        maturity = moment(maturity);

        return TBillYield(settlement, maturity, pr);
    };

    scope.TBILLPRICE = function(settlement, maturity, discount) {
        // Validation

        settlement = moment(settlement);
        maturity = moment(maturity);

        return TBillPrice(settlement, maturity, discount);
    };

    return scope;

})();

module.exports = TBill;