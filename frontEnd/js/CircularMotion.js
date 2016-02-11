/**
 * объект - круговое движение
 */
function CircularMotion() {
    var currentBlock ;
    //--- атрибуты кругового движения --//
    var mainAxis ;     // ось смещения(x|y)
    var direction ;    // направление смещения (+1 | -1)
    var deltaMove;
    var rotationDirection ;
    var radius ;
    var deltaPhi ;
    var axisMin = 40 ;     // %
    var axisMax = 60 ;     // %
    //---------------//
    var pxDeltaMove ;
    var pxRadius ;
    var stepMin = 0 ;
    var stepMax = 0 ;


    //------габариты--------//
    var blkWidth ;
    var blkHeight ;
    var imjWidth ;
    var imjHeight ;
     //--------------//
    var currentStep = 0 ;   // текущий шаг по оси (положение центра круга)
    var currentPhi = 0 ;    // текущий шаг при перемещении по окружности

    this.init = function(block) {
        currentBlock = block ;
        var circleAttr = block['circleMove'] ;

        mainAxis = circleAttr['mainAxis'] ;   // ось смещения центра круга

        direction = circleAttr['direction'] ;  // направление движения (+1 | -1)
        deltaMove = circleAttr['deltaMove'] ;  // смещение центра круга вдоль оси за 1 шаг(% от размера)
        rotationDirection = circleAttr['rotationDirection'] ; // направление вращения(left|right)
        radius = circleAttr['radius'] ;       // радиус круга (% от размера)
        deltaPhi = circleAttr['deltaPhi'] ;   // n - число (1/n угловое смещение за такт)
        pixelSize() ;
    } ;
    /**
     * пересчёт размеров из % в pixel
     */
    var pixelSize = function() {
        var blockId = currentBlock['id'] ;
        blkHeight = $('#'+blockId).css('height') ;
        blkWidth = $('#'+blockId).css('width') ;
        blkHeight = pixelToNumber(blkHeight) ;
        blkWidth = pixelToNumber(blkWidth) ;
        var axisLength = (mainAxis === 'x') ? blkWidth : blkHeight ;
        pxDeltaMove = axisLength * (deltaMove/100);
        pxRadius = axisLength * (radius/100);
        stepMax = Math.round(axisLength/pxDeltaMove) ; // число шагов
        if (axisMin > 0 && axisMin < 100 ) {
            stepMin = Math.round(stepMax * (axisMin/100 ))
        }
        if (axisMax > 0 && axisMax < 100 ) {
            stepMax = Math.round(stepMax * (axisMax/100 ))
        }

        currentStep = stepMin ;

        var imgPart = currentBlock['img'] ;
        imjWidth = imgPart['size']['w'] ;
        imjHeight = imgPart['size']['h'] ;
        var sizeUnit = imgPart['size']['u'] ;
        sizeUnit = (sizeUnit === undefined) ? 'px' : sizeUnit ;  // удиница измерения
        if (sizeUnit == '%') {
            imjWidth = (imjWidth/100) * blkWidth ;
            imjHeight = (imjHeight/100) * blkHeight ;
        }


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
     * получить позицию картинки в блоке {x:marginLeft, y: marginTop }
     */
    this.getImjPosition = function() {
        var imjPos = imjPositionClc() ;
        imjNextPosition() ; // подготовить следующую
        return imjPos ;
    } ;
    /**
     * вычислить позицию на окружности
     */
    var ringCoordinateClc = function() {
        var k = (rotationDirection === 'left') ? +1 : -1 ;
        var angle = (2*Math.PI / deltaPhi) * currentPhi  ;   // угол в радианах
        var dy = radius * Math.sin(angle) ;
        var dx = radius * Math.cos(angle) ;
        dy = k * dy ;       // нечётность sin
        return {dy: dy, dx: dx} ;

    } ;
    /**
     * Вычислить положение центра круга
     */
    var rindCenterClc = function() {
        var axisOffset = pxDeltaMove * currentStep ;
        var marginTop = 0 ;
        var marginLeft = 0 ;
        switch (mainAxis) {
            case 'x' : {
                marginTop = blkHeight/2 ;
                marginLeft = (direction == +1) ?  axisOffset : blkWidth - axisOffset  ;
                break ;
            }
            case 'y' : {
                marginLeft = blkWidth/2 ;
                marginTop = (direction == +1) ?  axisOffset : blkHeight - axisOffset  ;
                break ;
            }
        }
        return {x: marginLeft, y: marginTop} ;
    } ;
    /**
     * Вычисление координат изображения : {x: <marginLeft>, y: <marginTop>
     * @returns {{x: number, y: number}}
     */
    var imjPositionClc = function() {
        var centerRingPosition = rindCenterClc() ;  // {x: X, y: Y}
        var deltaRingPosition = ringCoordinateClc() ;  // {dy: , dx: }
        var absoluteX = centerRingPosition['x'] + deltaRingPosition['dx'] ;
        var absoluteY = centerRingPosition['y'] - deltaRingPosition['dy'] ;
        var imjMarginTop = absoluteY - imjHeight/2 ;
        var imjMarginLeft = absoluteX - imjWidth/2 ;
        return {x: imjMarginLeft, y: imjMarginTop} ;
    } ;
    /**
     * след позиция. Определяется увеличением на шаг углового смещения
     *  Если сделан круг, то выполняется смещение по главной оси.
     *  Если главная ось пройдена, то меняется направление на обратное
     */
    var imjNextPosition = function() {
        currentPhi++ ;
        if (currentPhi >= deltaPhi) {     // !! круг пройден
            currentPhi = 0 ;
           if (++currentStep >= stepMax) {    // сменить направвление
               currentStep = stepMin ;
               direction = (-1) * direction ;    // меняем знак
           }

        }
    } ;

}