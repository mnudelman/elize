/**
 * объект - круговое движение
 * параметры движения задаются через init() объектом вида:
 *  motionBlock: {
            timeDelay: timeDelay,             // задержка таймера
            block: {                          // параметры блока, внутри которого движется картинка
                width: blkWidth,
                height: blkHeight
            },
            img: {                        // размеры картинки повторяют размеры блока
                width: blkWidth,
                height: blkHeight
            },
            circleMove: {             // параметры движения  по отношению к центру блока(цетральной точке)
                mainAxis: mainAxis,   // ось перемещения (x|y)
                direction: direction, // +1 // направление (+1 - увеличение -1 - убывание) по оси
                deltaMove: 10,        // % от главной оси  - шаг перемещения по оси
                rotationDirection: rotationDirection,    // направление вращения (left | right),
                radius: 10,          // %  от главной оси // радиус окружности, описываемой цетральной точкой
                deltaPhi: 20,        // число точек на окружности (шаг углового смещения 1/20 )
                axisMin: 40,         // % - границы перемещения по оси mainAxis (т.е. центр окружности колеблется
                axisMax: 60          // около цетра блока
            }
        } ;
 */
function CircularMotion() {
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
    var imgWidth ;
    var imgHeight ;
     //--------------//
    var currentStep = 0 ;   // текущий шаг по оси (положение центра круга)
    var currentPhi = 0 ;    // текущий шаг при перемещении по окружности
    //------------------------------------//
    this.init = function(motionBlock) {
        blkHeight = motionBlock['block']['height'] ;
        blkWidth = motionBlock['block']['width'] ;
        imgHeight = motionBlock['img']['height'] ;
        imgWidth = motionBlock['img']['width'] ;

        var circleAttr = motionBlock['circleMove'] ;

        mainAxis = circleAttr['mainAxis'] ;   // ось смещения центра круга

        direction = circleAttr['direction'] ;  // направление движения (+1 | -1)
        deltaMove = circleAttr['deltaMove'] ;  // смещение центра круга вдоль оси за 1 шаг(% от размера)
        rotationDirection = circleAttr['rotationDirection'] ; // направление вращения(left|right)
        radius = circleAttr['radius'] ;       // радиус круга (% от размера)
        deltaPhi = circleAttr['deltaPhi'] ;   // n - число (1/n угловое смещение за такт)
        axisMin = circleAttr['axisMin'] ;
        axisMax = circleAttr['axisMax'] ;
        pixelSize() ;
    } ;
    /**
     * пересчёт размеров из % в  абсолютные  pixel
     */
    var pixelSize = function() {
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
    this.getImgPosition = function() {
        var imgPos = imgPositionClc() ;
        imgNextPosition() ; // подготовить следующую
        return imgPos ;
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
     * Вычислить положение центра окружности
     */
    var ringCenterClc = function() {
        var axisOffset = pxDeltaMove * currentStep ;
        var y = 0 ;
        var x = 0 ;

         switch (mainAxis) {
             case 'x' :
             {
                 y = blkHeight / 2;
                 x = (direction == +1) ? axisOffset : blkWidth - axisOffset;
                 break;
             }
             case 'y' :
             {
                 x = blkWidth / 2;
                 y = (direction == +1) ? axisOffset : blkHeight - axisOffset;
                 break;
             }
         }

        return {x: x, y: y} ;
    } ;
    /**
     * Вычисление координат изображения : {x: <marginLeft>, y: <marginTop>
     *  координаты изображения по отношению к блоку
     * @returns {{x: number, y: number}}
     */
    var imgPositionClc = function() {
        var centerRingPosition = ringCenterClc() ;  // {x: X, y: Y}
        var deltaRingPosition = ringCoordinateClc() ;  // {dy: , dx: }
        var absoluteX = centerRingPosition['x'] + deltaRingPosition['dx'] ;
        var absoluteY = centerRingPosition['y'] - deltaRingPosition['dy'] ;
        var imgMarginTop = absoluteY - imgHeight/2 ;
        var imgMarginLeft = absoluteX - imgWidth/2 ;
        return {x: imgMarginLeft, y: imgMarginTop} ;
    } ;
    /**
     * след позиция. Определяется увеличением на шаг углового смещения
     *  Если сделан круг, то выполняется смещение по главной оси.
     *  Если главная ось пройдена, то меняется направление на обратное
     */
    var imgNextPosition = function() {
        currentPhi++ ;
        if (currentPhi > deltaPhi) {     // !! круг пройден
            currentPhi = 0 ;
           if (++currentStep > stepMax) {    // сменить направвление
               currentStep = stepMin ;
               direction = (-1) * direction ;    // меняем знак
           }

        }
    } ;

}