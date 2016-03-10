/**
 * Объект отображения философских мыслей
 */
function PhilosophyForm() {
    var ajax ;
    var formAttr ;        // объект - атрибуты формы
    var currentPhrase = '' ;          // текущая фраза
    var backgroundImg ; // объект - компоненты изображения
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    var $answerArea ;     // область вывода текста
    var $answerAreaBlock ;
    var formShowFlag = false ;
    var magicNormalPictures ;
    var addSignals = {} ;           // дополнительные сигналы
    var addSignalsTable ;
    var dirImages ;
    var _this = this ;
    //----------------------------------//
    this.init = function() {
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
        $answerAreaBlock.css('vertical-align','center') ;
        addSignalsTable = new AddSignalsTable() ;
    } ;
     /**
     * изменить фразу
     */
    var phraseChange = function() {
        currentPhrase = formAttr.getPhrase() ;
        $answerAreaBlock.empty() ;
         var $p = $('<p/>') ;
         $p.addClass('answerText') ;
         $p.append(currentPhrase) ;
         $answerAreaBlock.append($p) ;
//         $answerArea.val(currentPhrase) ;
     } ;
    /**
     * развернуть свиток
     */
    this.scrollGo = function() {
        addSignalsTable.init(addSignals) ;
        addSignalsTable.tableShow() ;

    } ;
    this.queryGo = function() {
       formShowFlag = true ;
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

 //       magicNormalPictures.show() ;
    } ;
    this.resize = function() {
        if (formShowFlag) {
            animateStop = true ;
            responseShow() ;
        }
    } ;

    var responseShow = function() {
        backgroundImg.stampShow('answer') ;
        backgroundImg.centralCircleShow('answer') ;
        var idText = backgroundImg.getIdText('answer') ;
        $answerArea = $('#'+idText) ;




        $resultBlock.empty() ;
        //var pictures = backgroundImg.getPhilosophyPictures() ;
        //var dir = pictures['dir'] ;
        //var borderSize = pictures['borderSize'] - 4 ;  // уменьшаем рамку, чтобы избежать просвет
        addSignals = getAddSignals() ;

//        var items = pictures['items'] ;
//        for (var itemKey in items) {
//            var item = items[itemKey] ;
//            var substName = item['subst'] ;
////            var substFile = formAttr.getPictSubst(substName) ;
//            var substFile = addSignals['substName']['file'] ;
//            magicNormalPictures.showItem(dir,borderSize,item,itemKey,substFile) ;
//
////            showItem(dir,item) ;
//        }
//        cycleShow() ;
    } ;
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

    var showItems = function() {
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var borderSize = pictures['borderSize'] - 4 ;  // уменьшаем рамку, чтобы избежать просвет

        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            var substName = item['subst'] ;
//            var substFile = formAttr.getPictSubst(substName) ;
            var substFile = dirImages + '/' +addSignals[substName]['file'] ;

            magicNormalPictures.showItem(dir,borderSize,item,itemKey,substFile) ;

//            showItem(dir,item) ;
        }
        $(window).keydown(function(e){
            if (e.keyCode === 13) {
                $(window).off('keydown') ;
                _this.scrollGo() ;

            }
            if (e.keyCode === 27) {
                $(window).off('keydown') ;
                _this.stopShow() ;
                $(window).click() ;
            }
        }) ;
        cycleShow() ;
    } ;
    var showItem = function(dir,item) {
       var place = item['place'] ;
       var substName = item['subst'] ;
       var substFile = formAttr.getPictSubst(substName) ;
       var imgFile =  substFile ;
       var top = place['y1'] ;
       var left =  place['x1'] ;
       var width =  place['x2'] - place['x1'] ;
       var height =  place['y2'] - place['y1'] ;
       var $img = $('<img/>') ;
       $img.attr('src',imgFile) ;
       $img.css('width',width) ;
       $img.css('height',height) ;
       var $block = $('<div/>') ;
       $block.append($img) ;
        $block.css('position','absolute') ;
        $block.css('top',top) ;
        $block.css('left',left) ;
       $resultBlock.append($block) ;

    } ;

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
