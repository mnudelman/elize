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
    var _this = this ;
    //-----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - элементы изображения
        backgroundImg.init() ;
         stampDefine() ;              // объект stamp   - печать
        centralCircleDefine() ;      // объект centralCircle - ценральный круг

        $(document).click(function (e) {
            if (isCentralCircleClick(e)) {
                queryTextArea() ;
            }
            if (isStampClick(e)) {
                var query = $queryArea.val() ;
                var requestGo = paramSet.requestGo ;
                requestGo.setRequestText(query) ;
                var auto = true ;
                //  сначала тип, потом Go -  по типу меняем круг

                requestGo.requestExecute(auto) ;
            }else {
              var philosophyForm = paramSet.philosophyForm ;
                philosophyForm.stopShow() ;
            }
        });
        $(window).on('resize', function() {
            smoke.smokeResize();
            resize() ;
        });

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
                        queryTextArea();
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
        var alphaY = 0.5 ;
        var x0 = centralCircle['x0'] ;
        var y0 = centralCircle['y0'] ;
        var r = centralCircle['r'] ;
        var alphaR = Math.round(alphaY * r) ;
        var areaHeight = (2 * alphaR) ; // * 0.87  ;
        var areaTop = y0 - alphaR ;
        var x1 = Math.round(r * Math.sqrt(1 - alphaY * alphaY) );
        var areaLeft = x0 - x1* 1.1   ;
        var areaWidth = 2 * x1  ;
        $queryArea = $('#queryText') ;
        $queryArea.css('width',areaWidth) ;
        $queryArea.css('max-width',areaWidth) ;

        $queryArea.css('height',areaHeight) ;
        $queryArea.css('max-height',areaHeight) ;
        $queryArea.css('background-color','rgba(237,221,93,0.7)') ;
        $queryArea.css('border','none') ;
        $queryArea.css('border-radius','3px') ;
        $queryArea.css('color','blue') ;
        var $queryTextBlock = $('#queryTextBlock') ;
        //$queryTextBlock.css('position','absolute') ;
        $queryTextBlock.css('top',areaTop) ;
        $queryTextBlock.css('left',areaLeft) ;
        $queryTextBlock.removeAttr('hidden') ;
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