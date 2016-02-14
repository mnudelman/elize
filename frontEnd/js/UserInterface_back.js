/**
 * Контроллер для пользовательсконго предствления
 */
function UserInterface() {
    var smoke = new SmokeClouds();      // движение облаков
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
        stampDefine() ;              // объект stamp   - печать
        centralCircleDefine() ;      // объект centralCircle - ценральный круг

        $(document).click(function (e) {
            if (centralCyrcleClick(e)) {
                queryTextArea() ;
            }
            if (stampClick(e)) {
                var query = $queryArea.val() ;
                var requestGo = paramSet.requestGo ;
                requestGo.setRequestText(query) ;
                var auto = true ;
                requestGo.requestExecute(auto) ;
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
        var Ymax = $(document).height();
        var Xmax = $(document).width();
        var d = 0.17 * Xmax;
        var x0 = Xmax / 2;
        var y0 = 0.57 * x0;
        var r = 0.95 * (d / 2);
        centralCircle = {
            x0 : x0,       // координаты центра
            y0 : y0,
            r  : r         // радиус
        } ;
    } ;
    var stampDefine = function() {
        var Xmax = $(document).width();
        var aDoc = 0.535;   // Ymax/Xmax
        var Ymax = Xmax * aDoc;
        var btYTop = 0.69 * Ymax;
        var btWidth = 0.145 * Xmax;
        var btXLeft = (Xmax - btWidth) / 2;
        var btXRight = btXLeft + btWidth;
        var btHeight = btWidth * 0.23;
        var btYBottom = btYTop + btHeight;
        stamp = {
            top : btYTop,
            left: btXLeft,
            bottom: btYBottom,
            right: btXRight
        } ;
    } ;
    /**
     * click в центральном круге
     * @returns {boolean}
     */
    var centralCyrcleClick = function(e) {
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
        var alphaY = 0.3 ;
        var x0 = centralCircle['x0'] ;
        var y0 = centralCircle['y0'] ;
        var r = centralCircle['r'] ;
        var areaHeight = (2 * alphaY * r) * 0.87  ;
        var areaTop = y0 - alphaY * r ;
        var x1 = r * Math.sqrt(1 - alphaY * alphaY) ;
        var areaLeft = x0 - x1  ;
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
    var stampClick = function(e) {
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