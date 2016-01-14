/**
 * форма исполнения запроса
 */
function RequestGoForm() {
    var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
    var $textLabel = $('#textGoLabel') ;
    var $requestText = $('#requestText') ;
    var $buttonGo = $('#requestGoBt') ;
    var $result ;
    var _this = this ;
    //-----------------------------//
    this.init = function() {
        $buttonGo.button() ;
        $buttonGo.css('border-radius',20) ;
        $buttonGo.css('position','absolute') ;
        $buttonGo.position({
            my : "right center",
            at : "right-10 top+80",
            of : "#requestGoDialog"
        }) ;
        $buttonGo.on('click',requestGo) ;
        $textLabel.css('position','absolute') ;
        $textLabel.position({
            my : "left top",
            at : "left+10 top+80",
            of : "#requestGoDialog"
        }) ;
        $requestText.css('position','absolute') ;
        $requestText.css('max-width',400) ;
        $requestText.css('max-height',100) ;
        $requestText.position({
            my : "left top",
            at : "left+80 top+60",
            of : "#requestGoDialog"

        }) ;
    } ;
    /**
     * Отправить запрос на выполнение
     */
    var requestGo = function() {    // отправить запрос на исполнение
            var goVect = {
                'operation' : 'requestGo',
                'nodeRoot' : 'requestRoot',
                'nodeType' : 'root',
                'successful' : false,
                'requestText' : $requestText.val(),
                'nodes' : []
            } ;

            ajaxExecute.postData(goVect, true);
            var tmpTimer = setInterval(function () {
                var answ = ajaxExecute.getRequestResult();
                if (false == answ || undefined == answ) {
                    var mess = 'Нет соединения с БД....' ;

                } else {
                    clearInterval(tmpTimer);
                    if (answ['successful'] == true) {
                        goVect['successful'] = true;
                        message = answ['message'];
                        ready = true;
                    } else {
                        ready = false;
                        message = answ['message'];
                    }
                }
            }, 300);

        } ;
}
