/**
 * Фоновые картинки
 * Объект отвечает за вывод картинок на экран
 * координаты м возможные варианты заполнения берутся из
 * backgroundImg.getPhilosophyPictures() ;
 *  Возможные варианты следующие:
 *   - основные фоновые изображения с подписями
 *   - фоновые изображения без подписей вращающиеся вокруг оси Y
 *   - дополнителные сигналы - форма ответа на запрос пользователя
 *  вращение определяется атрибутом  currentStaticFlag
 */
function MagicNormalPictures() {
    var backgroundImg ; // объект - компоненты изображения
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    var formShowFlag = false ;
    var currentStaticFlag = true ;  // статическая картинка(
    var resizeFlag = false ;        // перевывод при изменении размера
    var PICTURE_ID_PREFIX = 'magicPicture' ;   // для  ид блока
    var _this = this ;
    //----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
    } ;
    /**
     * вывод изображения
     * @param staticFlag
     */
    this.show = function(staticFlag) {
        currentStaticFlag = staticFlag ;
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
    /**
     * изменение размера экрана
     */
    this.resize = function() {
        if (formShowFlag) {
            animateStop = true ;
            resizeFlag = true ;
            picturesShow() ;
        }
    } ;
    /**
     * если установлен флаг currentStaticFlag === false ->
     * запускается вращение картинки, иначе - неподвижно
     */
    var picturesShow = function() {
        if (!resizeFlag) {
            $resultBlock.empty();
        }
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey];
            var $pictImg = _this.showItem(dir, item, itemKey);
            if (!currentStaticFlag) {
                var rotationBlock = rotationBlockPrepare($pictImg);
                rotationGo(rotationBlock);
            }
        }
    } ;
    /**
     * вывод рамки и картинки внутри
     * положение рамки определяется объектом place{x1: ,y1: ,x2: ,y2:}
     * внутренняя область(куда помещается картинка) - innerPlace{}
     * dy - параметр для центрирования изображения по вертикали
     * @param dir
     * @param borderSize
     * @param item
     * @param itemKey
     * @param substImageFile    - другая картинка для вставки в рамку (используется для "философии")
     * @returns {*|jQuery|HTMLElement}
     */
    this.showItem = function(dir,item,itemKey,substImageFile) {
        var place = item['place'] ;
        var innerPlace = item['innerPlace'] ;
        //var imgFile = (currentStaticFlag) ?
        //              item['img']['text'] : item['img']['file'] ;

        var imgFile = item['img']['text'] ;

        var signalType = item['signalType'] ;

        var pictureFile = dir + '/' + imgFile ;
        var dy = (place['dy'] === undefined) ? 0 : place['dy'] ;
        dy = (currentStaticFlag) ? 0 : dy ;

        dy = 0 ;


        if (typeof(substImageFile) === 'string' ) {
            pictureFile = substImageFile ;
            dy = 0 ;        // поправка
        }
        //-- рамка  -- //
        var borderFile = dir + '/' + item['img']['border'] ;
        var top = place['y1'] ;
        var left =  place['x1'] ;
        var width =  place['x2'] - place['x1'] ;
        var height =  place['y2'] - place['y1'] ;

        var blkId = PICTURE_ID_PREFIX + '_' + item['typeSignal'] ;
        var $block = $('#' + blkId) ;
        var blkDefined = true ;
        if($block.length === 0) {
            $block = $('<div/>') ;
            $block.attr('id',blkId) ;
            blkDefined = false ;
            $resultBlock.append($block);
        }



        $block.css('position','absolute') ;
        $block.css('top',top) ;
        $block.css('left',left) ;

        // вкладываем вовнутрь рамку и картинку
        var borderBlkId = blkId + '_border' ;
        var $borderBlock = $('#' + borderBlkId) ;
        if ($borderBlock.length === 0) {
            $borderBlock = $('<div/>') ;
            $borderBlock.attr('id',borderBlkId) ;
            $block.append($borderBlock) ;
        }


        $borderBlock.css('position','absolute') ;
        $borderBlock.css('top',0) ;
        $borderBlock.css('left',0) ;


        var  $borderImg  =  $borderBlock.children('img') ;
        if ($borderImg.length === 0) {
            $borderImg = $('<img/>') ;
            $borderBlock.append($borderImg) ;
            $borderImg.attr('src',borderFile) ;
        }
        $borderImg.css('width',width) ;
        $borderImg.css('height',height ) ;
        // для картинки нужен отдельный блок
        var pictBlkId = blkId + '_picture' ;
        var $pictureBlock = $('#' + pictBlkId) ;
        if ($pictureBlock.length === 0) {
            $pictureBlock = $('<div/>') ;
            $block.append($pictureBlock) ;
        }

        var pictTop = innerPlace['y1'] - place['y1'] ;
        var pictLeft = innerPlace['x1'] - place['x1'] ;
        var pictWidth = innerPlace['x2'] - innerPlace['x1'] ;
        var pictHeight = innerPlace['y2'] - innerPlace['y1'] ;

        $pictureBlock.css('position','absolute') ;
        $pictureBlock.css('top',pictTop + dy) ;
        $pictureBlock.css('left',pictLeft) ;


        var $pictureImg = $('#' + pictBlkId + ' img') ;
        if ($pictureImg.length === 0) {
            $pictureImg = $('<img/>') ;
            $pictureBlock.append($pictureImg) ;
        }

        $pictureImg.attr('id',itemKey+'_img') ;

        var src =  $pictureImg.attr('src') ;
       if (src !== pictureFile) {
            $pictureImg.attr('src',pictureFile) ;
       }
        $pictureImg.css('width',pictWidth) ;
        $pictureImg.css('height',pictHeight - dy) ;

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
           timeDelay: 150   // время задержки
       } ;
    } ;
    /**
     * выполнение вращения - имитация вращения вокруг оси "y" с пересчётом
     * проекции на плоскость экрана. при прожождении точки PI/2 изображение
     * отображается зеркально
     * @param rotationBlock
     */
    var rotationGo = function(rotationBlock) {
        var $img  = rotationBlock.$img ;
        var timeDelay =   rotationBlock.timeDelay;
        var PI = Math.PI ;
        var phiStep = PI/10 ;
        var phiMirrorChange = PI/2   ;     // смена отображения
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