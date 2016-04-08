/**
 * общие функции
 */
function CommonFunc() {
    var _this = this;
    //-------------------------//
    /**
     * рекурсивный разбор текста-объекта и вывод в $block
     * @param $block   -
     * @param textObj
     * @param Lev    - уровень вложенности объекта. Определяет отступ при выводе
     * @returns {boolean}
     */
    this.parseText = function($block,textObj,Lev) {
        if (level == 0) {
        }
        var simpleType = ['number','boolean','string','undefined'] ;
        var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp' ;
        var indent ='' ;
        var br = '<br>' ;

        for (var  i = 0; i < level ; i++) {      // расчёт отступа
            indent += tab ;
        }
        var currentType = (typeof textObj) ;
        if (simpleType.indexOf(currentType) >= 0) {
            $block.append(indent+textObj+br) ;
            return true ;
        }
        for (var key in textObj) {
            $block.append(indent+'<strong>'+key+':</strong>'+br) ;
            var value = textObj[key] ;
            _this.parseText(value,level+1) ;      // продолжение разбора
        }
        if (level == 0) {
        }
        return true ;
    } ;

}