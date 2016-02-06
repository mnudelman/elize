/**
 * Клыбы дыма - объект управления анимацией
 * Модель представалят собой совокупность объектов smokeBlocks,
 * каждый элемент - это объект <div> с запущенной внутри картинкой - облачком дыма,
 * с каждым блоком запускается таймер. С интервалом времени, задаваемом таймером, облачко
 * движется внутри блока, имитируя клубы дыма.
 * При изменении размера экрана запускается метод smokeResize, который останавливает движение.
 * Если в течении некоторого промежутка времени(2sec) нет сигналов об изменении размера, то
 * движение облаков запускается вновь.
 */
function SmokeClouds() {
    var smokeBlocks = {} ;
    var currentBlock = {} ;
    var stopAnimation = false ;     // остановить анимацию
    var leftSpiral = {} ;
    var rightSpiral = {} ;
    var resizeGo = false ;
    var resizeFlag = false ;
    var resizeSteps = 0 ;
    var RESIZE_STEPS_MAX = 2 ;
    var _this = this ;
    //-------------------------------//
    this.init = function() {
        leftSpiral = [
            {x: 0, dx:0, y:'', dy:1},
            {x: '', dx:1, y:1, dy:0},
            {x: 1, dx:0, y:'', dy:-1},
            {x: '', dx:-1, y:0, dy:0}
        ];
        rightSpiral = [
            {x: '', dx:1, y:0, dy:0},
            {x: 1, dx:0, y:'', dy:1},
            {x: '', dx:-1, y:1, dy:0},
            {x: 0, dx:0, y:'', dy:-1}
        ];
        smokeBlocks = {
            b1_1 : {
                id: 'smokeBlk1_1' ,               // ид блока
                img : {                         // картинка для анимации
                     file:'smoke_left2.png',
                     sizePx: {w:200,h:75},
                    size: {w:60,h:100,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                  direction: 'left',           // направление обхода(против часовой)
                delay: 600,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            },
            b1_2 : {
                id: 'smokeBlk1_2' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_left2.png',
                    sizePx: {w:150,h:75},
                    size: {w:111.1,h:102.7,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                direction: 'left',           // направление обхода(против часовой)
                delay: 500,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            },
            b2_1 : {
                id: 'smokeBlk2_1' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_center1.png',
                    sizePx: {w:150,h:100},
                    size: {w:90.9,h:105,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                direction: 'left',           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            },
            b2_2 : {
                id: 'smokeBlk2_2' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_center1_1.png',
                    size: {w:150,h:100}
                },
                pathWay : 'rectangle',
                border: true,
                direction: 'left',           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            },
            b3_1 : {
                id: 'smokeBlk3_1' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_center2_1.png',
                    sizePx: {w:200,h:120},
                    size: {w:80.6,h:77.4,u: '%'}
                },
                pathWay : 'rectangle',
                border: false,
                direction: 'left',           // направление обхода(против часовой)
                delay: 500,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            },
            b4_1 : {
                id: 'smokeBlk4_1' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_center1.png',
                    sizePx: {w:150,h:100},
                    size: {w:90.9,h:105,u: '%'}
                },
                pathWay : 'rectangle',
                border: false,
                direction: 'right',           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }

            },
            b4_2 : {
                id: 'smokeBlk4_2' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_center1_1.png',
                    size: {w:150,h:100}
                },
                pathWay : 'rectangle',
                border: true,
                direction: 'right',           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }


            },

            b5_1 : {
                id: 'smokeBlk5_1' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_left2.png',
                    sizePx: {w:150,h:75},
                    size: {w:111.1,h:102.7,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                direction: 'right',           // направление обхода(против часовой)
                delay: 500,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            },
            b5_2 : {
                id: 'smokeBlk5_2' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_left2.png',
                    sizePx: {w:150,h:75},
                    size: {w:60,h:100,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                direction: 'right',           // направление обхода(против часовой)
                delay: 600,                  // задержка mSec
                currentState: {              // текущее состояние
                    startPosition : {x:0,y:0},  // начальная позиция на текущем витке(pathOffset)
                    twistingSpiral : true,   // направление спирали - закручивание
                    pathOffset : 0 ,           // смещение траектории от края в долях(0 - 0.5)
                    pathLine : 0               // движение вдоль n линии
                }
            }
        } ;
        $('#smokeBlk3').css('vertical-align','bottom') ;
        $('#smokeBlk5').css('vertical-align','top') ;
    } ;
    /**
     * запускает процесс изменения размеров
     */
    this.smokeResize = function() {
        resizeFlag =true ;
        if (!resizeGo) {    // запустить таймер
            stopAnimation = true ;
            var timeDelay = 1000 ;
            resizeGo = true ;
            var tmpTimer = setInterval(function () {
               if (resizeFlag) {
                   resizeFlag = false ;
                   resizeSteps = 0 ;
               }else {
                   if (++resizeSteps >= RESIZE_STEPS_MAX) {    // конец изменения размера
                       clearInterval(tmpTimer);
                       resizeGo = false ;
                       resizeSteps = 0 ;
                       alert('resize OVER') ;
                       _this.smokeGo() ;
                   }
               }

            }, timeDelay);
        }
    } ;
    /**
     * Запуск прцесса дымления
     */
    this.smokeGo = function() {
        stopAnimation = false ;
        mainSmokeBlockDefine() ;
        blockGo((smokeBlocks['b1_1'])) ;
        blockGo((smokeBlocks['b1_2'])) ;
        blockGo((smokeBlocks['b3_1'])) ;
        blockGo((smokeBlocks['b2_1'])) ;
        //blockGo((smokeBlocks['b2_2'])) ;
        blockGo((smokeBlocks['b4_1'])) ;
        //blockGo((smokeBlocks['b4_2'])) ;
        blockGo((smokeBlocks['b5_1'])) ;
        blockGo((smokeBlocks['b5_2'])) ;
    } ;
    /**
     * Область дыма - главный блок
     */
    var mainSmokeBlockDefine = function() {
        var Xmax = $(document).width();
        var H = Xmax * 0.535 ;
        var top = 0.6345 * H ;
        var height = 0.299 * H ;
        var $totalBlock = $('#mainBlock') ;
        $totalBlock.css('margin-top',top) ;
        $totalBlock.css('height',height) ;
    } ;
    /**
     *  запустить анимацию в блоке
     *  В блоке запускается таймер.Остановка по флагу stopAnimation
     */
    var blockGo = function(smokeBlock) {
        var timeDelay = smokeBlock.delay ;
        defineBlockImage(smokeBlock) ;                  // картинка для блока
        var tmpTimer = setInterval(function () {        // процесс анимации в блоке
            nextPosition(smokeBlock) ;
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
     * настройка изображения внутри блока
     * для размера картинки задаётся единица измерения(px | %)
     * Если в %, то это по отношению к размеру блока
     * @param block
     */
    var defineBlockImage = function(block) {
        var blockId = block['id'] ;
        var $block = $('#' + blockId) ;
        var imgPart = block['img'] ;
        var pictFile = imgPart['file'] ;
        var wSize = imgPart['size']['w'] ;
        var hSize = imgPart['size']['h'] ;
        var sizeUnit = imgPart['size']['u'] ;
        sizeUnit = (sizeUnit === undefined) ? 'px' : sizeUnit ;  // удиница измерения
        var blkId = block['id'] ;
        var $img = $('<img/>') ;
        $img.attr('src',pictFile) ;
        if (sizeUnit === '%') {
            wSize = Math.min(wSize,95) ;
            hSize = Math.min(hSize,95) ;
        }
        $img.css('width',wSize + sizeUnit) ;
        $img.css('height',hSize + sizeUnit) ;
        $img.attr('id','img' + blockId) ;
        $block.empty() ;
        $block.append($img) ;
        $('#'+ blockId+' img').css('margin-top',0) ;     // начальное положение картинки
        $('#'+ blockId+' img').css('margin-left',0) ;
        $img.click(function() {
            imgInfoShow(this) ;
        }) ;

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
    /**
     * следующая позиция "облачка" - основной метод имитации движения.
     * @param block - это объект типа smokeBlock
     */
    var nextPosition = function(block) {

        var blockId = block['id'] ;
        if (block['border'] === true) {              // рамка блока(при отладке)
            $('#'+blockId).css('border','1px solid green') ;
        }
        var blkHeight = $('#'+blockId).css('height') ;
        var blkWidth = $('#'+blockId).css('width') ;
        blkHeight = pixelToNumber(blkHeight) ;
        blkWidth = pixelToNumber(blkWidth) ;

        var $img = $('#' + blockId + ' img') ;
//      -- шаг внутри блока
        var dY = 0.1 * blkHeight ;
        var dX =  0.1 * blkWidth ;
        var state = block['currentState'] ;
        var pathOffset = state['pathOffset'] ; // смещение текущего витка
       // -- координаты картинки внутри блока
        var x = $img.css('margin-left') ;
        x = pixelToNumber(x) ;
        var y = $img.css('margin-top') ;
        y = pixelToNumber(y) ;
        //--- размер картинку
        var imgWidth = $img.css('width')  ; //  imgPart['size']['w'] ;
        var imgHeight = $img.css('height') ; // imgPart['size']['h'] ;
        imgWidth = pixelToNumber(imgWidth) ;
        imgHeight = pixelToNumber(imgHeight) ;

        var direction = block['direction'] ;
        var spiral = (direction === 'left') ? leftSpiral : rightSpiral ;
        var lineNumber = state['pathLine'] ;
        var twistingSpiral = state['twistingSpiral'] ;   // закручивание спирали
        var currentLine = spiral[lineNumber] ;
        var kDx = (currentLine['x'] === '') ? currentLine['dx'] : 0 ;
        var kDy = (currentLine['y'] === '') ? currentLine['dy'] : 0 ;

        var x1 = x + kDx * dX ;
        var y1 = y + kDy * dY ;

        var offset = state['pathOffset'] ;
        var xMin = offset/100 * blkWidth  ;
        var yMin = offset/100 * blkHeight  ;
        var xMax = (100 - 2*offset)/100 * blkWidth  - imgWidth ;
        var yMax = (100 - 2*offset)/100 * blkHeight  - imgHeight;

        if (xMin + imgWidth > xMax ) {
            xMax = xMin + imgWidth ;
        }
        if (xMax > blkWidth - imgWidth) {
            xMax = blkWidth - imgWidth ;
            if (xMin + imgWidth > xMax ) {
                xMin = xMax - imgWidth ;
            }
            if (xMin < 0) {
                xMin = 0 ;
                xMax = blkWidth - imgWidth ;
            }
        }
        if (yMin + imgHeight > yMax ) {
            yMax = yMin + imgHeight ;
        }
        if (yMax > blkHeight - imgHeight) {
            yMax = blkHeight - imgHeight ;
            if (yMin + imgHeight > yMax ) {
                yMin = yMax - imgHeight ;
            }
            if (yMin < 0) {
                yMin = 0 ;
                yMax = blkHeight - imgHeight ;
            }
        }

        var newLine = true ;
        if (x1 >= xMin && x1 <= xMax &&  y1 >= yMin && y1 <= yMax) {
            x = x1;
            y = y1;
            newLine = false;
        }
        var newOffset = false ;
        var newSpiral = false ;
        newOffset =  (newLine && lineNumber == 3) ;
        if (newOffset) {
           var offset1 = offset + ((twistingSpiral) ? 10 : -10) ;
// offset сбя не оправдал (!!)
            offset = 0 ;
            newSpiral = (offset1 < 0 || offset1 > 40) ;
            if (!newSpiral) {
                offset = Math.max(offset1, 0);
                offset = Math.min(offset, 40);
                x = offset / 100 * blkWidth;
                y = offset / 100 * blkHeight;
                lineNumber = 0;
            }
            newLine = false ;
        }
        if (newSpiral) {
            twistingSpiral = !twistingSpiral ;
            offset += (twistingSpiral) ? 10 : -10 ;
            x = offset/100 * blkWidth  ;
            y = offset/100 * blkHeight  ;
            lineNumber = 0 ;
            newLine = false ;
        }
        if (newLine) {
            lineNumber++;
            x = Math.max(x1,xMin) ;
            x = Math.min(x,xMax) ;
            y = Math.max(y1,yMin) ;
            y = Math.min(y,yMax) ;

        }

        $img.css('margin-top',y) ;
        $img.css('margin-left',x) ;
        state['pathLine'] =  lineNumber   ;
        state['twistingSpiral'] =  twistingSpiral   ;   // закручивание спирали
        state['pathOffset'] = offset ;
    }
}
