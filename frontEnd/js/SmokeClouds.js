/**
 * Клыбы дыма - объект управления анимацией
 * Модель представалят собой совокупность объектов smokeBlocks,
 * каждый элемент - это объект <div> с запущенной внутри картинкой - облачком дыма,
 * с каждым блоком запускается таймер. С интервалом времени, задаваемом таймером, облачко
 * движется внутри блока, имитируя клубы дыма.
 * При изменении размера экрана запускается метод smokeResize, который останавливает движение.
 * для восстановления движения перезапускается smokeGo
 */
function SmokeClouds() {
    var $mainBlock = $('#smokeClouds') ;
    var clouds = {} ;
    var currentBlock = {} ;
    var stopAnimation = false ;     // остановить анимацию
    var dirSmokeImages = paramSet.dirImages+'/smoke' ;
    var borderShowTotal = false ; //true ;     // показать все рамки
    var backgroundImg ;
    var _this = this ;
    //-------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
    } ;
    /**
     * запускает процесс изменения размеров
     */
    this.smokeResize = function() {
        stopAnimation = true ;
    } ;
    /**
     * Запуск прцесса дымления
     */
    this.smokeGo = function() {

        stopAnimation = false ;
        $mainBlock.empty() ;
        var clouds = backgroundImg.getClouds() ;
        var dirImg = clouds['dir'] ;
        var items = clouds['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            var $blk = $('<div/>') ;
            var id = 'cloud_' + itemKey ;
            $blk.attr('id',id) ;
            var place = item['place'] ;
            var imgFile = dirImg + '/' + item['img']['file'] ;
            $mainBlock.append($blk) ;
            backgroundImg.defineAbsolutePosition($blk,place,imgFile) ;
            $('#' + id +' img').css('opacity',0.70) ;
            var motionBlock = motionBlockPrepare(item) ;
            blockGo($blk,motionBlock) ;
 //           break ;     // для 1 раза хватит одного элемента
        }
    } ;
    /**
     * подготовить данные для объекта circularMotion - движение облаков
     * параметры могут определяться случайным выбором
     * @param item
     */
    var motionBlockPrepare = function(item) {
        var place = item['place'] ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var blkWidth = x2 - x1 ;
        var blkHeight = y2 - y1 ;
        var mainAxis = (Math.random() > 0.5) ? 'x' : 'y' ;
        var direction = (Math.random() > 0.5) ? -1 : +1 ;
        var rotationDirection = (Math.random() > 0.5) ? 'left' : 'right' ;
        var timeDelay = 0 ;
        var delayMin = 200 ;
        var delayMax = 600 ;
        while(timeDelay < delayMin || timeDelay > delayMax ) {
            timeDelay = Math.round(Math.random() * delayMax) ;
        }

        return {
            timeDelay: timeDelay,             // задержка таймера
            block: {
                width: blkWidth,
                height: blkHeight
            },
            img: {                        // размеры картинки повторяют размеры блока
                width: blkWidth,
                height: blkHeight
            },
            circleMove: {
                mainAxis: mainAxis, //'x' ,
                direction: direction, // +1
                deltaMove: 10,       // % от главной оси
                rotationDirection: rotationDirection,    //'left',
                radius: 10,         // %  от главной оси
                deltaPhi: 20,        // число точек на окружности
                axisMin: 40,         // % - границы перемещения по оси mainAxis
                axisMax: 60
            }
        } ;
    } ;
    /**
     *  запустить анимацию в блоке
     *  В блоке запускается таймер.Остановка по флагу stopAnimation
     */
    var blockGo = function($blk,motionBlock) {
        var timeDelay = motionBlock['timeDelay'] ;
        var top_0 = $blk.css('top') ;         // начальное положение блока
        var left_0 = $blk.css('left') ;
        top_0 = pixelToNumber(top_0) ;
        left_0 = pixelToNumber(left_0) ;
        var motion = new CircularMotion() ;     // управдение движением
        motion.init(motionBlock) ;
        var tmpTimer = setInterval(function () {        // процесс анимации в блоке
            var blkCoord = motion.getImgPosition() ; // это
            var newLeft = left_0 + blkCoord['x'] ;
            var newTop = top_0 + blkCoord['y'] ;

            $blk.css('top',newTop) ;
            $blk.css('left',newLeft) ;
            if (stopAnimation) {
                clearInterval(tmpTimer);
            }
        }, timeDelay);

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
     * показать информацию о картинке( может быть для отладки)
     */
    var imgInfoShow = function($img) {
        var imjWidth = $($img).css('width') ;
        var imjHeight = $($img).css('height') ;
        imjWidth = pixelToNumber(imjWidth) ;
        imjHeight = pixelToNumber(imjHeight) ;
        var blk = $($img).parent() ;
        var blkWidth = $(blk).css('width') ;
        blkWidth = pixelToNumber(blkWidth) ;
        var blkHeight = $(blk).css('height') ;
        blkHeight = pixelToNumber(blkHeight) ;
        var blkId = $(blk).attr('id') ;
        alert('INFO:'+'\n'+
        'imgW: ' + imjWidth+' imjHeight: ' + imjHeight +'\n' +
        'blkId: ' + blkId+' blkW: ' +blkWidth+' blkH: '+blkHeight+ '\n' +
        'imjW/blkW: ' + imjWidth/blkWidth + '\n' +
        'imjH/blkH: ' + imjHeight/blkHeight ) ;
    } ;
}
