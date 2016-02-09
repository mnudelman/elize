/**
 * Выполнение запроса
 */
function RequestGo() {
    var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
    var requestText = '' ;
    var resultNodes = {} ;   // дерево результата запроса(для контроля и отладки)
    var answReady = false ;   // возврат запроса
    var requestTypes = {
        'mainProjects' : false,
        'searchSystem' : false,
        'philosophy' : false
    } ;
    var _this = this ;
    //--------------------- //
    this.setRequestText = function(text) {
        requestText = text ;
    } ;
    /**
     * Отправить запрос на выполнение
     */
    this.requestExecute = function(autoFlag) {    // отправить запрос на исполнение
        autoFlag = (autoFlag === undefined) ? false : autoFlag ;  // автомат выполнение
        answReady = false ;
        resultNodes = {} ;
        var goVect = {
            'operation' : 'requestGo',
            'nodeRoot' : 'requestRoot',
            'nodeType' : 'root',
            'successful' : false,
            'requestText' : requestText,
            'nodes' : []
        } ;

        ajaxExecute.postData(goVect, true);
        var tmpTimer = setInterval(function () {
            var answ = ajaxExecute.getRequestResult();
            if (false == answ || undefined == answ) {
                var mess = 'Нет соединения с БД....' ;

            } else {
                clearInterval(tmpTimer);
                answReady = true ;
                if (answ['successful'] == true) {
                    goVect['successful'] = true;

                    resultNodes = answ['result'] ;              // дерево результата
                    requestTypesDefine(answ['requestTypes']) ;  // таблица типов
                    if (autoFlag) {
                        _this.automaticallyGo() ;
                    }
                } else {
                }
            }
        }, 300);

    } ;
    /**
     * проверяет завершение запроса
     * @returns {boolean}
     */
    this.isAnswReady = function() {
       return answReady ;
    } ;
    /**
     * забрать узлы дерева - результата запроса( для анализа )
     */
    this.getResultNodes = function() {
         return resultNodes ;
    } ;
    /**
     * забрать типы запросов( с флагом принадлежности запроса типу)
     * @returns {{mainProjects: boolean, searchSystem: boolean, philosophy: boolean}}
     */
    this.getRequestTypes = function() {
        return requestTypes ;
    } ;
    /**
     * сохранить результат запроса
     * @param answerTypes
     */
    var requestTypesDefine = function(answerTypes) {
       for (var type in requestTypes) {
          requestTypes[type] = answerTypes[type]['result'] ;
       }

    } ;
    /**
     * выполнение запроса по приоритету
     */
    this.automaticallyGo = function() {
       if (requestTypes['mainProjects']) {
           _this.mainProjectsGo() ;
       } else if (requestTypes['searchSystem']) {
           _this.searchSystemGo() ;
       } else {
           _this.philosophyGo() ;
       }
    } ;
    /**
     * запрос к поисковой системе
     */
    this.searchSystemGo = function() {
        var responseForm = paramSet.responseForm ;
        responseForm.setQuery(requestText) ;
        responseForm.queryGo() ;
    } ;
    /**
     * запрос к основнымПроектам
     */
    this.mainProjectsGo = function() {
        var mainProjectsForm = paramSet.mainProjectsForm ;
        mainProjectsForm.setQuery(requestText) ;
        mainProjectsForm.queryGo() ;

    } ;
    /**
     * философский запрос
     */
    this.philosophyGo = function() {
        var philosophyForm = paramSet.philosophyForm ;
        philosophyForm.queryGo() ;
    } ;

}