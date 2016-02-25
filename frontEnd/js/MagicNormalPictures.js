/**
 * Фоновые картинки в нормальном виде
 *
 */
function MagicNormalPictures() {
    var backgroundImg ; // объект - компоненты изображения
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    var formShowFlag = false ;
    //----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
    } ;
    this.show = function() {
        formShowFlag = true ;
        picturesShow() ;
    } ;

    /**
     * прервать вывод
     */
    this.stopShow = function() {
        animateStop = true ;
        formShowFlag = false ;
    } ;
    this.resize = function() {
        if (formShowFlag) {
            animateStop = true ;
            picturesShow() ;
        }
    } ;

    var picturesShow = function() {
        $resultBlock.empty() ;
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var borderSize = pictures['borderSize'] ;
        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey];
            var $pictImg = showItem(dir, borderSize, item);
            var rotationBlock = rotationBlockPrepare($pictImg);
            rotationGo(rotationBlock);
        }
    } ;
    var showItem = function(dir,borderSize,item) {
        var place = item['place'] ;
        var pictureFile = dir + '/' + item['img']['file'] ;
        var borderFile = dir + '/' + item['img']['border'] ;
        var top = place['y1'] ;
        var left =  place['x1'] ;
        var width =  place['x2'] - place['x1'] ;
        var height =  place['y2'] - place['y1'] ;
        var $block = $('<div/>') ;
        $block.css('position','absolute') ;
        $block.css('top',top) ;
        $block.css('left',left) ;
        $resultBlock.append($block) ;
        // вкладываем вовнутрь рамку и картинку
        var $borderBlock = $('<div/>') ;
        $block.append($borderBlock) ;
        $borderBlock.css('position','absolute') ;
        $borderBlock.css('top',0) ;
        $borderBlock.css('left',0) ;


        var $borderImg = $('<img/>') ;
        $borderImg.attr('src',borderFile) ;
        $borderImg.css('width',width) ;
        $borderImg.css('height',height) ;
        $borderBlock.append($borderImg) ;

        // для картинки нужен отдельный блок
        var $pictureBlock = $('<div/>') ;
        $block.append($pictureBlock) ;
        $pictureBlock.css('position','absolute') ;
        $pictureBlock.css('top',borderSize) ;
        $pictureBlock.css('left',borderSize) ;
        var $pictureImg = $('<img/>') ;
        $pictureImg.attr('src',pictureFile) ;
        $pictureImg.css('width',width - 2 * borderSize) ;
        $pictureImg.css('height',height - 2 * borderSize) ;
        $pictureBlock.append($pictureImg) ;
        return $pictureImg ;
    } ;
    var rotationBlockPrepare = function($img) {

       return {
           $img : $img ,    // изображение для трансформации
           dx_0 : pixelToNumber($img.css('width')) ,       // начальный размер
           dy_0 : pixelToNumber($img.css('height')) ,
           axis : 'y' ,
           scaleStep: 5,    // % от первоначального размера
           sizeMin : 5,       // мин размер при сжатии изображения - %
           timeDelay: 50   // время задержки

       } ;
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

    var rotationGo = function(rotationBlock) {
        var $img  = rotationBlock.$img ;
        var dx_0 =  rotationBlock.dx_0 ;
        var dy_0 =  rotationBlock.dy_0 ;
        var axis =  rotationBlock.axis ;
        var scaleStep_0 =  rotationBlock.scaleStep ;
        var sizeMin =   rotationBlock.sizeMin ;
        var timeDelay =   rotationBlock.timeDelay;
        var scaleMax = 1 ;
        var scaleMin = sizeMin / 100 ;
        var scaleStep = scaleStep_0 / 100 ;
        var currentScale = scaleMax ;
        var currentScaleSign = -1 ;        // уменьшение размера
        var kMirror = 1 ;                  // отображение
        var tmpTimer = setInterval(function () {
            if (animateStop) {        //  остановить цикл анимации)
                clearInterval(tmpTimer);
            }
            if (currentScaleSign ===  -1) {
                if (currentScale - scaleStep >= scaleMin) {
                    currentScale = currentScale - scaleStep ;
                    $img.css('transform','scaleX(' + (kMirror * currentScale) +')') ;
                }else {
                    currentScaleSign  = +1 ;
                    currentScale = scaleMin ;
                    kMirror = (-1) * kMirror ;
                    $img =  $img.css('transform','scaleX(' +
                                             (kMirror * currentScale) +')') ;  // отображение
                }
            } else {
                if (currentScale + scaleStep <= scaleMax) {
                    currentScale = currentScale + scaleStep ;
                    $img.css('transform','scaleX(' + (kMirror * currentScale) +')') ;
                }else {
                    currentScaleSign  = -1 ;
                    currentScale = scaleMax ;
                }

            }


        }, timeDelay);
    } ;
    var cycleShow = function() {
        animateStop = false ;
        var timeDelay = 3000;
        var tmpTimer = setInterval(function () {
            if (animateStop) {        //  остановить цикл анимации)
                clearInterval(tmpTimer);
            }

            pictureRotate() ;
        }, timeDelay);


    } ;

}