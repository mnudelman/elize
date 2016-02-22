/**
 * запрос к ajx
 * исполнитель запроса ajax
 * на исполнение передаётся объект sendData. Используются 2 callback'a
 * timeOverFunc(waitTime) - при превышении времени ожидания ответа (параметр времяОжидания(mSec))
 * requestFunc(answ) - получение ответа
 */
function AjaxRequest(sendDataObject,overtimeFunc,requestFunc) {
    var ajaxExecute = paramSet.ajaxExecute;
    var TIME_DELAY = 300;       // задежка при опросе ajax
    var MAX_STEPS = 12;        // количество опросов ajax
    var currentSendData = {};
    var currentOvertimeFunc = overtimeFunc;
    var currentRequestFunc = requestFunc;
    var _this = this ;
    //------------------------------------------//
    /**
     * объект для передачи ajax
     * @param data
     */
    this.setData = function (data) {
        currentSendData = data;
    };
    /**
     * устанавливает max время ожидания (mSec)
     * @param maxTime
     */
    this.setMaxTime = function (maxTime) {
        maxTime = maxTime - 0;
        MAX_STEPS = Math.round(maxTime / TIME_DELAY);
    };
    /**
     * callback при превышении max время ожидания
     * @param tmFunc
     */
    this.setOvertimeFunc = function (tmFunc) {
        currentOvertimeFunc = tmFunc;
    };
    /**
     * callback при нормальном получении ответа
     * @param rqFunc
     */
    this.setRequestFunc = function (rqFunc) {
        currentRequestFunc = rqFunc;
    };
    /**
     * исполнитель запроса
     */
    this.go = function () {
        var iStep = 0;
        $(document).css('cursor','progress') ;
        ajaxExecute.postData(currentSendData, true);
        var tmpTimer = setInterval(function () {
            var answ = ajaxExecute.getRequestResult();
            if ((false === answ || undefined === answ) && iStep++ < iMax) {
            } else {
                clearInterval(tmpTimer);
                $(document).css('cursor','default') ;
                if (iStep > MAX_STEPS) {
                    if (currentOvertimeFunc === undefined) {
                       _this.defaultOverTime() ;
                    }else {
                        currentOvertimeFunc(MAX_STEPS * TIME_DELAY);
                    }
                }

                currentRequestFunc(answ);
            }
        }, TIME_DELAY);
    } ;
    /**
     * реакция по умолчанию на превышение времени
     * вызывается при незаданном callback
     */
    this.defaultOverTime = function() {
        var waitTime = TIME_DELAY * MAX_STEPS ;
        alert('Запрос прерван.' + '\n' +
        'превышено время ожидания ответа от сервера ' + '\n' +
        'max время: '+ waitTime + ' mSec') ;
    } ;
    /**
     * ошибка в запросе. Может вызываться при отсутствии спец обработчика
     */
    this.errorMessage = function(text) {
            var text ='Запрос выполнен с ошибкой.' + '<br>' +
            ((text !== undefined) ? 'сообщение об ошибке: ' + '<br>' + text : '') ;
        var msg = new Messages() ;
        msg.showMessage(text) ;
    } ;



}