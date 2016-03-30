/**
 * Объект - контроллер результата запроса "философия"
 * addSignals выбирается из Бд
 * addSignals - содержит имена файлов-картинок и сопровождающее
 * описание.
 * Картинки выводятся на экран через объект magicNormalPictures
 * Вместе с картинками выводится центральный круг вместе с текстом
 * пожелания и планка "далее"
 * * дополнительная форма вывода через addSignalsTable - таблица дополнительных
 * сигналов, куда вместе с картинкой выводится дополнительная информация
 * Дополнительная форма запускается по click на планку "далее" или клавишей
 * enter. Возврат в исходное состояние по  esc  или click по экрану.
 */
function PhilosophyForm() {
    var actionSteps ;
    var addSignalComment ;
    var callStack ;       // стек вызовов
    var ajax ;
    var formAttr ;        // объект - атрибуты формы
    var currentPhrase = '' ;          // текущая фраза
    var backgroundImg ; // объект - компоненты изображения
    var pictures ;           // описатели кртинок
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    var $answerArea ;     // область вывода текста
    var $answerAreaBlock ;
    var formShowFlag = false ;
    var scrollGoFlag = false;
    var magicNormalPictures ;
    var addSignals = {} ;           // дополнительные сигналы
    var addSignalsTable ;
    var dirImages ;
    var signalTypes = [] ;          //  список типов сигналов в порядке
                                    // их вывода на экран
    var fontSizeNormal ;
    var fontSizeMin ;
    var _this = this ;
    //----------------------------------//
    this.init = function() {
        actionSteps = paramSet.actionSteps ;
        callStack = paramSet.callStack ;
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
        formAttr = new PhilosophyFormAttr() ;        // объект - атрибуты формы
        formAttr.init() ;
        ajax = new AjaxRequest() ;         // исполнитель работы с ajax
        dirImages = paramSet.dirImages ;
        magicNormalPictures = paramSet.magicNormalPictures ;
        formShowFlag = false ;
        $answerAreaBlock = backgroundImg.getTextAreaBlock() ;
        $answerAreaBlock.empty() ;
        $answerAreaBlock.css('text-align','center') ;
        $answerAreaBlock.css('vertical-align','middle') ;
        $answerAreaBlock.addClass('answerText') ;
        fontSizeNormal =  $answerAreaBlock.css('font-size') ;
        fontSizeNormal = fontSizeNormal.replace('px','') ;
        fontSizeMin = 0.3 * fontSizeNormal ;
        addSignalsTable = new AddSignalsTable() ;
        addSignalsTable.init() ;
        currentPhrase = '' ;

        addSignalComment = new AddSignalComment() ;
        addSignalComment.init() ;
//


    } ;
     /**
     * изменить фразу
     */
    var phraseChange = function() {
         if(currentPhrase.length === 0) {
             currentPhrase = (formAttr.getPhrase()).toUpperCase() ;

         }
        $answerAreaBlock.empty() ;
         $answerAreaBlock.removeAttr('hidden') ;
//         $answerAreaBlock.append(currentPhrase) ;
         //
         var kResize = backgroundImg.getKResize() ;
         var $p = $('<div/>') ;
         var fontSize = kResize['kx'] * fontSizeNormal ;
         fontSize = Math.min(fontSize,fontSizeNormal) ;
         fontSize = Math.max(fontSize,fontSizeMin) ;
         $answerAreaBlock.css('font-size',fontSize) ;
         //$p.addClass('answerText') ;
         $p.append(currentPhrase) ;
         $answerAreaBlock.append($p) ;
         var h = $p.height() ;
         var blkH = $answerAreaBlock.height() ;
         var top = (blkH - h) / 2 ;
         $p.css('margin-top',top) ;
     } ;
    /**
     * развернуть свиток и
     * вывести таблицу дополнительных сигналов
     */
    this.scrollGo = function() {
        scrollGoFlag = true ;
        addSignalsTable.setSignals(addSignals,signalTypes) ;
        addSignalsTable.tableShow() ;

    } ;
    /**
     * выполнить запрос
     */
    this.queryGo = function() {
       formShowFlag = true ;
       scrollGoFlag = false ;
        currentPhrase = '' ;

       callStack.pushItem('philosophy',_this.reshow) ;

      responseShow() ;
    } ;
    this.getFormShowFlag = function() {
        return formShowFlag ;
    } ;
    /**
     * прервать вывод
     */
    this.stopShow = function() {
//        $resultBlock.empty() ;

        animateStop = true ;
        formShowFlag = false ;
        $answerAreaBlock.empty() ;
    } ;


    this.resize = function() {
        if (formShowFlag) {
            animateStop = true ;
//            scrollGoFlag = false ;
//            responseShow() ;
            showItems() ;
            //backgroundImg.stampShow('answer') ;
            //backgroundImg.centralCircleShow('answer') ;
            if (scrollGoFlag) {
                addSignalsTable.tableShow() ;
            }
        }
    } ;
    this.reshow = function() {
        scrollGoFlag = false ;
        showItems() ;
        //backgroundImg.stampShow('answer') ;
        //backgroundImg.centralCircleShow('answer') ;

    } ;


    var responseShow = function() {
        //backgroundImg.stampShow('answer') ;
        //backgroundImg.centralCircleShow('answer') ;
        var idText = backgroundImg.getIdText('answer') ;
        $answerArea = $('#'+idText) ;
//        $resultBlock.empty() ;
        addSignals = getAddSignals() ;
    } ;
    /**
     * обращение к БД за массивом addSignals
     * и запуск showItems() - вывод на экран
     */
    var getAddSignals = function() {
        var goVect = {
            'operation' : 'getAddSignals',
            'successful' : false
        } ;
        ajax.setData(goVect) ;
        ajax.setRequestFunc(function(answ){        // callback  при возврате ответа
            if (answ['successful'] == true) {
                goVect['successful'] = true;
                addSignals = answ['result'] ;              // дерево результата
                actionSteps.addStep('philosophy','prepare',showItems) ;
//                showItems() ;
            }else {
                if (answ !== false) {
                    var message = answ['message'];
//                    ajax.errorMessage(message) ;
                    actionSteps.addStep('philosophy','break',ajax.errorMessage,message) ;
                }
                exit();

            }
        }) ;
        ajax.go() ;
    } ;
    /**
     * координаты картинок через объект
     * backgroundImg.getPhilosophyPictures() ;
     * для вывода используется magicNormalPictures.showItem
     * для "вставки в рамку" изображение берётся изображение из
     * addSignal
     */
    var showItems = function() {
        backgroundImg.stampShow('answer') ;
        backgroundImg.centralCircleShow('answer') ;
        var idText = backgroundImg.getIdText('answer') ;
        $answerArea = $('#'+idText) ;





        var cssClass = 'addSignal' ;
//        $resultBlock.empty() ;
        pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var signalTypesOrder = 0 ;
        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            var typeSignal = item['typeSignal'] ;
            signalTypes[signalTypesOrder++] = typeSignal ;
//            var substFile = dirImages + '/' +addSignals[substName]['file'] ;
            var signal = addSignals[typeSignal] ;
            var substFile = signal['file'] ;
            var typeComment = signal['typeComment'] ;  // коментарий к типу
            var signalName =  signal['name'] ;         // имя сигнала

            var title =  typeComment + '.' + signalName ;




            magicNormalPictures.showItem(dir,item,itemKey,substFile,cssClass,typeSignal,title) ;
        }
        $(window).off('click') ;
        //$(window).on('click',function() {
        //    $(window).off('click') ;
        //    _this.stopShow() ;
        //    callStack.pullItem() ;
        //    callStack.currentGo() ;
        //}) ;
        $(window).off('keydown') ;
        $(window).keydown(function(e){      // запуск по клавише
            if (e.keyCode === 13) {
                $(window).off('keydown') ;
                _this.scrollGo() ;
            }
            if (e.keyCode === 27) {         // выход по esc
                exit() ;
            }
        }) ;
        $stamp = $('#stamp') ;
        $stamp.off('click') ;
        $stamp.click(function(e) {
            _this.scrollGo() ;
        }) ;


        phraseChange() ;

        //$('.addSignal').off('mouseenter mouseout') ;
        //$('.addSignal').hover(function(e) {
        //        $('.addSignal').css('cursor','pointer') ;
        //        var place = pictures['commentBlock']['place'] ;
        //        var textPlace =  pictures['commentBlock']['textPlace'] ;
        //        addSignalComment.setCommentPlace(place,textPlace) ;
        //        var typeSignal = e.target.dataset.type ;
        //        var id = e.target.id ;
        //        var picturePositionPart = (id.indexOf('l') === 0) ? 'left' : 'right' ;
        //        var $parentBlock = ($('#' + id).parent()).parent() ;
        //        var parentPlace = {
        //            t : ($parentBlock.css('top')).replace('px','') - 0,
        //            l: ($parentBlock.css('left')).replace('px','') - 0,
        //            w: $('#' +id).width(),
        //            h: $('#' +id).height()
        //        } ;
        //        addSignalComment.setParentBlockPlace(parentPlace) ;
        //        addSignalComment.setPositionPart(picturePositionPart) ;
        //
        //        var signal = addSignals[typeSignal] ;
        //
        //
        //         var typeComment = signal['typeComment'] ;  // коментарий к типу
        //        var signalName =  signal['name'] ;         // имя сигнала
        //
        //        var title =  typeComment + '.' + signalName ;
        //        var text = signal['text'] ;
        //
        //
        //        addSignalComment.showComment(title,text) ;
        //    },
        //    function() {
        //        addSignalComment.hideComment() ;
        //        $('.addSignal').css('cursor','auto') ;
        //
        //    }
        //);





    } ;
    var exit = function() {
        $(window).off('keydown') ;
        _this.stopShow() ;
        callStack.pullItem() ;
        callStack.currentGo() ;
    } ;
    /**
     * смена фраз в центральном круге
     */
    var cycleShow = function() {
        animateStop = false ;
        var timeDelay = 3000;
        var tmpTimer = setInterval(function () {
            if (animateStop) {        //  остановить цикл анимации)
                clearInterval(tmpTimer);
            } else {
                phraseChange() ;
            }
        }, timeDelay);


    } ;
}
