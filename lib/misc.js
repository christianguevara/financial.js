var moment = require("moment");
var Common = require("../lib/common.js");

var Misc = ( function() {

    var scope = this.Misc = {};

    var dollar = function(fractionalDollar, fraction, f) {
        var aBase     = Math.floor(fraction);
        var dollar    = (fractionalDollar > 0) ? Math.floor(fractionalDollar) : Math.ceil(fractionalDollar);
        var remainder = fractionalDollar - dollar;
        var digits    = Math.pow(10, Math.ceil(Common.log10(aBase)));

        return f(aBase, dollar, remainder, digits);
    };

    var dollarDe = function(aBase, dollar, remainder, digits) {
        return remainder * digits /  aBase + dollar;
    };

    var dollarFr = function(aBase, dollar, remainder, digits) {
        var absDigits = Math.abs(digits);
        return remainder *  aBase / absDigits + dollar;
    };

    var effect = function(nominalRate, npery) {
        var periods = Math.floor(npery);
        return Math.pow( nominalRate / periods + 1, periods) - 1;
    };

    var nominal = function(effectRate, npery) {
        var periods = Math.floor(npery);
        return (Math.pow(effectRate + 1, 1 / periods) - 1) * periods;
    };

    scope.DOLLARDE = function(fractionalDollar, fraction) {
        // Validation
        return dollar(fractionalDollar, fraction, dollarDe);
    };

    scope.DOLLARFR = function(fractionalDollar, fraction) {
        // Validation
        return dollar(fractionalDollar, fraction, dollarFr);
    };

    scope.EFFECT = function(nominalRate, npery) {
        // Validation
        return effect(nominalRate, npery);
    };

    scope.NOMINAL = function(effectRate, npery) {
        // Validation
        return nominal(effectRate, npery);
    };


    return scope;

})();

module.exports = Misc;