/**
 * Последоватльность вызовов объектов
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
        stackItems[topStack] = {}  ;
        topStack-- ;
    } ;
    this.currentGo = function() {
        var callback = stackItems[topStack]['callback'] ;
        callback() ;
    } ;
}
