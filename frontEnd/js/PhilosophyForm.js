/**
 * Объект отображения философских мыслей
 */
function PhilosophyForm() {
    var formAttr ;        // объект - атрибуты формы
    var currentPhrase = '' ;          // текущая фраза
    var backgroundImg ; // объект - компоненты изображения
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    var $answerArea ;     // область вывода текста
    var formShowFlag = false ;
    //----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
        formAttr = new PhilosophyFormAttr() ;        // объект - атрибуты формы
        formAttr.init() ;
    } ;
     /**
     * изменить фразу
     */
    var phraseChange = function() {
        currentPhrase = formAttr.getPhrase() ;
         $answerArea.val(currentPhrase) ;
     } ;

    this.queryGo = function() {
       formShowFlag = true ;
       responseShow() ;
    } ;

    /**
     * прервать вывод
     */
    this.stopShow = function() {
        $resultBlock.empty() ;
        animateStop = true ;
        formShowFlag = false ;
    } ;
    this.resize = function() {
        if (formShowFlag) {
            animateStop = true ;
            responseShow() ;
        }
    } ;

    var responseShow = function() {
        backgroundImg.centralCircleShow('answer') ;
        var idText = backgroundImg.getIdText('answer') ;
        $answerArea = $('#'+idText) ;




        $resultBlock.empty() ;
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            showItem(dir,item) ;
        }
        cycleShow() ;
    } ;
    var showItem = function(dir,item) {
       var place = item['place'] ;
       var imgFile = dir + '/' + item['img']['file'] ;
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
            }
            phraseChange() ;
        }, timeDelay);


    } ;
}
