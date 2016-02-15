/**
 * Контроллер для пользовательсконго предствления
 */
function UserInterface() {
    var smoke = new SmokeClouds();      // движение облаков
    var backgroundImg  ; // объект - элементы изображения
    var centralCircle = {} ;            // центральный круг
    var stamp = {} ;                    // печать
    var screenClosed = false ;
    var $queryArea ;                    // область ввовда текста
    var resizeFlag = false ;
    var resizeGo = false ;
    var resizeSteps = 0 ;
    var RESIZE_TIME_DELAY = 500 ;        // задержка при контроле изменения размеров
    var RESIZE_TAKTS_MAX = 2;            // число тактов, после которых фиксируются изменения размера
    var currentQuery = '' ;
    var _this = this ;
    //-----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - элементы изображения
        backgroundImg.init() ;
         stampDefine() ;              // объект stamp   - печать
        centralCircleDefine() ;      // объект centralCircle - ценральный круг
        $(document).click(function (e) {
            if (isCentralCircleClick(e)) {
  //              queryTextArea() ;
            }
            if (isStampClick(e)) {
                currentQuery = $queryArea.val() ;
                var requestGo = paramSet.requestGo ;
                requestGo.setRequestText(currentQuery) ;
                var auto = true ;
                //  сначала тип, потом Go -  по типу меняем круг

                requestGo.requestExecute(auto) ;
            }else {
              var philosophyForm = paramSet.philosophyForm ;
                philosophyForm.stopShow() ;
                backgroundImg.centralCircleShow('query') ;
                var idText = backgroundImg.getIdText('query') ;
                $queryArea = $('#'+idText) ;
                $queryArea.attr('placeholder','введите вопрос') ;
                $queryArea.val(currentQuery) ;
                $queryArea.focus() ;
            }
        });
        $(window).on('resize', function() {
            smoke.smokeResize();
            resize() ;
        });
        backgroundImg.centralCircleShow('query') ;
        var idText = backgroundImg.getIdText('query') ;
        $queryArea = $('#'+idText) ;
        $queryArea.attr('placeholder','введите вопрос') ;
        $queryArea.focus() ;
        smoke.init();
        smoke.smokeGo();


    } ;
    var resize = function() {
        resizeFlag =true ;
        if (!resizeGo) {    // запустить таймер
            resizeGo = true;
            var tmpTimer = setInterval(function () {
                if (resizeFlag) {
                    resizeFlag = false;
                    resizeSteps = 0;
                } else {
                    if (++resizeSteps >= RESIZE_TAKTS_MAX) {    // конец изменения размера
                        clearInterval(tmpTimer);
                        resizeGo = false;
                        resizeSteps = 0;
                        stampDefine();              // объект stamp   - печать
                        centralCircleDefine();      // объект centralCircle - ценральный круг
                        smoke.smokeGo();


                    }
                }

            }, RESIZE_TIME_DELAY);
        }
    } ;
     var centralCircleDefine = function() {
        var block = backgroundImg.getCentralCircle() ;
        var x1 = block['place']['x1'] ;
        var y1 = block['place']['y1'] ;
        var x2 = block['place']['x2'] ;
        var y2 = block['place']['y2'] ;
        var x0 = (x1 + x2) / 2;
        var y0 = (y1 + y2) / 2;
         var d = x2 - x1 ;
        var r = 0.95 * (d / 2);
        centralCircle = {
            x0 : x0,       // координаты центра
            y0 : y0,
            r  : r         // радиус
        } ;
    } ;
    var stampDefine = function() {
        var block = backgroundImg.getStamp() ;
        var x1 = block['place']['x1'] ;
        var y1 = block['place']['y1'] ;
        var x2 = block['place']['x2'] ;
        var y2 = block['place']['y2'] ;
        stamp = {
           top : y1,
           left: x1,
           bottom: y2,
           right: x2
        } ;
    } ;
    /**
     * click в центральном круге
     * @returns {boolean}
     */
    var isCentralCircleClick = function(e) {
        var x0 = centralCircle['x0'];
        var y0 = centralCircle['y0'];
        var r = centralCircle['r'];
        var r2 = r * r;
        var x = e.pageX;
        var y = e.pageY;
        var s = (x - x0) * (x - x0) + (y - y0) * (y - y0);
       return (s <= r2) ;
    } ;
    /**
     * область ввода запроса
     */
    var queryTextArea = function() {

        $queryArea.focus() ;

    } ;
    /**
     * click  по печати
     * @returns {boolean}
     */
    var isStampClick = function(e) {
        var btYTop = stamp['top'] ;
        var btXLeft = stamp['left'] ;
        var btXRight = stamp['right'] ;
        var btYBottom = stamp['bottom'] ;
        var x = e.pageX;
        var y = e.pageY;
        return (x >= btXLeft && x <= btXRight && y >= btYTop && y <= btYBottom)  ;
    } ;

    this.go = function() {

    } ;
}