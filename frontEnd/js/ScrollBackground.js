/**
 * Фоновое изображение - "свиток", подложенный под вывод результатов запроса
 */
function ScrollBackground() {
    var mainBlock = {} ;           // главный блок
    var caption = {} ;           // шапка - заголовок свитка
    var dataArea = {} ;            // область данных
    var scrollLine = {} ;          // линия скролирования
    var slider = {} ;              // бегунок
    var message = {} ;             // сообщения (для отладки)
    var mainWidth ;
    var mainHeight ;
    var rightMargin ;
    var $mainBlockDiv = $('#resultBlockNew') ;
    var $resultBackground = $('#resultBackground') ;

    var $CaptionDiv ;           // шапка - заголовок свитка
    var $dataAreaDiv ;            // область данных
    var $dataErrorBox ;
    var $dataHumanBox ;
    var $dataList ;
    var $scrollLineDiv ;          // линия скролирования
    var $messageDiv ;
    var $sliderDiv ;              // бегунок
    var kResize = {kx: 1, ky:1} ; // коэффициенты пересчёта по размеру экрана
    var dirImg ;
    var scrolling = {} ;         // текущая прокрутка
    var formShowFlag = false ;
    //---------------------//
    var _this = this ;
    //---------------------//
    this.init = function() {
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
        caption = {
            place: {
                x1: 0 ,
                y1:-10,
                x2: mainWidth + 10 ,
                y2: 186
            },
            img : {
                file: 'scroll_caption.png'
            }
        } ;

        dataArea = {
            place: {
                x1:50 ,
                y1:186,
                x2: 1484 - 370 - 25 ,
                y2: undefined
            },
            data: {

            }
        } ;
        slider = {
            place: {
                x1:1484 - 370 -30 ,
                y1:126,
                x2: 1530 - 370 -30 ,
                y2: 422,
                y1Max : mainHeight - (422 - 126) -10
            },
            img : {
                file: 'slider.png'
            }
        } ;
        scrollLine = {
            place: {
                x1:1500 - 370 -50 ,
                y1:126,
                x2: 1530 - 370 - 50,
                y2: mainHeight - 30

            },
            background : {
                img: {
                    file: 'scroll_line.png'
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
           sliderYMax: mainHeight - (slider['place']['y2'] - slider['place']['y1']) ,
            stop : true
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
    var defineTopology = function() {
        $mainBlockDiv.empty() ;
        mainBlockDefine() ;

        dataBlockDefine() ;
        internalBlockDefine('scrollLine',scrollLine) ;
        internalBlockDefine('slider',slider) ;
        internalBlockDefine('caption',caption) ;
        internalBlockDefine('message',message) ;
         var mainBlockId = $mainBlockDiv.attr('id') ;
        $CaptionDiv = $('#' + mainBlockId +'_caption') ;
        $sliderDiv = $('#' + mainBlockId +'_slider') ;
        $sliderDiv.attr('title','click в начале и в конце перемещения') ;
        $scrollLineDiv = $('#' + mainBlockId +'_scrollLine') ;
        $messageDiv = $('#' + mainBlockId +'_message') ;
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
      //  $mainBlockDiv.css('background-color','black') ;
        $mainBlockDiv.css('z-index',10) ;
        $mainBlockDiv.css('overflow','hidden') ;
        //$mainBlockDiv.removeAttr('hidden') ;
        $resultBackground.removeAttr('hidden') ;
        $mainBlockDiv.show( "blind", 1000);
        formShowFlag = true ;
    } ;
    /**
     * Блок для вывода результата
     */
    var dataBlockDefine = function() {
        internalBlockDefine('dataArea',dataArea) ;
        var mainBlockId = $mainBlockDiv.attr('id') ;
        $dataAreaDiv = $('#' + mainBlockId +'_dataArea') ;
        $dataAreaDiv.css('background-color','rgba(0,0,0,0)') ;   // прозрачный
        var $pError = $('<p/>') ;
        $pError.attr('id','dataErrorBox') ;
        $dataAreaDiv.addClass('data') ;
        $dataAreaDiv.append($pError) ;
        var $pHuman = $('<p/>') ;
        $pHuman.attr('id','dataHuman') ;
        $dataAreaDiv.append($pHuman) ;

        $dataList = $('<ol/>') ;
        $dataList.attr('start',1) ;
        $dataList.attr('id','dataList') ;
        $dataAreaDiv.append($dataList) ;

        $dataErrorBox = $("#" + 'dataErrorBox') ;
        $dataHumanBox = $("#" + 'dataHuman') ;
        $dataList =  $("#" + 'dataList') ;

    } ;
    /**
     * внутренние блоки
     * @param blockName
     * @param block
     */
    var internalBlockDefine = function(blockName,block) {
        var mainId = $mainBlockDiv.attr('id') ;
        var place = block['place'] ;
        var blkId = mainId+'_'+blockName ;
        var $blk = $('#' + blkId) ;
        if ($blk.length === 0) {
            $blk = $('<div/>') ;
            $blk.attr('id',blkId) ;
            $mainBlockDiv.append($blk) ;
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
        $mainBlockDiv.mousewheel(function(event, delta) {     //  колесо мыши (jquery plagin)
           scrollingGo(event) ;
        });
       // ------ закрытие формы   --------//
        captionClick() ;
    } ;
    /**
     * click по шапке для закрытия
     */
    var captionClick = function() {
        // ------ закрытие формы   --------//
        $CaptionDiv.off('click') ;
        $CaptionDiv.click(function(e) {
            var x = e.pageX;
            var y = e.pageY;
            var ky = kResize['ky'] ;
            var kx = kResize['kx'] ;
            var left = kx * mainBlock['place']['x1'] ;
            var width = kx *(mainBlock['place']['x2'] -  mainBlock['place']['x1']) ;
            var top = ky * mainBlock['place']['y1'] ;
            var height =  ky *(caption['place']['y2'] -  caption['place']['y1']) ;
            if ((x - left) >= 0.5 * width && (y - top) <= 0.7 * height) {

                $mainBlockDiv.hide( "explode", 1000);
                $mainBlockDiv.empty() ;
                scrolling.stop = true ;
                formShowFlag = false ;
                $resultBackground.attr('hidden','hidden') ;
            }
        }) ;

    } ;
    /**
     * начальные атрибуты прокрутки (объект scrolling = {})
     */
    var scrollingBegin = function() {
        scrolling.stop = (scrolling.dyHidden <= 0) ;
        var height = slider.place['y2'] - slider.place['y1'];
        scrolling.sliderYMin = kResize['ky'] * slider.place['y1'];
        scrolling.sliderYMax = kResize['ky'] * (mainHeight - height);
        scrolling.pageY = 0 ; //e.pageY;
        scrolling.pageY0 = 0 ; //e.pageY;
        scrolling.sliderY = pixelToNumber($sliderDiv.css('top'));
        scrolling.sliderY0 = pixelToNumber($sliderDiv.css('top'));
        scrolling.dataAreaY0 = pixelToNumber($dataAreaDiv.css('top'));
        scrolling.dataAreaY = scrolling.dataAreaY0 ;
        scrolling.wheelMoving = 0 ;
        scrolling.kdyDataArea =
                   scrolling.dyHidden / (scrolling.sliderYMax - scrolling.sliderYMin) ;

    } ;
    /**
     * реакция на 1 шаг вращения колеса мыши
     * @param e
     */
    var scrollingGo = function(e) {
        if (!scrolling.stop ) {
            var wheelSteps = 10 ;    // число вращений колеса мыши
            var maxDy = 20 ;
            var minDy = 10 ;
            scrolling.pageY = e.pageY;
            var dyMin = Math.round(scrolling.dyHidden/wheelSteps) ;
            dyMin = Math.min(dyMin,maxDy) ;
            dyMin = Math.max(dyMin,minDy) ;
            var eDy = e.deltaY * dyMin ;
            var newMoving = scrolling.wheelMoving + eDy ;
            var top = scrolling.sliderY0 - newMoving ;

            var realTop = Math.max(top,scrolling.sliderYMin) ;
            realTop = Math.min(realTop,scrolling.sliderYMax) ;
            var deltaMoving = realTop - top ;
            scrolling.wheelMoving = newMoving - deltaMoving ;
            $sliderDiv.css('top', top);
            scrolling.sliderY = pixelToNumber($sliderDiv.css('top')) ;
            var topData = scrolling.dataAreaY0 -
                scrolling.kdyDataArea * (scrolling.sliderY - scrolling.sliderY0);
            $dataAreaDiv.css('top',topData) ;
        }

    } ;
    /**
     * расчёт не видимой части выведенных данных
     */
    var dataAreaHiddenClc = function() {
        var mainPlace = mainBlock.place ;
        var dataPlace = dataArea.place ;
        var dyShow = kResize['ky'] * (mainPlace['y2'] - mainPlace['y1'] - dataPlace['y1']) ;
        var dyHidden = $dataAreaDiv.height() - dyShow ;
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
        text  = 'stop : ' + ((scrolling.stop) ? 'true' : 'false') +'<br>' ;
        $p.append(text) ;
        text  = 'kDy : ' + scrolling.kdyDataArea +'<br>' ;
        $p.append(text) ;
            text  = 'wheelMoving : ' + scrolling.wheelMoving  +'<br>' ;
            $p.append(text) ;

    } ;
    /**
     * начало вывода пустая форма
     */
    this.answerInit = function() {
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
     * @param totalHumanText
     */
    this.putTotalHuman = function(totalHumanText) {
        $dataHumanBox.append('<strong>'+totalHumanText + '</strong>') ;
    } ;
    /**
     * вывод блока ответа - элемента списка
     * при этом пересчитываются параметры прокрутки( неизветно является ли блок последним)
     * @param $liItem
     */
    this.putAnswerItem = function($liItem) {
        $dataList.append($liItem) ;
        dataAreaHiddenClc() ;
        scrollingShow() ;
        scrollingBegin() ;
    } ;
    /**
     * конец вывода ответа
     */
    this.answerEnd = function() {

    };
    /**
     *   перевывод при изменении размера окна браузера
     */
    this.resize = function() {
        if (formShowFlag) {
            kResizeClc();
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

        }
    }
}