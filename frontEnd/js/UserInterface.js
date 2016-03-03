/**
 * Контроллер для пользовательского предствления
 */
function UserInterface() {
    var smoke = new SmokeClouds();      // движение облаков
    var backgroundImg  ;                // объект - элементы изображения
    var scrollBackground ;
    var philosophyForm ;
    var magicNormalPictures ;           // фоновые картинки
    var stamp = {} ;                    // печать
    var $queryArea ;                    // область ввовда текста
    var resizeGo = false ;
    var resizeSteps = 0 ;
    var RESIZE_TIME_DELAY = 200 ;        // задержка при контроле изменения размеров
    var RESIZE_TAKTS_MAX = 1;            // число тактов, после которых фиксируются изменения размера
    var currentQuery = '' ;              // текст запроса
    var $centralCircleBlock = $('#centralCircle') ;
    var _this = this ;
    //-----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage; // объект - элементы изображения
        scrollBackground = paramSet.scrollBackground;    // "свиток" - фоновое изображение результата
        philosophyForm = paramSet.philosophyForm;
        philosophyForm.init() ;
        backgroundImg.init();                 // фоновое изображение

        scrollBackground.init();              // свиток - фон для вывода результата запроса
        magicNormalPictures = paramSet.magicNormalPictures ;
        magicNormalPictures.init() ;                  // подготовка фоновых картинок
        stampDefine();              // объект stamp   - планка для запуска запроса
//        centralCircleDefine();      // объект centralCircle - ценральный круг
        $(document).click(function (e) {
            if (isStampClick(e)) {                   // выполнение запроса
                if (philosophyForm.getFormShowFlag() === true) {
                    philosophyForm.scrollGo() ;       // развернуть свиток
                    //philosophyForm.stopShow() ;
                    //normalQueryShow() ;
                } else {
                    backgroundImg.centralCircleRotate(function() {
                        currentQuery = $queryArea.val();
                        var requestGo = paramSet.requestGo;
                        requestGo.setRequestText(currentQuery);
                        var auto = true;
                        requestGo.requestExecute(auto);
                    }) ;
                }
           } else {
                if (philosophyForm.getFormShowFlag() === true) { // click гасит форму
                    philosophyForm.stopShow();
                }
                normalQueryShow() ;
            }
        });
        $(window).on('resize', function () {      // размеры окна браузера
            resize();
        });
        smoke.init();                 // подготовка и запуск облаков
        smoke.smokeGo();
        backgroundImg.stampShow() ;   // планка, запускающая выполнение запроса
        normalQueryShow() ;
    } ;
    /**
     * подготовить поле ввода запроса
     */
    var normalQueryShow = function() {
        backgroundImg.centralCircleShow('query');
        var idText = backgroundImg.getIdText('query');
        $queryArea = $('#' + idText);
        $queryArea = $('#queryText');
        $queryArea.attr('placeholder', 'введите вопрос');


        magicNormalPictures.show() ;
        $queryArea.val(currentQuery);
        var $ball = $centralCircleBlock.children('img');
        $ball.load(function() {
            $queryArea.focus();
        }) ;

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
//                    centralCircleDefine();      // объект centralCircle - ценральный круг
                    backgroundImg.centralCircleShow('query');
                    $queryArea.attr('placeholder', 'введите вопрос');
                    $queryArea.focus();
                    smoke.smokeGo();
                    backgroundImg.stampShow() ;
                    magicNormalPictures.show() ;

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
}