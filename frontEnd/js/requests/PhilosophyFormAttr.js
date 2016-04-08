/**
 * объект - атрибуты офорления формы PhilosophyForm
 * из всех атрибутов здесь осталось только thoughts - список мыслей
 */
function PhilosophyFormAttr() {
    var ajax ;
   var thoughts = [];
    var _this = this;
    //----------------------------//
    this.init = function () {
        ajax = new AjaxRequest() ;         // исполнитель работы с ajax
        getThoughts() ;
    };
    /**
     * обращение к БД за массивом thoughts - мысли
     * хороших мыслей много не бывает -> забираем все сразу
    */
    var getThoughts = function() {
        var goVect = {
            'operation' : 'getThoughts',
            'successful' : false
        } ;
        ajax.setData(goVect) ;
        ajax.setRequestFunc(function(answ){        // callback  при возврате ответа
            if (answ['successful'] == true) {
                goVect['successful'] = true;
                thoughts = answ['result'] ;
            }else {
                if (answ !== false) {
                    var message = answ['message'];
                    ajax.errorMessage(message) ;
                }
            }
        }) ;
        ajax.go() ;
    } ;
    /**
     * случайный выбор фразы
     * thoughts = {i : {'text' : <text>}}
     * @returns {*}
     */
    this.getPhrase = function() {
        return thoughts[randomSelect(thoughts.length)]['text'] ;
    } ;
     var randomSelect = function (n) {
        if (n == 0) {
            var select_i = 0 ;
        } else if (n >= 1) {
            var alpha = Math.random() * n ;
            select_i = Math.round(alpha) ;
        }
        return select_i;
    };
}