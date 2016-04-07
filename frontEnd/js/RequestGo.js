/**
 * Выполнение запроса -  определение типа запроса (проекты(mnogonado)|поисковые системы(yandex) |
 * философия ( всё остальное)
 * после определения типа запускается соответствующий объект для выполнения запроса.
 */
function RequestGo() {
    var ajax = new AjaxRequest() ;         // исполнитель работы с ajax
    var actionSteps = paramSet.actionSteps ;
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
     * запрос на определение типа
     * @param auto - true - сразу запуск на выполнение
     */
    this.requestExecute = function(auto,callback) {
        actionSteps = paramSet.actionSteps ;
        resultNodes = {} ;
        answReady = false ;
        var goVect = {
            'operation' : 'requestGo',
            'nodeRoot' : 'requestRoot',
            'nodeType' : 'root',
            'successful' : false,
            'requestText' : requestText,
            'nodes' : []
        } ;
        ajax.setData(goVect) ;
        ajax.setRequestFunc(function(answ){        // callback  при возврате ответа
            answReady = true ;
            if (answ['successful'] == true) {
                goVect['successful'] = true;
                resultNodes = answ['result'] ;              // дерево результата
                requestTypesDefine(answ['requestTypes']) ;  // таблица типов
                if (callback !== undefined) {
                    callback() ;
                }
                if (auto) {
                    _this.automaticallyGo() ;
                }
            }else {
                if (answ !== false) {
                    var message = answ['message'];
                  actionSteps.addStep('requestType','break',ajax.errorMessage,message) ;

//                    ajax.errorMessage(message) ;
                }

            }
        }) ;
        ajax.go() ;
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
    this.searchSystemGo = function(noActionStepsFlag) {
        var responseForm = paramSet.responseForm ;
        responseForm.setQuery(requestText) ;
        responseForm.queryGo(noActionStepsFlag) ;
    } ;
    /**
     * запрос к основнымПроектам
     */
    this.mainProjectsGo = function(noActionStepsFlag) {
        var mainProjectsForm = paramSet.mainProjectsForm ;
        mainProjectsForm.setQuery(requestText) ;
        mainProjectsForm.queryGo(noActionStepsFlag) ;

    } ;
    /**
     * философский запрос
     */
    this.philosophyGo = function(noActionStepsFlag) {
        var philosophyForm = paramSet.philosophyForm ;
        philosophyForm.queryGo(noActionStepsFlag) ;
    } ;

}