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
    var placeholder ;                   // имитатор placeholder
    var actionSteps ;                   // отслеживание шагов действия
    var logger ;                        // отладочные сообщения
    var geoLocation ;                   // ближайший город
    var stamp = {} ;                    // планка - ввод запроса
    var $stamp = $('#stamp') ;
    var $queryArea ;                    // область ввовда текста
    var resizeGo = false ;
    var RESIZE_TIME_DELAY = 10 ;        // задержка при контроле изменения размеров
    var currentQuery = '' ;              // текст запроса
    var $centralCircleBlock = $('#centralCircle') ;  // центральный круг
    var $centralCircleTextBlock = $('#centralCircleText') ; // текст в круге
    var $placeholder ;
    var _this = this ;
    //-----------------------------------//
    this.init = function() {
        logger = paramSet.logger ;
        logger.init() ;
        geoLocation = paramSet.geoLocation ;
        geoLocation.init() ;
        actionSteps = paramSet.actionSteps ;
        placeholder = paramSet.placeholder ;
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
        $placeholder = $('#placeholder') ;
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
            stampClickGo() ;             // запуск запроса
        }) ;
        // - отменяем mousedown для блоков - облаков
        $('*').off('mousedown') ;
        $('*').on('mousedown',function(e){
            var targetId = e.currentTarget.id;
            //           alert('targetId:' + target.id) ;
            if (targetId == 'smokeClouds') {
                currentQuery = $queryArea.val();
                e.preventDefault();
            }
        }) ;
        // click - должен открывать ввод текста запроса
        $(window).off('click') ;
        $(window).click(function (e) {
            placeholder.hide() ;
        });
        $(window).off('resize') ;
        $(window).on('resize', function () {      // размеры окна браузера
            resize();
        });
        // нажатая клавиша передаётся в текст запроса
            $(document).off('keydown') ;
            $(document).keydown(function(e) {
                placeholder.hide();
            }) ;
   } ;
    /**
     * подготовить поле ввода запроса
     */
    var normalQueryShow = function() {
        backgroundImg.stampShow('query') ;   // планка, запускающая выполнение запроса
        backgroundImg.centralCircleGlowShow() ;
        backgroundImg.centralCircleShow('query');
        $queryArea = $('#queryText');
        $queryArea.off('keydown') ;
        $queryArea.on('keydown',function(e) {   // enter - запускает выполнение
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
        currentQuery = currentQuery.replace(/\r/,'') ;
        currentQuery = currentQuery.replace(/\f/,'') ;
        currentQuery = currentQuery.replace(/\n/,'') ;
        currentQuery = currentQuery.trim() ;

        $queryArea.val(currentQuery);

        var to = setTimeout(function() {
            clearTimeout(to) ;
            if (currentQuery.length === 0) {
                placeholder.show() ;
            }else {
                placeholder.hide() ;
            }
        },20) ;
    } ;
    /**
     * click по планке "ответ" -> процесс "раздумья" -
     * центральный круг и картинки вращаются
     * запуск выполнения запроса
     * остановка вращения происходит запущенный процесс
     * сообщит о готовности данных для вывода -  actionSteps.isConditionPrepare()
     * или аварийном завершении - actionSteps.isConditionBreak()
     */
    var stampClickGo = function() {
// запускаем процесс
        actionSteps.init();
        currentQuery = $queryArea.val();


        var staticShow = false;
        magicNormalPictures.show(staticShow);

        backgroundImg.centralCircleRotate(function () {  // процесс раздумья
            var stopThinking = (
            actionSteps.isConditionBreak() || actionSteps.isConditionPrepare() );
            if (!stopThinking) {     // рано останавливаться
                return false;
            }
            var staticShow = true;
            magicNormalPictures.show(staticShow);
            actionSteps.stepGo();    // продолжение действия
            return true ;
        });
        var requestGo = paramSet.requestGo;
        requestGo.setRequestText(currentQuery);
        var auto = true;

        requestGo.requestExecute(auto);

        //}
    } ;
    this.reshow = function() {
        userInterfaceEvents() ;
        normalQueryShow() ;
   } ;
    var resize = function() {
        if (!resizeGo) {    // запустить таймер
            resizeGo = true;
            var tmpTimer = setInterval(function () {
                if (!backgroundImg.isResize()) {
                    clearInterval(tmpTimer);
                    resizeGo = false;
                }else {
                    backgroundImg.setCurrentSize() ;
                    stampDefine();              // объект stamp   - печать
//                    normalQueryShow() ;
                    smoke.smokeGo();
                    normalQueryShow() ;
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