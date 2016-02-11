/**
 * Результат запроса к ОсновнымПроектам
 */
function MainProjectsForm() {
        var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
        var currentQuery = '';         // текущий запрос
        var currentPage = 0;        //  текущая страница результата
        var $resultBlock = $('#resultBlock');
        var queryResult = {};    // результат запроса
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
            var page =  (i === undefined) ? 0 : i  ;
            queryResult = {} ;
            var goVect = {
                'operation' : 'mainProjects',
                'query' : currentQuery,
                'page' : i,
                'successful' : false       } ;
            ajaxExecute.postData(goVect, true);
            var tmpTimer = setInterval(function () {
                var answ = ajaxExecute.getRequestResult();
                if (false == answ || undefined == answ) {
                    var mess = 'Нет соединения с БД....' ;

                } else {
                    clearInterval(tmpTimer);
                    if (answ['successful'] == true) {
                        queryResult = answ['results'] ;
                        responseShow() ;
                    } else {
                        message = answ['message'];
                    }
                }
            }, 300);

        } ;
        /**
         * Показать ответ
         */
        //   формат ответа:
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

    var responseShow = function() {
            var windowHeight = $(window).height() ;
            var windowWidth = $(window).width() ;
            var w = 1.184*windowHeight ;
            var left = (windowWidth - w)/2 ;
            $resultBlock.css('width',w) ;
            $resultBlock.css('height',windowHeight) ;
            $resultBlock.css('overflow','auto') ;
            $resultBlock.css('position','absolute') ;
            $resultBlock.css('top',10) ;
            $resultBlock.css('left',left) ;
            $resultBlock.removeAttr('hidden') ;
            $resultBlock.on('click',function(e) {     // закрыть по click
                var x = e.pageX;
                var y = e.pageY;
                var windowHeight = $(window).height() ;
                var windowWidth = $(window).width() ;
                if (x/windowWidth >= 0.8 && y/windowHeight <= 0.1) {
                    $('#resultBoxDocs').empty() ;
                    $('#totalHuman').empty() ;
                    $resultBlock.attr('hidden','hidden') ;
                }
            }) ;

            cardCommands() ;

            var icon = queryResult['icon'] ;
            var results = queryResult['results'] ;
            var totalHuman  = 'обнаружено записей: ' + results.length ;
            var pageStart =  1 ;        //   queryResult['pageStart'] ;
            var error = false ;
            if (error === 'false' || error === 'true' ) {
                $('#resultBoxError').text(error) ;
            }
            $('#totalHuman').empty() ;
            $('#totalHuman').append(totalHuman) ;
            $('#totalHuman').addClass('result') ;

            var data_ol = $('#resultBoxDocs') ;
            data_ol.empty() ;
        //    $resultBlock.append(data_ol) ;
            data_ol.attr('start',pageStart) ;
            for (var i = 0; i < results.length; i++) {
                var result = results[i] ;
                var li = liCreate(result) ;
                li.css('list-style-image','url('+icon+')') ;
                data_ol.append(li) ;
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
            //   a.addClass('title') ;
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
                ulli.append(passage) ;
                ul.append(ulli) ;
            }
            return ul ;
        } ;
        var  commandSet = function() {
            $($resultBlock).dialog("option", "buttons", [
                newCmd_i(0),newCmd_i(1),newCmd_i(2),newCmd_i(3),newCmd_i(4),
                newCmd_i(5),newCmd_i(6),newCmd_i(7),newCmd_i(8),newCmd_i(9)
            ]);

        } ;
        var newCmd_i = function(i) {
            return {
                text: i + 1,                                        
                click: function () {
                    _this.queryGo(i);
                }
            } ;
        }

}