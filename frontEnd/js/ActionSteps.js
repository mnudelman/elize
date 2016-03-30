/**
 * объект отслеживает последовательность шагов по реализации действия
 * step = {name: <>,
 * condition: {continue: false, - шаг промежуточный
  *            error: false,    - прерван по ошибке
  *            prepareEnd: false  - подготовка выполнена
    *           complete: false   - завершён
  * } }
 */
function ActionSteps() {
    var steps = [] ;
    var CONDITION_BREAK = 'break' ;
    var CONDITION_CONTINUE = 'continue' ;
    var CONDITION_PREPARE = 'prepare' ;
    var CONDITION_COMPLETE = 'complete' ;

    var _this = this ;
    //----------------------------------------//
    this.init = function() {
        steps = [] ;
    } ;
    this.addStep = function(stepName,condName,callback,param) {
        steps[steps.length] = newStep(stepName,condName,callback,param) ;
    } ;
    var newStep = function(stepName,condName,callback,param) {
        return {
            name : stepName,
            condition: {
                name: condName,
                callback: callback,
                param: param
            }
        } ;
    } ;
    this.stepGo = function() {
        var n = steps.length ;
        if (n > 0) {
            var step = steps[n-1] ;
            var callback = step.condition.callback ;
            if (callback !== undefined) {
                var param  = step.condition.param ;
                callback(param) ;
            }
        }
    } ;
    var lastName = function() {
        var n = steps.length ;
        if (n > 0) {
            var step = steps[n-1] ;
            return step.condition.name ;
        }
    } ;
    this.isConditionBreak = function() {
        return (lastName() === CONDITION_BREAK) ;
    } ;
    this.isConditionPrepare = function() {
        return (lastName() === CONDITION_PREPARE) ;
    };
    this.isConditionContinue = function() {
        return (lastName() === CONDITION_CONTINUE) ;
    } ;
    this.isConditionComplete = function() {
        return (lastName() === CONDITION_COMPLETE) ;
    } ;
}