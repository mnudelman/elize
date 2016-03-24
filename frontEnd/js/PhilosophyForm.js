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
    var callStack ;       // стек вызовов
    var ajax ;
    var formAttr ;        // объект - атрибуты формы
    var currentPhrase = '' ;          // текущая фраза
    var backgroundImg ; // объект - компоненты изображения
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
    var _this = this ;
    //----------------------------------//
    this.init = function() {
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
        addSignalsTable = new AddSignalsTable() ;
        currentPhrase = '' ;
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
//         $answerAreaBlock.append(currentPhrase) ;
         //
         var $p = $('<div/>') ;

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
        addSignalsTable.init(addSignals,signalTypes) ;
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
//            responseShow() ;
            showItems() ;
            backgroundImg.stampShow('answer') ;
            backgroundImg.centralCircleShow('answer') ;
            if (scrollGoFlag) {
                addSignalsTable.tableShow() ;
            }
        }
    } ;
    this.reshow = function() {
        showItems() ;
        backgroundImg.stampShow('answer') ;
        backgroundImg.centralCircleShow('answer') ;

    } ;


    var responseShow = function() {
        backgroundImg.stampShow('answer') ;
        backgroundImg.centralCircleShow('answer') ;
        var idText = backgroundImg.getIdText('answer') ;
        $answerArea = $('#'+idText) ;
        $resultBlock.empty() ;
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
                showItems() ;
            }else {
                if (answ !== false) {
                    var message = answ['message'];
                    ajax.errorMessage(message) ;
                }

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
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var signalTypesOrder = 0 ;
        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            var substName = item['typeSignal'] ;
            signalTypes[signalTypesOrder++] = substName ;
//            var substFile = dirImages + '/' +addSignals[substName]['file'] ;
            var substFile = addSignals[substName]['file'] ;
            magicNormalPictures.showItem(dir,item,itemKey,substFile) ;
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
                $(window).off('keydown') ;
                _this.stopShow() ;
                callStack.pullItem() ;
                callStack.currentGo() ;
            }
        }) ;
        $stamp = $('#stamp') ;
        $stamp.off('click') ;
        $stamp.click(function(e) {
            _this.scrollGo() ;
        }) ;


        phraseChange() ;

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
