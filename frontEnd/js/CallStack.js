/**
 * Последоватльность вызовов объектов
 * обеспечивает возврат в нужную точку после выполнения действия
 * например, две последовательности выполнения : a -> b -> c, a1 -> b1 -> c
 *  "b" перед передачей управления "c" сохраняет свой callback_b: callStack.pushItem('b',callback_b)
 *  "b1" аналгично callStack.pushItem('b1',callback_b1)
 * "c" отработав запускает callStack.currentGo и возвращает выполнение в нужную точку.
 */
function CallStack() {
    var stack = [] ;
    var topStack = -1 ;
    var stackItems = {} ;
    this.init = function() {

    } ;
    this.pushItem = function(name,callback) {
        var currentName = '' ;
        if(topStack >=0) {
          currentName = stackItems[topStack]['name'] ;
        }

        if (name === currentName) {
            return
        }
        var item = newItem(name,callback) ;
        topStack++ ;
        stackItems[topStack] = item ;
    };
    var newItem = function(name,callback) {
        return {
            name: name,
            callback: callback
        }
    } ;
    this.pullItem = function() {
        if (topStack > 0) {
            stackItems[topStack] = {}  ;
            topStack-- ;

        }
    } ;
    this.currentGo = function() {
        var callback = stackItems[topStack]['callback'] ;
        callback() ;
    } ;
    this.getStack = function() {
        return {
            top: topStack,
            stack: stackItems
        } ;
    } ;
}
