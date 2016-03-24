/**
 * Фоновое изображение - "свиток", подложенный под вывод результатов запроса
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
    var scrollingFlag = false ;     // во избежании слишком бытрой прокрутки
    //---------------------//
    var _this = this ;
    //---------------------//
    this.init = function() {
        callStack = paramSet.callStack ;
        dirImg = paramSet.dirImages + '/userInterface' ;


        mainBlock = {
            place : {
                x1: 370,
                y1: 6,
                x2: 1560,
                y2: 1020
            },
            img : {
                file: 'scroll_empty.png'
            }
        } ;
        mainSizes() ;

        caption = {            // блок заголовок
            place: {
                x1:-8 ,
                y1:-10,
                x2: 1196, //mainWidth + 10 ,
                y2: 195  //186
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
                y1:150,
                x2: mainWidth - 50 ,
                y2: mainHeight - 30
            }

        } ;
        dataArea = {              // область вывода
            place: {
                x1:50,
                y1:100, // 40,
                x2: mainWidth - 50,
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
        message = {
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
           sliderYMax: mainHeight - (slider['place']['y2'] - slider['place']['y1']) -20 ,
            stop : true,
            scrollingFlag : false,
            dy: 0
        } ;

        kResizeClc() ;
        $resultBackground.attr('hidden','hidden') ;
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
       //--- подстановка шапки  ---///
        caption.img['file'] = caption.captionsTypes[scrollType]['file'] ;
        internalBlockDefine('caption',caption) ;
        $captionDiv = $('#' + mainBlockId +'_caption') ;
        var captionCross  = caption.captionCross ;
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
        var screenWidth = $(window).width() ;
        var screenHeight = $(window).height() ;
        kResize['ky'] = Math.round((screenHeight/placeHeight)*10000)/10000 ;
        var placeClcWidth = kResize['ky'] * placeWidth ;
        if (placeClcWidth > screenWidth*0.8) {
            var realWidth = Math.min(screenWidth*0.8,placeClcWidth) ;
            kResize['kx'] = Math.round((realWidth/placeWidth)*10000)/10000 ;
        } else {
            kResize['kx'] = kResize['ky'] ;
        }
    } ;
    var mainBlockDefine = function(){
        var screenWidth = $(window).width() ;
        $mainBlockDiv.css('position','absolute') ;

        $mainBlockDiv.attr('hidden','hidden') ;

        var place = mainBlock.place ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var kx = kResize['kx'] ;
        var ky = kResize['ky'] ;
        $mainBlockDiv.css('top',ky * y1) ;

        $mainBlockDiv.css('height',ky * (y2 - y1)) ;
        var width = kx * (x2 - x1) ;

        $mainBlockDiv.css('width',width) ;

        $mainBlockDiv.css('left',(screenWidth - width)/2) ;

        var imgFile = dirImg + '/' + mainBlock['img']['file'] ;
        $mainBlockDiv.css('background-image','url("' + imgFile +'")') ;
        $mainBlockDiv.css('background-repeat','no-repeat') ;
        $mainBlockDiv.css('background-size','100% 100%') ;
        $mainBlockDiv.css('z-index',10) ;
        $mainBlockDiv.css('overflow','hidden') ;


        $mainBlockDiv.show( "blind", 500);

        $resultBackground.removeAttr('hidden') ;

        formShowFlag = true ;
    } ;
    /**
     * Блок для вывода результата
     * для корректной прокрутки результата
     * потребовался промежуточный уровень mainDataBlock  в
     * дополнение к области вывода dataArea
     */
    var dataBlockDefine = function() {
        internalBlockDefine('mainDataBlock',mainDataBlock) ;
        var mainBlockId = $mainBlockDiv.attr('id') ;
        $mainDataBlockDiv = $('#' + mainBlockId +'_mainDataBlock') ;
        $mainDataBlockDiv.css('background-color','rgba(0,0,0,0)') ;   // прозрачный
        $mainDataBlockDiv.css('overflow','hidden') ;

        internalBlockDefine('dataArea',dataArea,$mainDataBlockDiv) ;


        $dataAreaDiv = $('#' + mainBlockId +'_dataArea') ;
        $dataAreaDiv.css('background-color','rgba(0,0,0,0)') ;   // прозрачный
        $dataAreaDiv.addClass('data') ;
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
    } ;
    /**
     * события прокрутки
     */
    var scrollEvents = function() {
        $(window).off('click') ;
        $mainBlockDiv.off('mousewheel') ;
        $mainBlockDiv.mousewheel(function(event, delta) {     //  колесо мыши (jquery plagin)
            var direct = Math.sign(event.deltaY) ;
            var mouseFlag = true ;
            scrollingGo(direct,mouseFlag) ;
        });
       // ------ закрытие формы   --------//
        captionClick() ;
        $(window).off('keydown') ;
        $(window).on('keydown',function(e) {
            if (e.keyCode === 27) {
                _this.exit() ;
            }
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
     * click по шапке для закрытия
     */
    var captionClick = function() {
        // ------ закрытие формы   --------//
        $captionCrossDiv.off('mouseenter mouseout') ;
       $captionCrossDiv.hover(function(e) {
            $captionCrossDiv.css('cursor', 'pointer');
        },
           function(e) {
               $captionCrossDiv.css('cursor', 'auto');
           }
       ) ;
        //$captionDiv.off('mousemove') ;
        //$captionDiv.mousemove(function(e){
        //    var x = e.pageX;
        //    var y = e.pageY;
        //    if (isExitArea(x,y)) {
        //        $captionDiv.css('cursor','pointer') ;
        //    } else {
        //        $captionDiv.css('cursor','auto') ;
        //    }
        //}) ;
        $captionCrossDiv.off('click') ;
        $captionCrossDiv.click(function(e) {
                _this.exit() ;
        }) ;

    } ;
    /**
     * область закрытия свитка (символ "X")
     * @param x
     * @param y
     * @returns {boolean}
     */
    var isExitArea = function(x,y) {
        var ky = kResize['ky'] ;
        var kx = kResize['kx'] ;
        var left = kx * mainBlock['place']['x1'] ;
        var width = kx *(mainBlock['place']['x2'] -  mainBlock['place']['x1']) ;
        var top = ky * mainBlock['place']['y1'] ;
        var height =  ky *(caption['place']['y2'] -  caption['place']['y1']) ;
        return ((x - left) >= 0.7 * width && (y - top) <= 0.6 * height) ;

    } ;
    /**
     * выход из формы
     */
    this.exit = function() {
        $mainBlockDiv.hide( "blind", 500,function()  {
            setTimeout(function() {
                $mainBlockDiv.removeAttr( "style" ).hide().fadeIn();
                $scrollLineDiv.attr('hidden','hidden') ;     // появлялась после сворачивания свитка
//-- фон тает после исчезновения свитки
                $resultBackground.hide( "fade", 1000,function()  {
                    setTimeout(function() {
                        $resultBackground.removeAttr( "style" );   // .hide();       //.fadeIn();
                        $resultBackground.attr( "hidden",'hidden') ;

                        scrolling.stop = true ;
                        formShowFlag = false ;
                        $(window).off('keydown') ;
                        callStack.currentGo() ;
                    }), 1000});

            }), 1000});
    } ;
    /**
     * начальные атрибуты прокрутки (объект scrolling = {})
     */
    var scrollingBegin = function() {
        scrolling.stop = (scrolling.dyHidden <= 0) ;
        scrolling.scrollingFlag = false ;
        var height = slider.place['y2'] - slider.place['y1'];
        scrolling.sliderYMin = kResize['ky'] * slider.place['y1'];
        scrolling.sliderYMax = kResize['ky'] * (mainHeight - height) - 35;
        scrolling.pageY = 0 ;
        scrolling.pageY0 = 0 ;
        scrolling.sliderY = pixelToNumber($sliderDiv.css('top'));
        scrolling.sliderY0 = pixelToNumber($sliderDiv.css('top'));
        scrolling.dataAreaY0 = pixelToNumber($dataAreaDiv.css('top'));
        scrolling.dataAreaY = scrolling.dataAreaY0 ;
        scrolling.wheelMoving = 0 ;
        scrolling.kdyDataArea =
                   scrolling.dyHidden / (scrolling.sliderYMax - scrolling.sliderYMin) ;
        var topData = scrolling.dataAreaY0  ; //+
//            scrolling.kdyDataArea  ; //* (scrolling.sliderY - scrolling.sliderY0);
        $dataAreaDiv.css('top',topData) ;
    } ;
    /**
     * реакция на 1 шаг вращения колеса мыши
     * @param e
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
        left  = ((dataWidth - 80)- width)/2 ;
        $vinDiv.css('width',dataWidth) ;

        var vinDivHeight = place['y2'] + 60 ;
        $vinDiv.css('height',vinDivHeight) ;
        var height = place['y2'] ;
        var top = (vinDivHeight - height)/2 ;

        $img.css('margin-top',top) ;
        $img.css('margin-left',left) ;
        $img.css('width',width) ;
        $img.css('height',height) ;
//        $liItem.append($vinDiv) ;
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

            internalBlockDefine('mainDataBlock',mainDataBlock) ;
            internalBlockDefine('dataArea',dataArea,$mainDataBlockDiv) ;


            var screenWidth = $(window).width();
            var place = mainBlock.place;
            var x1 = place['x1'];
            var x2 = place['x2'];
            var y1 = place['y1'];
            var y2 = place['y2'];
            var kx = kResize['kx'];
            var ky = kResize['ky'];
            $mainBlockDiv.css('top', ky * y1);

            $mainBlockDiv.css('height', ky * (y2 - y1));
            var width = kx * (x2 - x1);

            $mainBlockDiv.css('width', width);

            $mainBlockDiv.css('left', (screenWidth - width) / 2);
            //
            dataAreaHiddenClc() ;
            scrollingShow() ;
            scrollingBegin() ;

            internalBlockDefine('dataArea',dataArea) ;

            internalBlockDefine('scrollLine', scrollLine);
            internalBlockDefine('slider', slider);

            internalBlockDefine('caption', caption);
            var captionCross = caption.captionCross ;
            internalBlockDefine('captionCross',captionCross,$captionDiv) ;


            var classFLag = true ;
            vinjetkaShow(classFLag) ;

        }
    }
}