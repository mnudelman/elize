/**
 * Результат запроса к ОсновнымПроектам
 *        //   формат ответа:
 //   results:
 //{
    //    "icon":"http://www.mnogonado.net/favicon.ico",     //иконка проекта
    //    "from":0,     //служебное поле
    //    "priority":1,     //приоритет проекта
    //    "results":[       //список результатов поиска
    //    {
    //        "title":"test",                                             //Заголовок результата
    //        "link":"http://www.mnogonado.net/search/?mode=1&cmd=query&qu=test",         //Ссылка
    //        "desc":"Description for test",                                              //Описание
    //        "priority":1                                            //Рейтинг результата
    //    }
    //]
    //}
 * осуществляется вывод одной страницы результатов - навигации по страницам нет
 */
function MainProjectsForm() {
        var ajax = new AjaxRequest() ;
        var currentQuery = '';         // текущий запрос
        var currentPage = 0;        //  текущая страница результата
        var $resultBlock = $('#resultBlock');
        var queryResult = {};    // результат запроса
        var scrollBackground ;   // объект фоновое изображение
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
        scrollBackground.answerInit() ;        // вывод пустой формы

        var page =  (i === undefined) ? 0 : i  ;
        queryResult = {} ;
        var goVect = {
            'operation' : 'mainProjects',
            'query' : currentQuery,
            'page' : i,
            'successful' : false       } ;

        ajax.setData(goVect) ;
        ajax.setRequestFunc(function(answ){       // callback  для результата
            if (answ['successful'] == true) {
                queryResult = answ['results'] ;
                responseShow() ;
            }else {
                var message = answ['message'];
                ajax.errorMessage(message) ;
            }
        }) ;
        ajax.go() ;
    } ;


        /**
         * Показать ответ
         */

    var responseShow = function() {
            scrollBackground.answerBegin() ;     // начало вывода

            var icon = queryResult['icon'] ;
            var results = queryResult['results'] ;
            if (results.length === 0) {                // пустой ответ-> передача Поисковой системе
                    var responseForm = paramSet.responseForm ;
                    responseForm.setQuery(currentQuery) ;
                    responseForm.queryGo() ;
                    return true ;
            }



            var totalHuman  = 'обнаружено записей: ' + results.length ;
            var pageStart =  1 ;        //   queryResult['pageStart'] ;
            var error = false ;
            scrollBackground.putTotalHuman(totalHuman) ;      // вывод количество ответов
            for (var i = 0; i < results.length; i++) {
                var result = results[i] ;
                var li = liCreate(result) ;
//                li.css('list-style-image','url('+icon+')') ;
                scrollBackground.putAnswerItem(li) ;   // вывод элемента ответа
            }
        } ;
        var liCreate = function(result) {
            var url = result['link'] ;
            var title = result['title'] ;
            var headline = '' ;
            var li = $('<li/>') ;
            li.addClass('box') ;
            var a = $('<a/>') ;
            a.attr('href',url) ;
            a.attr('target','_blank') ;
            a.append('<span class="title">'+title+'</span>') ;
            li.append(a) ;
            var divHeadline = $('<div/>') ;
            divHeadline.append(headline) ;
            li.append(divHeadline) ;
            var passagesList = [result['desc']] ;
            if (passagesList !== null) {
                var passages = passagesCreate(passagesList);
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