/**
 * Фоновые картинки в нормальном виде
 *
 */
function MagicNormalPictures() {
    var backgroundImg ; // объект - компоненты изображения
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    var formShowFlag = false ;
    var currentStaticFlag = true ;  // статическая картинка(
    var _this = this ;
    //----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
    } ;
    this.show = function(staticFlag) {
        currentStaticFlag = staticFlag ;
        formShowFlag = true ;
        picturesShow(staticFlag) ;
    } ;

    /**
     * прервать вывод
     */
    this.stopShow = function() {
        animateStop = true ;
        formShowFlag = false ;
    } ;
    /**
     * изменение размера экрана
     */
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
            var $pictImg = _this.showItem(dir, borderSize, item, itemKey);
            if (!currentStaticFlag) {
                var rotationBlock = rotationBlockPrepare($pictImg);
                rotationGo(rotationBlock);
            }
        }
    } ;
    /**
     * вывод рамки и картинки внутри
     * @param dir
     * @param borderSize
     * @param item
     * @param itemKey
     * @param substImageFile    - другая картинка для вставки в рамку (используется для "философии")
     * @returns {*|jQuery|HTMLElement}
     */
    this.showItem = function(dir,borderSize,item,itemKey,substImageFile) {
        var place = item['place'] ;
        var innerPlace = item['innerPlace'] ;
        var imgFile = (currentStaticFlag) ? item['img']['text'] :
            item['img']['file'] ;
        var pictureFile = dir + '/' + imgFile ;
        var dy = (place['dy'] === undefined) ? 0 : place['dy'] ;
        dy = (currentStaticFlag) ? 0 : dy ;
        if (typeof(substImageFile) === 'string' ) {
            pictureFile = substImageFile ;
            dy = 0 ;        // поправка
        } else if(currentStaticFlag) {
            pictureFile  = dir + '/' + item['img']['text'] ;
        }
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
        $borderImg.css('height',height ) ;
        $borderBlock.append($borderImg) ;



        // для картинки нужен отдельный блок
        var $pictureBlock = $('<div/>') ;
        var pictTop = innerPlace['y1'] - place['y1'] ;
        var pictLeft = innerPlace['x1'] - place['x1'] ;
        var pictWidth = innerPlace['x2'] - innerPlace['x1'] ;
        var pictHeight = innerPlace['y2'] - innerPlace['y1'] ;
        $block.append($pictureBlock) ;
        $pictureBlock.css('position','absolute') ;
        $pictureBlock.css('top',pictTop + dy) ;
        $pictureBlock.css('left',pictLeft) ;
        var $pictureImg = $('<img/>') ;
        $pictureImg.attr('id',itemKey+'_img') ;
        $pictureImg.attr('src',pictureFile) ;
        $pictureImg.css('width',pictWidth) ;
        $pictureImg.css('height',pictHeight - dy) ;
        $pictureBlock.append($pictureImg) ;
        return $pictureImg ;
    } ;


    /**
     * блок - параметры вращения картинки
     * @param $img
     * @returns {{$img: *, dx_0: number, dy_0: number, axis: string, scaleStep: number, sizeMin: number, timeDelay: number}}
     */
    var rotationBlockPrepare = function($img) {

       return {
           $img : $img ,    // изображение для трансформации
           dx_0 : pixelToNumber($img.css('width')) ,       // начальный размер
           dy_0 : pixelToNumber($img.css('height')) ,
           axis : 'y' ,
           scaleStep: 5,    // % от первоначального размера
           sizeMin : 5,       // мин размер при сжатии изображения - %
           timeDelay: 150   // время задержки

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
    /**
     * выполнение вращения - имитация вращения вокруг оси "y" с пересчётом
     * проекции на плоскость экрана. при прожождении точки PI/2 изображение
     * отображается зеркально
     * @param rotationBlock
     */
    var rotationGo = function(rotationBlock) {
        var $img  = rotationBlock.$img ;
        var dx_0 =  rotationBlock.dx_0 ;
        var dy_0 =  rotationBlock.dy_0 ;
        var axis =  rotationBlock.axis ;
        var scaleStep_0 =  rotationBlock.scaleStep ;
        var sizeMin =   rotationBlock.sizeMin ;
        var timeDelay =   rotationBlock.timeDelay;
        var PI = Math.PI ;
        var scaleMax = 1 ;
        var phiStep = PI/10 ;
        var phiMirrorChange = PI/2   ;         // смена отображения
        var phiMax = PI ;
        var phi = 0 ;
        var kMirror = 1 ;                  // отображение
        var mirrorFlag = false ;
        var currentScale = 1 ;
        var tmpTimer = setInterval(function () {
            if (animateStop) {        //  остановить цикл анимации)
                clearInterval(tmpTimer);
            }
            phi += phiStep ;
            if (phi >= phiMirrorChange && !mirrorFlag  ) {
                mirrorFlag = true ;
                phi = phiMirrorChange + phiStep/2  ;
                kMirror = (-1) * kMirror ;
            }
            currentScale =  kMirror * Math.abs(Math.cos(phi)) ;
            $img.css('transform','scaleX(' + currentScale +')') ;
            if (phi >= phiMax) {
                phi = 0 ;
                mirrorFlag = false ;

            }
        }, timeDelay);
    } ;

}