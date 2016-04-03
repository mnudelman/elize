/**
 * объект отслеживает последовательность шагов по реализации действия
 * действие может остановиться в некотором состоянии.  callback - используется
 * для запуска продолжения
 * пример. управляющийМодуль запускает выполнение запроса, требующего время на выполнение
 *     по завершении стадии подготовки объект, реализующий запрос, выдаёт actionSteps.addStep('<имяПрограммы>,'prepare',func)
 *     'prepare' - говорит, что данные для вывода готовы
 *      func - метод, выполняющий вывод результата на экран
 *  управляющийМодуль "дожидается" состояния 'prepare' и затем запускает func для вывода результата
 *  во время ожидания может отвлекать пользователя какими-то действиями
 * состояния {'break' -  прервано(ошибка)
 *            'continue' - промежуточное - управление передано дальше
 *            'prepare'  - завершена подготовка к чему-то важному(например, выводу)
 *            'complete' - нормальное завершение }
 *
 * step = {name: <>,
 * condition: {name - имя состояния
 *            callback - функция, запускаемая для продолжения действия
 *            param: параметр для callback
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
    /**
     * продолжить выполнение
     */
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