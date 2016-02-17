/**
 * Вывод результата запроса  к Yandex
 */
function ResponseForm() {
    var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
    var currentQuery = '';         // текущий запрос
    var currentPage = 0;        //  текущая страница результата
    var $resultBlock = $('#resultBlock');
    var yandexResult = {};    // результат поиска yandex
    var dirImages = paramSet.dirImages+'/cards' ;
    var scrollBackground = paramSet.scrollBackground ;
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


        yandexResult = {} ;
        var page =  (i === undefined) ? 0 : i  ;
        var goVect = {
            'operation' : 'yandex',
            'query' : currentQuery,
            'page' : page ,
            'successful' : false
        } ;

        ajaxExecute.postData(goVect, true);
        var tmpTimer = setInterval(function () {
            var answ = ajaxExecute.getRequestResult();
            if (false == answ || undefined == answ) {
                var mess = 'Нет соединения с БД....' ;

            } else {
                clearInterval(tmpTimer);
                if (answ['successful'] == true) {
                yandexResult = answ ;
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
    var responseShow = function() {
        scrollBackground.answerBegin() ;     // начало выводаима
        var totalHuman  = yandexResult['totalHuman'] ;
        var pageStart =  yandexResult['pageStart'] ;
        var results = yandexResult['results'] ;
        var error = yandexResult['error'] ;
        if (error === 'false' || error === 'true' ) {
     //       $('#resultBoxError').text(error) ;

            scrollBackground.putError(error) ;      // вывод ошибки
        }
        //$('#totalHuman').empty() ;
        //$('#totalHuman').append(totalHuman) ;
        scrollBackground.putTotalHuman(totalHuman) ;      // вывод количество ответов


        //var data_ol = $('#resultBoxDocs') ;
        //data_ol.empty() ;

   //     $resultBlock.append(data_ol) ;

//        data_ol.attr('start',pageStart) ;
        for (var i = 0; i < results.length; i++) {
            var result = results[i] ;
            var li = liCreate(result) ;

            scrollBackground.putAnswerItem(li) ;   // вывод элемента ответа

//            data_ol.append(li) ;
        }
  //     $resultBlock.dialog('open') ;
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
        a.append('<span class="title">'+title+'</span>') ;
     //   a.addClass('title') ;
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
        var j = i+1 ;
        return {
            text: i + 1,                                        // "guest",
    //      icons : {primary: dirImages+'/'+j+'.png'},
            click: function () {
                _this.queryGo(i);
            }
        } ;
    } ;
    var cardCommands = function() {
        $('#resultCommands').empty() ;
        $('#resultCommands').css('margin-left','15%') ;
        $('#resultCommands').css('padding-bottom','20px') ;
        var blockWidth = $('#resultCommands').width() ;
        for (var i = 1; i <= 10; i++) {
            var $img = $('<img/>') ;
            $img.attr('src',dirImages+'/' + i +'.png') ;

            $img.css('width',0.07 * blockWidth) ;
            //$img.css('margin-left','1%') ;
            $img.attr('id','card'+i) ;
            var $button = $('<button/>') ;
            $button.css('width','8%') ;
            $button.css('height',50) ;
        //    $button.css('padding',1) ;
            $button.append($img) ;
            $('#resultCommands').append($button) ;
            newCardClick(i) ;

        }



    } ;
    newCardClick = function(i) {
        $('#card'+i).on('click',function(){
            _this.queryGo(i-1);
        }) ;
    } ;


}

