/**
 * Клыбы дыма - объект управления анимацией
 */
function SmokeClouds() {
    var smokeBlocks = {} ;
    var currentBlock = {} ;
    var stopAnimation = false ;     // остановить анимацию
    var leftSpiral = {} ;
    var rightSpiral = {} ;
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
                     size: {w:200,h:75}
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
                    size: {w:150,h:75}
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
            b2_1 : {
                id: 'smokeBlk2_1' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_center1.png',
                    size: {w:150,h:100}
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
                border: false,
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
                    size: {w:200,h:120}
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
                    size: {w:150,h:100}
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

            b5_1 : {
                id: 'smokeBlk5_1' ,               // ид блока
                img : {                         // картинка для анимации
                    file:'smoke_left2.png',
                    size: {w:150,h:75}
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
                    size: {w:200,h:75}
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
            }
        } ;
        $('#smokeBlk3').css('vertical-align','bottom') ;
        $('#smokeBlk5').css('vertical-align','top') ;
    } ;
    this.smokeGo = function() {
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
     *  запустить анимацию в блоке
     */
    var blockGo = function(smokeBlock) {
        var timeDelay = smokeBlock.delay ;
        defineBlockImage(smokeBlock) ;                  // картинка для блока
        startPosition(smokeBlock) ;

        var tmpTimer = setInterval(function () {
            nextPosition(smokeBlock) ;
            if (stopAnimation) {
                clearInterval(tmpTimer);
            }
        }, timeDelay);

    } ;
    var defineBlockImage = function(block) {
        var blockId = block['id'] ;
        var $block = $('#' + blockId) ;
        var imgPart = block['img'] ;
        var pictFile = imgPart['file'] ;
        var wSize = imgPart['size']['w'] ;
        var hSize = imgPart['size']['h'] ;
        var blkId = block['id'] ;
        var $img = $('<img/>') ;
        $img.attr('src',pictFile) ;
        $img.css('width',wSize) ;
        $img.css('height',hSize) ;
        $img.attr('id','imgBlk1') ;
        $block.empty() ;
        $block.append($img) ;
        $('#'+ blockId+' img').css('margin-top',0) ;
        $('#'+ blockId+' img').css('margin-left',0) ;

    } ;
    var startPosition = function(block) {

    } ;
    var nextPosition = function(block) {
        var blockId = block['id'] ;
        var blkHeight = $('#'+blockId).css('height') ;
        if (block['border'] === true) {
            $('#'+blockId).css('border','1px solid green') ;
        }
        blkHeight = blkHeight.replace('px','') ;
        blkHeight = (blkHeight-1) + 1 ;
        var blkWidth = $('#'+blockId).css('width') ;
        blkWidth = blkWidth.replace('px','') ;
        blkWidth = (blkWidth-1) + 1 ;
        var $img = $('#' + blockId + ' img') ;

        var dY = 0.1 * blkHeight ;
        var dX =  0.1 * blkWidth ;
        var state = block['currentState'] ;
        var pathOffset = state['pathOffset'] ; // смещение текущего витка

        var x = $img.css('margin-left') ;
        x = x.replace('px','') ;
        x = (x-1) + 1 ;
        var y = $img.css('margin-top') ;
        y = y.replace('px','') ;
        y = (y-1) + 1 ;

        var imgPart = block['img'] ;
        var imgWidth = imgPart['size']['w'] ;
        var imgHeight = imgPart['size']['h'] ;

//        alert('x='+x+'\n'+'y='+y + '\n'+'dx='+dX+'\n'+'dy='+dY) ;


        var direction = block['direction'] ;
        var spiral = (direction === 'left') ? leftSpiral : rightSpiral ;
        var lineNumber = state['pathLine'] ;
        var twistingSpiral = state['twistingSpiral'] ;   // закручивание спирали
        var currentLine = spiral[lineNumber] ;
        var kDx = (currentLine['x'] === '') ? currentLine['dx'] : 0 ;
        var kDy = (currentLine['y'] === '') ? currentLine['dy'] : 0 ;

        var x1 = x + kDx * dX ;
        var y1 = y + kDy * dY ;

 //       alert('x1='+x1+'\n'+'y1='+y1) ;


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


//        alert('x:'+x+ '\n'+'y:'+y) ;
        $img.css('margin-top',y) ;
        $img.css('margin-left',x) ;
        state['pathLine'] =  lineNumber   ;
        state['twistingSpiral'] =  twistingSpiral   ;   // закручивание спирали
        state['pathOffset'] = offset ;
    }
}
