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
        var actionSteps ;
        var currentQuery = '';         // текущий запрос
        var currentPage = 0;        //  текущая страница результата
        var queryResult = {};    // результат запроса
        var scrollBackground ;   // объект фоновое изображение
        var city ;               // ближайший город
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
    this.queryGo = function(noActionStepsFlag) {
        var geoLocation = paramSet.geoLocation;
        city = geoLocation.getCity();        // ближайший город, определённый по ip
        var cityId = city['cityId'];
        var cityName = city['cityName'];
        var regionId = city['regionId'];


        actionSteps = paramSet.actionSteps;
        var page = 0;
        queryResult = {};
        var goVect = {
            'operation': 'mainProjects',
            'query': currentQuery,
            'page': 0,
            'cityId': (cityId === undefined) ? '77' : cityId,
            'cityName': (cityName === undefined) ? 'Москва' : cityName,
            'regionId': (regionId === undefined) ? '77' : regionId,
            'successful': false
        };

        ajax.setData(goVect);
        ajax.setRequestFunc(function (answ) {       // callback  для результата
            if (answ['successful'] == true) {
                queryResult = answ['results'];
                if (noActionStepsFlag) {
                    responseShow();
                } else {
                    if (isRedirectQuery()) {        // перенаправить запрос далее
                        actionSteps.addStep('mainProjects', 'continue');
                    } else {
                        actionSteps.addStep('mainProjects', 'prepare', responseShow); // фиксируем готовность к выводу
                    }
                }
                //                responseShow() ;
            } else {
                var message = answ['message'];
                if (noActionStepsFlag) {
                    ajax.errorMessage(message);
                } else {
                    actionSteps.addStep('mainProjects', 'break', ajax.errorMessage, message); // фиксируем ошибку
                }

//                ajax.errorMessage(message) ;
                exit();
            }
        });
        ajax.go();
    };
    /**
     * прервать выполнение
     * возврат в точку, заданную callStack
     */
    var exit = function() {
        var callStack = paramSet.callStack ;
        callStack.currentGo() ;

    } ;

    /**
     * В  случае пустого ответа, запрос перенаправляется на поисковую систему
     * @returns {boolean}
     */
    var isRedirectQuery = function() {
        var results = queryResult['results'] ;
        if (results.length === 0) {                // пустой ответ-> передача Поисковой системе
            var responseForm = paramSet.responseForm ;
            responseForm.setQuery(currentQuery) ;
            responseForm.queryGo() ;
            return true ;
        } else {
            return false ;
        }

    } ;

        /**
         * Показать ответ
         */

    var responseShow = function() {
            scrollBackground = paramSet.scrollBackground ;
            scrollBackground.answerInit() ;        // вывод пустой формы

            scrollBackground.answerBegin() ;     // начало вывода

            var icon = queryResult['icon'] ;
            var results = queryResult['results'] ;

            var totalHuman  = 'обнаружено записей: ' + results.length ;
            var pageStart =  1 ;        //   queryResult['pageStart'] ;
            var error = false ;
            scrollBackground.putTotalHuman(totalHuman) ;      // вывод количество ответов
            for (var i = 0; i < results.length; i++) {
                var result = results[i] ;
                var li = liCreate(result) ;
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