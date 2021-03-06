/**
 * Фоновое изображение - "свиток", подложенный под вывод результатов запроса
 * компоненты: шапка, область данных, линия прокрутки, бегунок
 */
function ScrollBackground() {
    var callStack ;               // стек вызовов
    var mainBlock = {} ;           // главный блок
    var mainDataBlock = {} ;     // окно для скроллтрования содержимого
    var caption = {} ;           // шапка - заголовок свитка
    var dataArea = {} ;            // область данных
    var scrollLine = {} ;          // линия скролирования
    var slider = {} ;              // бегунок
    var message = {} ;             // сообщения (для отладки)
    var vinjetka = {} ;
    var scrollType ;        // тип свитка задаёт текст шапки(ответ | предсказание)
    var SCROLL_TYPE_ANSWER = 'answer' ;
    var SCROLL_TYPE_ORACLE = 'oracle' ;
     var mainWidth ;
    var mainHeight ;
    var rightMargin ;
    var $mainBlockDiv = $('#resultBlockNew') ;
    var $resultBackground = $('#resultBackground') ;
    var MAIN_BLOCK_CSS_CLASS = 'result' ;
    var DATA_AREA_CSS_CLASS = 'data' ;
    var $captionDiv ;           // шапка - заголовок свитка
    var $captionCrossDiv ;      // символ - закрытие свитка
    var $dataAreaDiv ;            // область данных
    var $mainDataBlockDiv ;       // подложка для прокрутки результата
    var $dataErrorBox ;
    var $dataHumanBox ;
    var $dataList ;
    var $scrollLineDiv ;          // линия скролирования
    var $messageDiv ;
    var $sliderDiv ;              // бегунок
    var $scrollLine ;
    var kResize = {kx: 1, ky:1} ; // коэффициенты пересчёта по размеру экрана
    var dirImg ;
    var scrolling = {} ;         // текущая прокрутка
    var formShowFlag = false ;
    var preloadIimages = [] ;        // список изображений для preload
    var cashImages = [] ;
    var currentWindowWidth ;         // текущий размер экрана
    var currentWindowHeight ;
    //---------------------//
    var _this = this ;
    //---------------------//
    this.init = function() {
        callStack = paramSet.callStack ;
        dirImg = paramSet.dirImages + '/userInterface' ;


        mainBlock = {
            place : {
                x1: 370,
                y1: 8,
                x2: 1560,
                y2: 1020 -2
            },
            img : {
                file: 'scroll_empty.png'
            }
        } ;
        mainSizes() ;

        caption = {            // блок заголовок
            place: {
                x1:-8 ,
                y1:-10 + 2  ,
                x2: 1196, //mainWidth + 10 ,
                y2: 195 -5 -5 -5  //186
            },
            captionsTypes: {
                answer: {
                    file:'scroll_caption_answer_1.png'
                },
                oracle: {
                    file:'scroll_caption_oracle_1.png'
                }
            },
            img : {
                file: 'scroll_caption.png',
                fileAnswer:'scroll_caption_answer.png'
            },
            captionCross: {
                place: {
                    x1: mainWidth - 100 + 20 +10 - 5 -5,
                    y1: 40 + 20 -10 + 5 -2,
                    x2: mainWidth - 100 + 20 + 10 -5 -5 + 32 ,
                    y2: 72 +20 -10 +5 -2
                },
                img: {
                    file: 'caption_cross.png'
                }
            }

        } ;
        mainDataBlock = {           // блок вывода данных
            place: {
                x1:50 ,
                y1:150 - 50 -10,
                x2: mainWidth - 50 ,
                y2: mainHeight - 30
            }

        } ;
        dataArea = {              // область вывода
            place: {
                x1:50, // 50,
                y1:100, // 40,
                x2: mainWidth - 50 - 50,
                y2: undefined
            },
            data: {

            }
        } ;
        slider = {             // бегунок - индикатор скроллирование
            place: {
                x1:mainWidth - 50,
                y1:126,
                x2:mainWidth - 50 + 6,
                y2: 126 + 277,
                y1Max : mainHeight - 277 -10 - 100 - 10
            },
            img : {
                file: 'slider_new.png'
            }
        } ;
        scrollLine = {         // линия скроллирования
            place: {
                x1:mainWidth - 50,
                y1:126,
                x2: mainWidth - 50 + 6 ,
                y2: mainHeight - 30 //20 // 10

            },
            background : {
                img: {
                    file: 'scroll_line_new.png'
                },
                repeat: 'repeat-y'


            }
        } ;
        message = {              // область вывода отладочных ссобщений
            place: {
                x1: 100,
                y1: 200,
                x2: 600,
                y2: 600
            }
        } ;

        vinjetka = {                // разделитель блоков вывода результата
            place: {
                x1: (mainWidth - 333)/2 ,
                y1: 0,
                x2: (mainWidth - 333)/2 + 333,
                y2: 42
            },
            img : {
                file: 'vinjetka.png'
            }


        } ;


        scrolling = {        // сотояние прокрутки
           stepDy : 20,
           pageY : 0,
           pageY0 : 0,
            sliderY: 0 ,
            sliderY0: 0 ,
            dataAreaY0: 0,
            dataAreaY: 0,
            dyHidden: 0 ,
            kdyDataArea : 1,
            wheelMoving :0 ,
           sliderYMin : caption['place']['y2'],
           sliderYMax: mainHeight - (slider['place']['y2'] - slider['place']['y1']) + 40, // -20 + 10 + 20 ,
            stop : true,
            scrollingFlag : false,
            dy: 0
        } ;

        kResizeClc() ;
        $resultBackground.attr('hidden','hidden') ;
        preloadIimages[0] = mainBlock.img.file ;
        preloadIimages[1] = caption.captionsTypes.answer.file ;
        preloadIimages[2] = caption.captionsTypes.oracle.file ;
        preloadIimages[3] = caption.captionsTypes.oracle.file ;
        preloadIimages[4] = caption.captionCross.img.file ;
        preloadIimages[5] = vinjetka.img.file ;
        preloadIimages[6] = slider.img.file ;
        preloadIimages[7] = scrollLine.background.img.file ;
         preload() ;

    } ;
    /**
     * предподготовка элементов свитка
     */
    var preload = function() {
       for (var i = 0; i < preloadIimages.length; i++)  {
            cashImages[i] = new Image() ;
           cashImages[i].src = dirImg + '/' + preloadIimages[i] ;
       }
    } ;
    /**
     * размеры главного блока
     */
    var mainSizes = function() {
        var place = mainBlock['place'] ;
        mainWidth = place['x2'] - place['x1'] ;
        mainHeight = place['y2'] - place['y1'] ;
        rightMargin = 80 ;
    } ;
    /**
     * топология - порядок вывода блоков имеет значение
     */
    var defineTopology = function() {
        $mainBlockDiv.empty() ;
        mainBlockDefine() ;

        var mainBlockId = $mainBlockDiv.attr('id') ;

        dataBlockDefine() ;
        internalBlockDefine('scrollLine',scrollLine) ;
        internalBlockDefine('slider',slider) ;
       //--- подстановка шапки по типу ---///
        caption.img['file'] = caption.captionsTypes[scrollType]['file'] ;
        internalBlockDefine('caption',caption) ;
        $captionDiv = $('#' + mainBlockId +'_caption') ;
        var captionCross  = caption.captionCross ;                       // блок - крест закрытия свитка
        internalBlockDefine('captionCross',captionCross,$captionDiv) ;
        $captionCrossDiv = $('#' + mainBlockId +'_captionCross') ;
 //       internalBlockDefine('message',message) ;  // только для отладки
        $sliderDiv = $('#' + mainBlockId +'_slider') ;
        $scrollLineDiv = $('#' + mainBlockId +'_scrollLine') ;
        $messageDiv = $('#' + mainBlockId +'_message') ;
        $scrollLine = $('#' + mainBlockId +'_scrollLine') ;
        scrollEvents() ;
    } ;
    /**
     * пересчёт размеров под размер окна браузера
     */
    var kResizeClc = function() {
        var place = mainBlock['place'] ;
        var placeHeight = place['y2'] - place['y1'] ;
        var placeWidth =  place['x2'] - place['x1'] ;
        currentWindowHeight = $(window).height() ;
        currentWindowWidth = $(window).width() ;
        kResize['ky'] = Math.round((currentWindowHeight/placeHeight)*10000)/10000 ;
        var placeClcWidth = kResize['ky'] * placeWidth ;
        if (placeClcWidth > currentWindowWidth*0.8) {
            var realWidth = currentWindowWidth*0.8 ;
            kResize['kx'] = Math.round((realWidth/placeWidth)*10000)/10000 ;
        } else {
            kResize['kx'] = kResize['ky'] ;
        }
    } ;
    this.getKResize = function() {
        kResizeClc() ;
        return kResize ;
    } ;
    this.getMainBlockSize = function() {
        var place = mainBlock.place ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var height =  y2 - y1 ;
        var width =  x2 - x1 ;
        return {w:width, h: height}
    } ;
    var mainBlockDefine = function(){
        $mainBlockDiv.attr('hidden','hidden') ;
        mainBlockRealPlace() ;
        $mainBlockDiv.show( "blind", 1000);
        $resultBackground.removeAttr('hidden') ;
        formShowFlag = true ;
    } ;
    /**
     * размеры, пересчитанные на размер экрана
     */
    var mainBlockRealPlace = function() {
        var place = mainBlock.place ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var kx = kResize['kx'] ;
        var ky = kResize['ky'] ;

        $mainBlockDiv.removeClass() ;
        $mainBlockDiv.addClass(MAIN_BLOCK_CSS_CLASS) ;

        $mainBlockDiv.css('top',ky * y1) ;
        $mainBlockDiv.css('height',ky * (y2 - y1)) ;
        var width = kx * (x2 - x1) ;
        $mainBlockDiv.css('width',width) ;
        $mainBlockDiv.css('left',(currentWindowWidth - width)/2) ;
    } ;
    /**
     * Блок для вывода результата
     * для корректной прокрутки результата
     * потребовался промежуточный уровень mainDataBlock  в
     * дополнение к области вывода dataArea
     * dataArea  - это список блоков результата
     */
    var dataBlockDefine = function() {
        internalBlockDefine('mainDataBlock',mainDataBlock) ;
        var mainBlockId = $mainBlockDiv.attr('id') ;
        $mainDataBlockDiv = $('#' + mainBlockId +'_mainDataBlock') ;
        $mainDataBlockDiv.css('background','transparent') ;   // прозрачный

        $mainDataBlockDiv.css('overflow','hidden') ;

        internalBlockDefine('dataArea',dataArea,$mainDataBlockDiv) ;
        $dataAreaDiv = $('#' + mainBlockId +'_dataArea') ;
        $dataAreaDiv.css('background','transparent') ;   // прозрачный
//        $dataAreaDiv.addClass('data') ;

        $dataAreaDiv.addClass(DATA_AREA_CSS_CLASS) ;

        var $pHuman = $('<p/>') ;
        $pHuman.attr('id','dataHuman') ;
//        $dataAreaDiv.append($pHuman) ;  // отказались

        $dataList = $('<ul/>') ;
        $dataList.attr('id','dataList') ;
        $dataAreaDiv.append($dataList) ;

        $dataErrorBox = $("#" + 'dataErrorBox') ;
        $dataHumanBox = $("#" + 'dataHuman') ;
        $dataList =  $("#" + 'dataList') ;

    } ;
    /**
     * по умолчанию внутренние блоки вкладываются в mainBlock
     * за исключением случая прямого указания $otherMainBlock
     * @param blockName
     * @param block
     * @param $otherMainBlock - альтернативный внешний блок
     */
    var internalBlockDefine = function(blockName,block,$otherMainBlock) {
        var mainId = $mainBlockDiv.attr('id') ;
        var place = block['place'] ;
        var blkId = mainId+'_'+blockName ;
        var $blk = $('#' + blkId) ;
        if ($blk.length === 0) {       // что бы повторно не создавать
            $blk = $('<div/>') ;
            $blk.attr('id',blkId) ;
            if ($otherMainBlock !== undefined) {
                $otherMainBlock.append($blk) ;
            }else {
                $mainBlockDiv.append($blk) ;
            }

        }
        $blk.css('position','absolute') ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var kx = kResize['kx'] ;
        var ky = kResize['ky'] ;
        var width = kx * (x2 - x1) ;
        var height = (y2 === undefined) ? undefined :ky * (y2 - y1) ;
        $blk.css('top',ky * y1) ;
        $blk.css('left',kx * x1) ;
        if (block['img'] !== undefined) {                 // блок включает картинку
            var imgFile = dirImg + '/' + block['img']['file'];
            var $img = $('#'+blkId + ' img') ;
            if($img.length === 0) {
               $img = $('<img/>');
                $blk.append($img);
                $img.attr('src', imgFile);
            }

            $img.css('width', width);
            if (height !== undefined) {
                $img.css('height', height);
            }
        } else {
            $blk.css('width', width);
            $blk.css('height', height);
        }
        if (block['background'] !== undefined) {       // блок имеет фоновое изображение

            var background = block['background'] ;
            var imgFile = dirImg + '/' + background['img']['file'];
            $blk.css('width', width);
            $blk.css('height', height);

            $blk.css('background-image','url("' + imgFile +'")') ;
            if (background['repeat'] !== undefined) {

                $blk.css('background-repeat',background['repeat']) ;
            }else {
                $blk.css('background-repeat','no-repeat') ;
                $blk.css('background-size','100% 100%') ;
            }
        }
        if (block['refer'] !== undefined) {

        }
    } ;
    /**
     * события прокрутки
     */
    var scrollEvents = function() {
        $(window).off('click') ;
        $mainBlockDiv.off('mousewheel') ;
        $mainBlockDiv.mousewheel(function(event, delta) {     //  колесо мыши (jquery plagin)
            var direct = Math.sign(event.deltaY) ;            //  направление прокрутки(-1 - вниз,+1 - вверх)
            var mouseFlag = true ;
            scrollingGo(direct,mouseFlag) ;
        });
       // ------ закрытие формы   --------//
        captionClick() ;
        $(window).off('keydown') ;
        $(window).on('keydown',function(e) {           // управление клавишами
            //if (e.keyCode === 27) {
            //    _this.exit() ;
            //}
            switch (e.keyCode) {
                case 27 :
                    _this.exit() ;
                    break ;
                case 40 :                // down
                    scrollingGo(-1) ;
                    break ;
                case 38 :               // up
                    scrollingGo(+1) ;
                    break ;
            }
        }) ;
    } ;
    /**
     * click по кресту на шапке для закрытия
     */
    var captionClick = function() {
         $captionCrossDiv.off('click') ;
        $captionCrossDiv.click(function(e) {
                _this.exit() ;
        }) ;

    } ;
    /**
     * выход из формы
     */
    this.exit = function() {
        $mainBlockDiv.hide( "blind", 500,function()  {
            setTimeout(function() {
                $mainBlockDiv.removeAttr( "style" ).hide().fadeIn();
                $scrollLineDiv.attr('hidden','hidden') ;     // появлялась после сворачивания свитка
                $dataAreaDiv.attr('hidden','hidden') ;       // что-то отсвечивало перед исчезновением
                $captionDiv.attr('hidden','hidden') ;        // что-то отсвечивало перед исчезновением
//-- фон тает после исчезновения свитки
                $resultBackground.hide( "fade", 1000,function()  {
                    setTimeout(function() {
                        $resultBackground.removeAttr( "style" );   // .hide();       //.fadeIn();
                        $resultBackground.attr( "hidden",'hidden') ;

                        scrolling.stop = true ;
                        formShowFlag = false ;
                        $(window).off('keydown') ;
                        callStack.currentGo() ;         // продолжение работы
                    }), 1000});

            }), 1000});
    } ;
    /**
     * начальные атрибуты прокрутки (объект scrolling = {})
     * прокрутка выполняется если есть область прокрутки(scrolling.dyHidden > 0 )
     * scrolling.kdyDataArea - коэффициент пересчёта премещений бегунка в прокрутку области данных
     */
    var scrollingBegin = function() {
        scrolling.stop = (scrolling.dyHidden <= 0) ;
        scrolling.scrollingFlag = false ;
        var height = slider.place['y2'] - slider.place['y1'];
        scrolling.sliderYMin = kResize['ky'] * slider.place['y1'];
        scrolling.sliderYMax = kResize['ky'] * (mainHeight - height - 35 + 5 );
        scrolling.pageY = 0 ;
        scrolling.pageY0 = 0 ;
        scrolling.sliderY0 = pixelToNumber($sliderDiv.css('top'));
        scrolling.sliderY = scrolling.sliderY0 ;     // текущее положение

        scrolling.dataAreaY0 = pixelToNumber($dataAreaDiv.css('top'));
        scrolling.dataAreaY = scrolling.dataAreaY0 ;
        scrolling.wheelMoving = 0 ;
        scrolling.kdyDataArea =
                   scrolling.dyHidden / (scrolling.sliderYMax - scrolling.sliderYMin) ;
        var topData = scrolling.dataAreaY0  ;
        $dataAreaDiv.css('top',topData) ;
    } ;
    /**
     *
     * @param yDirection   - направление движения (-1 - вниз, +1 - вверх)
     * @param mouseFlag    - сигнал от мыши, иначе клавиша
     */
    var scrollingGo = function(yDirection,mouseFlag) {
        if (!scrolling.stop ) {
            if (mouseFlag !== undefined && mouseFlag) {     // задержка для мыши
                if (scrolling.scrollingFlag) {
                    return  ;
                }
                var timeout_id = setTimeout( function() {
                    clearTimeout(timeout_id) ;} , 2000) ;
            }
            scrolling.scrollingFlag = true ;
            var wheelSteps = 10 ;    // число вращений колеса мыши
            var maxDy = 10 ;//20 ;
            var minDy = 10 ;
 //           scrolling.pageY = e.pageY;
            var dyMin = Math.round(scrolling.dyHidden/wheelSteps) ;
            dyMin = Math.min(dyMin,maxDy) ;
            dyMin = Math.max(dyMin,minDy) ;

            if (scrolling.kdyDataArea * dyMin > 50) {
                dyMin  = 50/scrolling.kdyDataArea ;
            }
            var eDy = yDirection * dyMin ;

            scrolling.dy = eDy ;


            var newMoving = scrolling.wheelMoving + eDy ;
            var top = scrolling.sliderY0 - newMoving ;


            if (top > scrolling.sliderYMax) {
                newMoving = newMoving + (top - scrolling.sliderYMax) ;
                top = scrolling.sliderYMax ;
            }
            if (top < scrolling.sliderYMin) {
                top = scrolling.sliderYMin ;
                newMoving = 0 ;
            }

            scrolling.wheelMoving = newMoving   ;    //   - deltaMoving ;
            $sliderDiv.css('top', top);
            scrolling.sliderY =  top ;       //      pixelToNumber($sliderDiv.css('top')) ;
            var topData = scrolling.dataAreaY0 -
                scrolling.kdyDataArea * (scrolling.sliderY - scrolling.sliderY0);

            if (yDirection > 0 ) {     // вверх
                if (topData > scrolling.dataAreaY0 ) {
                    topData = scrolling.dataAreaY0 ;
                }
            }
            if (yDirection < 0 ) {     // вниз
                var bottom = topData + $dataAreaDiv.height() ;
                if (bottom  < 30)  {
                    topData  = 30 - $dataAreaDiv.height() ;
                }
            }

            $dataAreaDiv.css('top',topData) ;
            scrolling.scrollingFlag = false ;
        }
 //       scrollingDebug() ;
  } ;
    /**
     * расчёт не видимой части выведенных данных
     */
    var dataAreaHiddenClc = function() {
        var mainPlace = mainDataBlock.place ;
        var dataPlace = dataArea.place ;
        var dyShow = kResize['ky'] * (mainPlace['y2'] - mainPlace['y1'] - dataPlace['y1']) ;
        var dyHidden = $dataAreaDiv.height() - dyShow +50; //100;
        dyHidden = Math.max(0,dyHidden) ;
        scrolling.dyHidden = dyHidden ;
        return dyHidden ;
    } ;
    /**
     * показать прокрутку перемещением бегунка
     */
    var scrollingShow = function() {
        if (scrolling.dyHidden === 0 ) {
           //-- убрать scrolling
            $sliderDiv.attr('hidden','hidden') ;
            $scrollLineDiv.attr('hidden','hidden') ;
        }else {
            $sliderDiv.removeAttr('hidden') ;
            $scrollLineDiv.removeAttr('hidden') ;
        }
    } ;
    this.show = function() {
        kResizeClc() ;
        defineTopology() ;
    } ;
    /**
     * преобразовать строку вида 230px в число 230
     * @param strPixel
     * @returns {number}
     */
    var pixelToNumber = function(strPixel) {
        var n = strPixel.replace('px','') ;
        return n - 0 ;
    } ;
    /**
     * вывод параметров для отладки
     */
    var scrollingDebug = function() {
        $messageDiv.empty() ;
        var $p = $('<p/>') ;
        $p.css('background-color','#CAD752') ;
        $p.css('paddind','10') ;
        $messageDiv.append($p) ;
        var text  = 'stepDy : ' + scrolling.stepDy+'<br>' ;
        $p.append(text) ;
        text  = 'pageY : ' + scrolling.pageY+'<br>' ;
        $p.append(text) ;
        text  = 'pageY0 : ' + scrolling.pageY0+'<br>' ;
        $p.append(text) ;
        text  = 'sliderY : ' + scrolling.sliderY+'<br>' ;
        $p.append(text) ;
        text  = 'sliderY0 : ' + scrolling.sliderY0+'<br>' ;
        $p.append(text) ;
        text  = 'sliderYMin : ' + scrolling.sliderYMin+'<br>' ;
        $p.append(text) ;
        text  = 'sliderYMax : ' + scrolling.sliderYMax+'<br>' ;
        $p.append(text) ;
        text  = 'stop : ' + ((scrolling.stop) ? 'true' : 'false') +'<br>' ;
        $p.append(text) ;
        text  = 'kDy : ' + scrolling.kdyDataArea +'<br>' ;
        $p.append(text) ;
            text  = 'wheelMoving : ' + scrolling.wheelMoving  +'<br>' ;
            $p.append(text) ;
        scrolling.dy
        text  = 'scrolling.dy : ' + scrolling.dy  +'<br>' ;
        $p.append(text) ;

    } ;
    /**
     * начало вывода пустая форма
     * type - определяет текст шапки
     */
    this.answerInit = function(type) {
        type = (type === undefined) ? SCROLL_TYPE_ANSWER : type ;
        scrollType = type ;
        kResizeClc() ;
        defineTopology() ;
        // запустить диаграмму
        $mainBlockDiv.css('cursor','progress') ;
        dataAreaHiddenClc() ;
        scrollingShow() ;
        scrollingBegin() ;

    } ;
    /**
     * запрос определён ->  вернуть курсор в обычное состояние
     */
    this.answerBegin = function() {
        $mainBlockDiv.css('cursor','default') ;
    } ;
    this.putError = function(textError) {
        $dataErrorBox.append('<strong>'+textError + '</strong>') ;
    } ;
    /**
     * количество найденных ответов
     * отказались от вывода
     * @param totalHumanText
     */
    this.putTotalHuman = function(totalHumanText) {
 //       $dataHumanBox.append('<strong>'+totalHumanText + '</strong>') ;
    } ;
    /**
     * вывод блока ответа - элемента списка
     * при этом пересчитываются параметры прокрутки( неизветно является ли блок последним)
     * @param $liItem
     * @vinFlag - выводить виньетку после блока данных
     */
    this.putAnswerItem = function($liItem,vinFlag) {
        vinFlag = (vinFlag === undefined) ? true : vinFlag ;
        $dataList.append($liItem) ;
        if (vinFlag) {
            var $vinDiv = vinjetkaShow() ;
            $dataList.append($vinDiv) ;
        }

        dataAreaHiddenClc() ;
        scrollingShow() ;
        scrollingBegin() ;
    } ;
    /**
     * разделитель блоков ответа
     * может использоваться для перевывода с classFlag === true
     * @param classFlag
     * @returns {*|jQuery|HTMLElement}
     */
    var vinjetkaShow = function(classFlag) {
        classFlag = (classFlag === undefined) ? false : classFlag ;
        if (!classFlag) {
            var $vinDiv = $('<div class="vinjetka_div"/>') ;
            var $img = $('<img class="vinjetka_img"/>') ;
            var pictFile = dirImg + '/' +vinjetka['img']['file'] ;
            $img.attr('src',pictFile) ;
            //       $vinDiv.css('position','absolute') ;
            $vinDiv.append($img) ;
        }else {                           // для класса
            $vinDiv = $('.vinjetka_div') ;
            $img = $('.vinjetka_img') ;
        }

        var place = vinjetka['place'] ;
        var height = kResize['ky'] * (place['y2'] - place['y1']) ;
        var left  = kResize['kx'] * place['x1'] ;
        var width = kResize['kx'] * (place['x2'] - place['x1']) ;

        var dataWidth = $dataAreaDiv.width() ;
        left  = (dataWidth - width)/2 ;
        $vinDiv.css('width',dataWidth) ;

        var vinDivHeight = place['y2'] + 60 ;
        $vinDiv.css('height',vinDivHeight) ;
        var height = place['y2'] ;
        var top = (vinDivHeight - height)/2 ;

        $img.css('margin-top',top) ;
        $img.css('margin-left',left) ;
        $img.css('width',width) ;
        $img.css('height',height) ;
        if (!classFlag) {
            return $vinDiv ;
        }

    } ;
    /**
     * конец вывода ответа
     */
    this.answerEnd = function() {

    };
    this.getDataAreaWidth = function() {
       return $dataAreaDiv.width() ;
    } ;
    /**
     *   перевывод при изменении размера окна браузера
     */
    this.resize = function() {
        if (formShowFlag) {
            kResizeClc();
            mainBlockRealPlace() ;
// -- перестраиваем блоки данных  ---   //
            internalBlockDefine('mainDataBlock', mainDataBlock);
            internalBlockDefine('dataArea', dataArea, $mainDataBlockDiv);

            dataAreaHiddenClc();
            scrollingShow();
            scrollingBegin();

//            internalBlockDefine('dataArea', dataArea);

            internalBlockDefine('scrollLine', scrollLine);
            internalBlockDefine('slider', slider);

            internalBlockDefine('caption', caption);
            var captionCross = caption.captionCross;
            internalBlockDefine('captionCross', captionCross, $captionDiv);


            var classFLag = true;
            vinjetkaShow(classFLag);

        }
    }
}