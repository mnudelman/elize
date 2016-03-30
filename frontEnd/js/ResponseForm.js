/**
 * Запрос к поисковым системам(Yandex)
 */
function ResponseForm() {
    var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
    var actionSteps = paramSet.actionSteps ;
    var ajax = new AjaxRequest() ;
    var currentQuery = '';         // текущий запрос
    var currentPage = 0;        //  текущая страница результата
    var $resultBlock = $('#resultBlock');
    var yandexResult = {};    // результат поиска yandex
    var scrollBackground ;    // фоновое изображение для вывода запроса
    var _this = this ;
    //--------------------------------------//
    this.init = function() {

    } ;
    /**
     * установить запрос
     * @param query
     */
    this.setQuery = function(query) {
       currentQuery = query ;
       currentPage = 0 ;
    } ;
    /**
     * Отправить запрос.получить ответ
     */
    this.queryGo = function(i) {
        scrollBackground = paramSet.scrollBackground ;
//        scrollBackground.answerInit() ;        // вывод пустой формы

        actionSteps = paramSet.actionSteps ;
        
        yandexResult = {} ;
        var page =  (i === undefined) ? 0 : i  ;
        var goVect = {
            'operation' : 'yandex',
            'query' : currentQuery,
            'page' : page ,
            'successful' : false
        } ;
        ajax.setData(goVect) ;
        ajax.setRequestFunc(function(answ){
            if (answ['successful'] == true) {
                yandexResult = answ ;

                actionSteps.addStep('searchSystem','prepare',responseShow) ;


//                responseShow() ;
            }else {
                var message = answ['message'];
                if (message['@attributes'] !== undefined) {
                    var code = message['@attributes']['code'] ;
                    if (code === '15') {        // yandex не нашёл
                        scrollBackground.exit() ;
                        var philosophyForm = paramSet.philosophyForm ;
                        philosophyForm.queryGo() ;
                        return true ;
                    }
                }
                actionSteps.addStep('searchSystem','break',ajax.errorMessage,message) ;
//                ajax.errorMessage(message) ;
            }
        }) ;
        ajax.go() ;
    } ;
    /**
     * Показать ответ
     */
    var responseShow = function() {
        scrollBackground.answerInit() ;        // вывод пустой формы

        scrollBackground.answerBegin() ;     // начало выводаима
        var totalHuman  = yandexResult['totalHuman'] ;
        var pageStart =  yandexResult['pageStart'] ;
        var results = yandexResult['results'] ;
        var error = yandexResult['error'] ;
        scrollBackground.putTotalHuman(totalHuman) ;      // вывод количество ответов
        for (var i = 0; i < results.length; i++) {
            var result = results[i] ;
            var li = liCreate(result) ;

            scrollBackground.putAnswerItem(li) ;   // вывод элемента ответа
        }
    } ;
    var liCreate = function(result) {
        var url = result['url'] ;
        var title = result['title'] ;
        var headline = result['headline'] ;
        var li = $('<li/>') ;
        li.addClass('box') ;
        var a = $('<a/>') ;
        a.attr('href',url) ;
        a.attr('target','_blank') ;
        a.append(title) ;
        li.append(a) ;
        var divHeadline = $('<div/>') ;
        divHeadline.append(headline) ;
        li.append(divHeadline) ;
        var passages = result['passages'] ;
        if (passages !== null) {
            var passages = passagesCreate(result['passages']);
            li.append(passages);
        }
        return li ;
    } ;
    var passagesCreate = function(passages) {
        var ul = $('<ul/>') ;
        ul.addClass('passages') ;
        for (var i = 0; i < passages.length; i++) {
            var passage = passages[i] ;

            var ulli = $('<li/>') ;
            ulli.append(passage.trim()) ;
            ul.append(ulli) ;
        }
        return ul ;
    } ;
}

