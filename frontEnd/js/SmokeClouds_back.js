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
    var $mainBlock = $('#mainBlock') ;
    var smokeBlocks = {} ;
    var currentBlock = {} ;
    var stopAnimation = false ;     // остановить анимацию
    var leftSpiral = {} ;
    var rightSpiral = {} ;
    var dirSmokeImages = paramSet.dirImages+'/smoke' ;
    var borderShowTotal = false ; //true ;     // показать все рамки
    var _this = this ;
    //-------------------------------//
    this.init = function() {

        smokeBlocks = {
            b1_1 : {
                id: 'smokeBlk1_1' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:0 ,
                    width: 21,
                    height: 70,
                    shadow: {
                        r: 30                  // тень справа 10%
                    }
                } ,
                img : {                         // картинка для анимации
                    file:'smoke_left_new_1.png',   //   'smoke_left2.png',
                    size: {w:90,h:60,u: '%'}
                },
                border: false,
                direction: -1,           //
                delay: 300,                  // задержка mSec
                circleMove: {
                    mainAxis: 'x',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: 1,
                    deltaMove: 10,         // %
                    rotationDirection: 'right',
                    radius: 15,          // %
                    deltaPhi: 20        // число тактов-шагов для одного оборота
                }
            },

            b1_1_c : {
                id: 'smokeBlk1_1_c' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:10 ,
                    width: 21,
                    height: 70,
                    shadow: {
                        r: 0                  // тень справа 10%
                    }
                } ,
                img : {                         // картинка для анимации
                    file:'smoke_left_new_1.png',   //   'smoke_left2.png',
                    size: {w:90,h:60,u: '%'}
                },
                border: false,
                direction: -1,           //
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'x',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 15,          // %
                    deltaPhi: 20        // число тактов-шагов для одного оборота
                }
            },




















            b1_2 : {
                id: 'smokeBlk1_2' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:21 ,
                    width: 9,
                    height: 70,
                    shadow: {
                        l: 50,                  // тень сслева 20%
                        r: 50
                    }
                } ,

                img : {                         // картинка для анимации
                    file: 'smoke_left_new_1_2.png',                 //'smoke_left2.png',
                    size: {w:90,h:70,u: '%'}
                },
                border: false,
                direction: 1,           //
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'x',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 5,         // %
                    rotationDirection: 'right',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }
            },



            b1_2_c : {
                id: 'smokeBlk1_2_c' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:23 ,
                    width: 9,
                    height: 70,
                    shadow: {
                        l: 50,                  // тень сслева 20%
                        r:50
                    }
                } ,

                img : {                         // картинка для анимации
                    file: 'smoke_left_new_1_2.png',                 //'smoke_left2.png',
                    size: {w:90,h:70,u: '%'}
                },
                border: false,
                direction: 1,           //
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'x',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 5,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }
            },







            b2_1 : {
                id: 'smokeBlk2_1' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 10 ,
                    left:27 ,
                    width: 11,
                    height: 40,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20,
                        d: 30
                    }
                } ,
                img : {                         // картинка для анимации
                    file:'smoke_center_new_1.png',
                    size: {w:90,h:90,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                direction: 'left',           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }
            },

            b2_1_c : {
                id: 'smokeBlk2_1_c' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 10 ,
                    left:25 ,
                    width: 11,
                    height: 40,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20,
                        d: 30
                    }
                } ,
                img : {                         // картинка для анимации
                    file:'smoke_center_new_1.png',
                    size: {w:90,h:90,u: '%'}
                },
                border: false,
                pathWay : 'rectangle',
                direction: 'left',           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: 1,
                    deltaMove: 10,         // %
                    rotationDirection: 'right',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }
            },




            b2_2 : {
                id: 'smokeBlk2_2' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 35 ,
                    left:33 ,
                    width: 28,
                    height: 50,
                    shadow: {
                        l: 10,                  // тень сслева 20%
                        r: 10,
                        t: 10
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_new_2.png',
                    size: {w:90,h:90,u: '%'}
                },
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }



            },

            b2_2_c : {
                id: 'smokeBlk2_2_c' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 35 ,
                    left:35 ,
                    width: 28,
                    height: 50,
                    shadow: {
                        l: 10,                  // тень сслева 20%
                        r: 10,
                        t: 10
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_new_2.png',
                    size: {w:90,h:90,u: '%'}
                },
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: 1,
                    deltaMove: 10,         // %
                    rotationDirection: 'right',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }



            },









            b3_1 : {
                id: 'smokeBlk3_1' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 35 ,
                    left:35 ,
                    width: 28,
                    height: 60,
                    shadow: {
                        l: 10,                  // тень сслева 20%
                        r: 10,
                        d: 10,
                        t:10
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_right_new_1.png',
                    size: {w:80.6,h:80,u: '%'}
                },
                pathWay : 'rectangle',
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }

            },
            b3_1_c : {
                id: 'smokeBlk3_1_c' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 35 ,
                    left:40 ,
                    width: 28,
                    height: 60,
                    shadow: {
                        l: 10,                  // тень сслева 20%
                        r: 10,
                        d: 10,
                        t:10
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_right_new_1.png',
                    size: {w:80.6,h:80,u: '%'}
                },
                pathWay : 'rectangle',
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 150,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: 1,
                    deltaMove: 10,         // %
                    rotationDirection: 'right',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }

            },

            b3_2 : {
                id: 'smokeBlk3_2' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 35 ,
                    left:35 ,
                    width: 28,
                    height: 60,
                    shadow: {
                        l: 10,                  // тень сслева 20%
                        r: 10,
                        d: 10,
                        t:10
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_new.png',
                    size: {w:80.6,h:80,u: '%'}
                },
                pathWay : 'rectangle',
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота
                }

            },

            b4_1 : {
                id: 'smokeBlk4_1' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:60 ,
                    width: 15,
                    height: 40,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20,
                        d: 15
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_right_new_2.png',
                    size: {w:80,h:80,u: '%'}
                },
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 300,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: 1,
                    deltaMove: 10,         // %
                    rotationDirection: 'right',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота

                }

            },

            b4_1_c : {
                id: 'smokeBlk4_1_c' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:63 ,
                    width: 15,
                    height: 40,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20,
                        d: 15
                    }
                } ,

                img : {                         // картинка для анимации
                    file:'smoke_center_right_new_2.png',
                    size: {w:80,h:80,u: '%'}
                },
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,                  // задержка mSec
                circleMove: {
                    mainAxis: 'y',
                    axisMin : 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax : 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота

                }

            },





            b4_2 : {
                id: 'smokeBlk4_2' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:57 ,
                    width: 11,
                    height: 60,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20,
                        t: 15
                    }
                } ,

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
                id: 'smokeBlk5_1',               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 10,
                    left: 68,
                    width: 25,
                    height: 50,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20
                    }
                },

                img: {                         // картинка для анимации
                    file: 'smoke_center_right_new_4.png',
                    size: {w: 70, h: 60, u: '%'}
                },
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,   // задержка mSec
                circleMove: {
                    mainAxis: 'x',
                    axisMin: 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax: 100,      // %
                    direction: -1,
                    deltaMove: 10,         // %
                    rotationDirection: 'left',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота

                }
            },

            b5_1_c : {
                id: 'smokeBlk5_1_c',               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 10,
                    left: 70,
                    width: 25,
                    height: 50,
                    shadow: {
                        l: 20,                  // тень сслева 20%
                        r: 20
                    }
                },

                img: {                         // картинка для анимации
                    file: 'smoke_center_right_new_4.png',
                    size: {w: 70, h: 60, u: '%'}
                },
                border: false,
                direction: 1,           // направление обхода(против часовой)
                delay: 200,   // задержка mSec
                circleMove: {
                    mainAxis: 'x',
                    axisMin: 0,     // %  ограничение перемещения по оси mainAxis
                    axisMax: 100,      // %
                    direction: 1,
                    deltaMove: 10,         // %
                    rotationDirection: 'right',
                    radius: 10,          // %
                    deltaPhi: 20       // число тактов-шагов для одного оборота

                }
            },



            b5_2 : {
                id: 'smokeBlk5_2' ,               // ид блока
                place: {                          // расположение по отношению к $mainBlock 'у
                    top: 0 ,
                    left:77 ,
                    width: 21,
                    height: 50,
                    shadow: {
                        l: 20                  // тень сслева 20%
                    }
                } ,

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
        mainSmokeBlockDefine() ;
        blockGo((smokeBlocks['b1_1'])) ;
        blockGo((smokeBlocks['b1_1_c'])) ;
        blockGo((smokeBlocks['b1_2'])) ;
        blockGo((smokeBlocks['b1_2_c'])) ;
        blockGo((smokeBlocks['b2_1'])) ;
        blockGo((smokeBlocks['b2_1_c'])) ;
        blockGo((smokeBlocks['b2_2'])) ;
        blockGo((smokeBlocks['b2_2_c'])) ;
        //   blockGo((smokeBlocks['b3_1'])) ;
        blockGo((smokeBlocks['b3_2'])) ;
        //    blockGo((smokeBlocks['b3_1_c'])) ;
        //blockGo((smokeBlocks['b2_2'])) ;
        blockGo((smokeBlocks['b4_1'])) ;
        blockGo((smokeBlocks['b4_1_c'])) ;
        //blockGo((smokeBlocks['b4_2'])) ;
        blockGo((smokeBlocks['b5_1'])) ;
        blockGo((smokeBlocks['b5_1_c'])) ;
        //    blockGo((smokeBlocks['b5_2'])) ;
    } ;
    /**
     * Область дыма - главный блок
     */
    var mainSmokeBlockDefine = function() {
        var Xmax = $(document).width() ;
        var H = Xmax * 0.535 ;
        var top = 0.6345 * H ;
        var height = 0.299 * H ;
        var $totalBlock = $('#mainBlock') ;
        $totalBlock.css('margin-top',top) ;
        $totalBlock.css('height',height) ;
    } ;
    /**
     * простой блок по отношению к главному блоку
     * @param blockId
     * @param place
     */
    var ordinarySmokeBlockDefine = function(blockId,place) {
        var top = place['top'];
        var left = place['left'];
        var width = place['width'];
        var height = place['height'];
        var shadow = place['shadow'];
        var shadowL = (shadow['l'] === undefined) ? 0 : shadow['l'];   // тень слева
        var shadowR = (shadow['r'] === undefined) ? 0 : shadow['r'];   // тень справа
        var shadowT = (shadow['t'] === undefined) ? 0 : shadow['t'];   // тень сверху
        var shadowD = (shadow['d'] === undefined) ? 0 : shadow['d'];   // тень снизу
        top -= shadowT/100 * height;
        height += (shadowT + shadowD)/100 * height;
        left -= shadowL/100 * width;
        width += (shadowL + shadowR)/100 * width;
        var $block = $('<div/>');
        $block.attr('id', blockId);
        $mainBlock.append($block);
        $block.css('position', 'absolute');
        $block.css('top', top + '%');
        $block.css('left', left + '%');
        $block.css('width', width + '%');
        $block.css('height', height + '%');
    } ;
    /**
     *  запустить анимацию в блоке
     *  В блоке запускается таймер.Остановка по флагу stopAnimation
     */
    var blockGo = function(smokeBlock) {
        var blockId = smokeBlock['id'] ;
        var place = smokeBlock['place'] ;     // расположение блока
        ordinarySmokeBlockDefine(blockId,place) ;
        var timeDelay = smokeBlock.delay ;
        if (smokeBlock['border'] === true || borderShowTotal )  {              // рамка блока(при отладке)
            $('#'+blockId).css('border','1px solid green') ;
        }
        defineBlockImage(smokeBlock) ;                  // картинка для блока
        var $img = $('#' + blockId + ' img') ;
        var motion = new CircularMotion() ;     // управдение движением
        motion.init(smokeBlock) ;
        var tmpTimer = setInterval(function () {        // процесс анимации в блоке
            var imjCoord = motion.getImjPosition() ;
            $img.css('margin-top',imjCoord['y']) ;
            $img.css('margin-left',imjCoord['x']) ;
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
        $img.attr('src',dirSmokeImages+'/'+pictFile) ;
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
        //     $img.click(function() {
        //          imgInfoShow(this) ;
        //      }) ;

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
