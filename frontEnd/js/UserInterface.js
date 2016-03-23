/**
 * Контроллер для пользовательского представления
 */
function UserInterface() {
    var smoke = new SmokeClouds();      // движение облаков
    var backgroundImg  ;                // объект - элементы изображения
    var scrollBackground ;              // свиток - вывод результата
    var philosophyForm ;
    var magicNormalPictures ;           // фоновые картинки
    var callStack;                      // стек вызовов
    var stamp = {} ;                    // планка - ввод запроса
    var $stamp = $('#stamp') ;
    var $queryArea ;                    // область ввовда текста
    var resizeGo = false ;
    var resizeSteps = 0 ;
    var RESIZE_TIME_DELAY = 200 ;        // задержка при контроле изменения размеров
    var RESIZE_TAKTS_MAX = 1;            // число тактов, после которых фиксируются изменения размера
    var currentQuery = '' ;              // текст запроса
    var $centralCircleBlock = $('#centralCircle') ;  // центральный круг
    var $centralCircleTextBlock = $('#centralCircleText') ; // текст в круге
    var _this = this ;
    //-----------------------------------//
    this.init = function() {
        callStack = paramSet.callStack ;
        callStack.pushItem('userInterface',_this.reshow) ;

        backgroundImg = paramSet.backgroundImage; // объект - элементы изображения
        scrollBackground = paramSet.scrollBackground;    // "свиток" - фоновое изображение результата
        philosophyForm = paramSet.philosophyForm;
        philosophyForm.init() ;
        backgroundImg.init();                 // фоновое изображение

        scrollBackground.init();              // свиток - фон для вывода результата запроса
        magicNormalPictures = paramSet.magicNormalPictures ;
        magicNormalPictures.init() ;                  // подготовка фоновых картинок
        stampDefine();              // объект stamp   - планка для запуска запроса
        $queryArea = $('#queryText');
        smoke.init();                 // подготовка и запуск облаков
        smoke.smokeGo();
        $queryArea.ready(function() {
            userInterfaceEvents() ;
            normalQueryShow() ;
        }) ;

    } ;
    var userInterfaceEvents = function() {
        $queryArea = $('#queryText');

        $stamp = $('#stamp') ;
        $stamp.off('click') ;
        $stamp.click(function(e) {
            stampClickGo() ;
        }) ;



        $('*').off('mousedown') ;
        $('*').on('mousedown',function(e){
            var targetId = e.currentTarget.id;
            //           alert('targetId:' + target.id) ;
            if (targetId == 'smokeClouds') {
                currentQuery = $queryArea.val();
                e.preventDefault();
            }else {
//                e.preventDefault();
            }
            //          $queryArea.focus();
        }) ;



        $(window).click(function (e) {
            if (isTextClick(e)) {
                $queryArea.focus();
            }else {
                if (isStampClick(e)) {                   // выполнение запроса
 //                   stampClickGo();
                } else {
                    normalQueryShow();
                    $queryArea.focus();
                }
            }
        });
        $(window).off('resize') ;
        $(window).on('resize', function () {      // размеры окна браузера
            resize();
        });
        $(document).off('keypress') ;
        $(document).keypress(function(e){
            $queryArea.focus();
        }) ;


    } ;
    /**
     * подготовить поле ввода запроса
     */
    var normalQueryShow = function() {
        backgroundImg.stampShow('query') ;   // планка, запускающая выполнение запроса
        backgroundImg.centralCircleGlowShow() ;
        backgroundImg.centralCircleShow('query');
        var idText = backgroundImg.getIdText('query');
        $queryArea = $('#' + idText);
        $queryArea = $('#queryText');
        $queryArea.attr('placeholder', 'ВВЕДИТЕ ВОПРОС');

        $queryArea.css('z-index',10) ;


        $queryArea.off('keydown') ;
        $queryArea.on('keydown',function(e) {
            if (e.keyCode === 13) {
                stampClickGo() ;
            }
        }) ;
        $queryArea.off('blur') ;
        $queryArea.blur(function(e) {
            currentQuery = $queryArea.val();
        }) ;
        var staticShow = true ;
        magicNormalPictures.show(staticShow) ;
        $queryArea.val(currentQuery);
 //       $queryArea.focus() ;
    } ;
    /**
     * click по планке "ответ" -> процесс "раздумья" -
     * центральный круг и картинки вращаются
     * запуск выполнения запроса
     */
    var stampClickGo = function() {
        if (philosophyForm.getFormShowFlag() === true) {
 //           philosophyForm.scrollGo() ;       // развернуть свиток
        } else {
            var staticShow = false ;
            magicNormalPictures.show(staticShow) ;

            backgroundImg.centralCircleRotate(function() {
                var staticShow = true ;
                currentQuery = $queryArea.val();
                var requestGo = paramSet.requestGo;
                requestGo.setRequestText(currentQuery);
                var auto = true;

                requestGo.requestExecute(auto);
            }) ;
        }
    } ;
    this.reshow = function() {
        userInterfaceEvents() ;
        normalQueryShow() ;
        if(currentQuery.length > 0 ) {
            $(window).click() ;
        }

    } ;

    /**
     * исполнитель изменения размера окна браузера
     * компоненты меняют размеры, если они в данный момент активны
     */
    var resize = function() {
        resizeSteps = 0;
        if (!resizeGo) {    // запустить таймер
            resizeGo = true;
            var tmpTimer = setInterval(function () {
                if (++resizeSteps >= RESIZE_TAKTS_MAX) {    // конец изменения размера
                    clearInterval(tmpTimer);
                    stampDefine();              // объект stamp   - печать
                    normalQueryShow() ;
                    smoke.smokeGo();
                    resizeGo = false;
                    resizeSteps = 0;
                    philosophyForm.resize() ;
                    scrollBackground.resize() ;
                }
            }, RESIZE_TIME_DELAY);
        }
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
     * click  по печати - планка ввода запроса
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
    var isTextClick = function(e) {
        var $block = backgroundImg.getTextAreaBlock() ;
        var top = pixelToNumber($block.css('top')) ;
        var left = pixelToNumber($block.css('left')) ;
        var w = $block.width() ;
        var h = $block.height() ;
        var x = e.pageX;
        var y = e.pageY;
        var result = (x >= left && x <= left + w && y >= top && y <= top + h)  ;
        return (x >= left && x <= left + w && y >= top && y <= top + h)  ;
     } ;
    /**
     * преобразовать строку вида 230px в число 230
     * @param strPixel
     * @returns {number}
     */
    var pixelToNumber = function (strPixel) {
        var n = strPixel.replace('px', '');
        return n - 0;
    };
}