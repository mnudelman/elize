/**
 * Описатель фонового изображения
 * объект содержит описание компонентов фонового изображения:
 * главное фоновое изображение - mainImg
 * центральный Круг - centralCircle,
 * облака - clouds,
 * планка "продолжить" - stamp,
 * "философские картинки" - philosophyPictures
 * компонент описаний place содержит абсолютные координаты элемента,
 * взятые из шаблона фонового изображения (magic2.psd) .
 * Операции:
 *  пересчёт коэффициентов под реальный размер окна браузера
 *  в основе пересчёта отношение ширины_окна_браузера к размеру фонового изображения
 *  getter'ы для соответствующих объектов выдают клоны с пересчитанными кординатами объектов
 */
function BackgroundImg() {
    var mainImg = {} ;          // главная кртинка( body {background-image}
    var clouds = {} ;           // облака
    var philosophyPictures = {} ; // картинки для иллюстрации
    var centralCircle = {} ;      // центральный круг
    var stamp = {} ;              // печать - ввод запроса
    var scroll = {} ;             // свиток - панель для вывода результата
    var dirImages = paramSet.dirImages ;
    var dirMainImg ;
    var dirSmoke ;
    var dirPictures ;
    var $centralCircleBlock = $('#centralCircle') ;
    var $centralCircleTextBlock = $('#centralCircleText') ;
    var $stampBlock = $('#stamp') ;
    var animateStop = false ;
    var centralCircleText ;       // объект поддержки размера области ввода
    var _this = this ;
    //------------------------------------//
    this.init = function() {
        centralCircleText = new CentralCircleText() ;
        dirSmoke = dirImages + '/smoke' ;
        dirPictures =  dirImages + '/philosophy' ;
        dirMainImg =   dirImages + '/userInterface' ;

        mainImg = {                         //  главное изображение - задаёт пропорции всех элементов
            file: "magic2_empty_serg.jpg",
            size : {w:1917, h:1074 ,u:'px'}
        } ;
        centralCircle = {
            dir: dirMainImg,
            place: {
                x1: 800, //798, //808,
                y1: 380, //381,
                x2: 1130,
                y2: 710 // 711
            },
            textArea: {
                x1: 827,
                y1: 460,
                x2: 1095,
                y2: 625 //630 // 632
            },

            query: {                               // ценральный круг при вводе запроса
                idText : 'queryText',
                ball: 'yellow_ball_2.png',
                textArea: 'yellow_text_area.png',
                color: '#fff', //'#47d4d9', // 'blue',    // '#11f371',
                readonly: false

            },
            answer: {                             // центральный круг при "философском" ответе
                idText : 'answerText',
                ball: 'blue_ball.png',
                textArea: 'blue_text_area.png',
                color: 'yellow' , ///   '#f3114c',
                readonly: true
            }

        } ;
        stamp = {                         // планка "далее" - ввод запроса
            dir: dirMainImg,
            place: {
                x1: 808,
                y1: 678,
                x2: 1111,
                y2: 748
            },
            query: {
                img: {
                    file: 'stamp_ask.png'
                }
            },
            answer: {
                img: {
                    file: 'stamp.png'
                }
            }
        } ;

       clouds = {                    // облака
           dir: dirSmoke,
           items: {
               '141': {
                   place: {
                       x1: 514,
                       y1: 606,
                       x2: 1463,
                       y2: 933
                   },
                   img: {
                       file: '141.png'
                   }
               },
               '196l': {
                   place: {
                       x1: 167,
                       y1: 708,
                       x2: 929,
                       y2: 1052
                   },
                   img: {
                       file: '196l.png'
                   }
               },
               '196r': {
                   place: {
                       x1: 821,
                       y1: 695,
                       x2: 1615,
                       y2: 1085
                   },
                   img: {
                       file: '196r.png'
                   }
               },
               '197l': {
                   place: {
                       x1: 92,
                       y1: 669,
                       x2: 689,
                       y2: 1090
                   },
                   img: {
                       file: '197l.png'
                   }
               },
               '197r': {
                   place: {
                       x1: 1206,
                       y1: 670,
                       x2: 1787,
                       y2: 1071
                   },
                   img: {
                       file: '197r.png'
                   }
               },
               '146l': {
                   place: {
                       x1: 437,
                       y1: 647,
                       x2: 729,
                       y2: 801
                   },
                   img: {
                       file: '146l.png'
                   }
               },
               '146r': {
                   place: {
                       x1: 1073,
                       y1: 647,
                       x2: 1399,
                       y2: 803
                   },
                   img: {
                       file: '146r.png'
                   }
               },
               '147': {
                   place: {
                       x1: 602,
                       y1: 771,
                       x2: 1376,
                       y2: 1018
                   },
                   img: {
                       file: '147.png'
                   }
               },
               '144': {
                   place: {
                       x1: 480,
                       y1: 657,
                       x2: 1417,
                       y2: 1142
                   },
                   img: {
                       file: '144.png'
                   }
               },
               '142r': {
                   place: {
                       x1: 1373,
                       y1: 671,
                       x2: 1780,
                       y2: 870
                   },
                   img: {
                       file: '142r.png'
                   }
               },
               '142l': {
                   place: {
                       x1: 90,
                       y1: 672,
                       x2: 505,
                       y2: 874
                   },
                   img: {
                       file: '142l.png'
                   }
               },
               '139r': {
                   place: {
                       x1: 650,
                       y1: 544,
                       x2: 1224,
                       y2: 892
                   },
                   img: {
                       file: '139r.png'
                   }
               },
               '139l': {
                   place: {
                       x1: 648,
                       y1: 559,
                       x2: 1267,
                       y2: 913
                   },
                   img: {
                       file: '139l.png'
                   }
               },
               '140l': {
                   place: {
                       x1: 341,
                       y1: 560,
                       x2: 882,
                       y2: 901
                   },
                   img: {
                       file: '140l.png'
                   }
               },
               '140r': {
                   place: {
                       x1: 1034,
                       y1: 548,
                       x2: 1643,
                       y2: 904
                   },
                   img: {
                       file: '140r.png'
                   }
               }
           }
       } ;
//   правые и левые элементы имеют одинаковые размеры -> можно использовать одни и те же рамки
// топология расположения:
// l1_1 - l1_2 - l1_3       r1_1 - r1_2  - r1_3
//    l2_1    l2_2             r2_1    r2_2
//    l3_1    l2_2             r2_1    r3_1
        philosophyPictures = {
            dir: dirPictures,
            borderSize: 20,        // толщина рамки px
            items: {
                'l1_1': {                      // карты
                    place: {
                        x1: 344,
                        y1: 215,
                        x2: 514,
                        y2: 358,
                        dy : 10      //  поправка
                    },
                    img: {
                        file: 'l1_1_o.jpg',
                        border:'l1_1_b.jpg'
                    },
                    subst: 'cards'          // имя множества картинок в философском ответе
                },
                'l1_2': {                      // созвездия
                    place: {
                        x1: 536,
                        y1: 215,
                        x2: 706,
                        y2: 362,
                        dy : 10      //  поправка

                    },
                    img: {
                        file: 'l1_2_o.jpg',
                        border:'l1_2_b.jpg'
                    },
                    subst: 'astrology'
                },
                'l1_3': {                     // домино
                    place: {
                        x1: 732,
                        y1: 215,
                        x2: 899,
                        y2: 361,
                        dy : 0      //  поправка
                    },
                    img: {
                        file: 'l1_3_o.jpg',
                        border:'l1_3_b.jpg'
                    },
                    subst: 'domino'
                },
                'l2_1': {                      // лунно-солнечный календарь
                    place: {
                        x1: 344,
                        y1: 377 ,
                        x2: 540,
                        y2: 524,
                        dy : 10  + 5     //  поправка
                    },
                    img: {
                        file: 'l2_1_o.jpg',
                        border:'l2_1_b.jpg'
                    },
                    subst: 'moon_calendar'
                },
                'l2_2': {                      // карты таро
                    place: {
                        x1: 563,
                        y1: 377,
                        x2: 760,
                        y2: 690,
                        dy : 10      //  поправка
                    },
                    img: {
                        file: 'l2_2_o.jpg',
                        border:'l2_2_b.jpg'
                    },
                    subst: 'taro'
                },
                'l3_1': {                      // стихии
                    place: {
                        x1: 344,
                        y1: 542,
                        x2: 540,
                        y2: 690,
                        dy : 10      //  поправка
                    },
                    img: {
                        file: 'l3_1_o.jpg',
                        border:'l3_1_b.jpg'
                    },
                    subst: 'elements'
                },
                'r1_1': {                         // звери
                    place: {
                        x1: 1023,
                        y1: 215,
                        x2: 1192,
                        y2: 356,
                        dy : 10      //  поправка
                    },
                    img: {
                        file: 'r1_1_o.jpg',
                        border:'l1_1_b.jpg' // 'r1_1_b.jpg'
                    },
                    subst: 'animals'
                },
                'r1_2': {                         // деревья
                    place: {
                        x1: 1217,
                        y1: 215,
                        x2: 1385,
                        y2: 356,
                        dy : 10 + 5      //  поправка
                    },
                    img: {
                        file: 'r1_2_o.jpg',
                        border:'l1_2_b.jpg' // 'r1_2_b.jpg'
                    },
                    subst: 'trees'
                },
                'r1_3': {                        // валюта
                    place: {
                        x1: 1409,
                        y1: 215,
                        x2: 1581,
                        y2: 358,
                        dy : 10      //  поправка
                    },
                    img: {
                        file: 'r1_3_o.jpg',
                        border:'l1_3_b.jpg'  //'r1_3_b.jpg'
                    },
                    subst: 'money'
                },
                'r2_1': {                       // цифры
                    place: {
                        x1: 1164,
                        y1: 377,
                        x2: 1363,
                        y2: 688,
                        dy : 10      //  поправка
                    },
                    img: {
                        file: 'r2_1_o.jpg',
                        border:'l2_2_b.jpg'   //'r2_1_b.jpg'
                    },
                    subst: 'digits'
                },
                'r2_2': {                     // цвета
                    place: {
                        x1: 1381,
                        y1: 377,
                        x2: 1580,
                        y2: 524,
                        dy : 10 + 5     //  поправка
                    },
                    img: {
                        file: 'r2_2_o.jpg',
                        border:'l2_1_b.jpg'  //'r2_2_b.jpg'
                    },
                    subst: 'colors'
                },
                'r3_1': {                    // страны
                    place: {
                        x1: 1381,
                        y1: 542,
                        x2: 1580,
                        y2: 688,
                        dy : 0      //  поправка
                    },
                    img: {
                        file: 'r3_1_o.jpg',
                        border:'l3_1_b.jpg' //'r3_1_b.jpg'
                    },
                    subst: 'countries'
                }
            }
        } ;


    } ;
    /**
     * отношение высоты к ширине
     */
    this.getKHW = function() {
        var mainImgSize = mainImg['size'] ;
        var w  = mainImgSize['w'] ;
        var h  = mainImgSize['h'] ;
        return Math.round((h/w)*100000)/100000 ;
    } ;
    /**
     * пересчёт в реальный размер экрана
     */
    this.getKResize = function() {
        var screenW = $(document).width() ;
        var screenH = $(document).height() ;
        var imgW  = mainImg['size']['w'] ;
        var imgH  = mainImg['size']['h'] ;
        var imgHClc = screenW * _this.getKHW() ;
        var kx = Math.round((screenW/imgW)*100000)/100000 ;
        var ky = Math.round((imgHClc/imgH)*100000)/100000 ;
        return {'kx' : kx, 'ky' : ky} ;

    } ;
    /**
     * получить "облака" с пересчитанными координатами
     * @returns {{}}
     */
    this.getClouds = function() {
        var currentClouds = {} ;
        currentClouds['dir'] = clouds['dir'] ;
        currentClouds['items'] = {} ;
        var currentItems = currentClouds['items'] ;
        var items = clouds['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            currentItems[itemKey] = newImgItem(item) ;
        }
        return currentClouds ;
    } ;
    /**
     * клонируем элемент с пересчётом координат
     * @param item
     * @returns {{}}
     */
    var newImgItem = function(item) {
        var currentItem = {} ;
        var place = item['place'] ;
        currentItem['place'] = placeResize(place) ;
        currentItem['img'] = newItemImg(item['img']) ;
        currentItem['subst'] = item['subst'] ;
        return currentItem ;
    } ;
    var newItemImg = function(itemImg) {
        var file = itemImg['file'] ;
        var borderFile = itemImg['border'] ;
        return {file: file, border:borderFile} ;
    } ;
    /**
     * пересчёт координат для объекта place
     * @param place
     * @returns {{}}
     */
    var placeResize = function(place) {
        var x1 = place['x1'] ;
        var y1 = place['y1'] ;
        var x2 = place['x2'] ;
        var y2 = place['y2'] ;
        var dy = (place['dy'] === undefined) ? 0 : place['dy'] ;

        var newPlace = {} ;
        var kResize = _this.getKResize()  ;
        var kx = kResize['kx']  ;
        var ky = kResize['ky']  ;
        newPlace['x1'] = Math.round(kx * x1) ;
        newPlace['y1'] = Math.round(ky * y1) ;
        newPlace['x2'] = Math.round(kx * x2) ;
        newPlace['y2'] = Math.round(ky * y2) ;
        newPlace['dy'] = Math.round(ky * dy) ;
        return newPlace ;

    } ;
    /**
     * получить "философские картинки" с пересчитанными координатами
     * @returns {{}}
     */
    this.getPhilosophyPictures = function() {
        var currentPictures = {} ;
        currentPictures['dir'] = philosophyPictures['dir'] ;

        var kResize = _this.getKResize()  ;
        var kx = kResize['kx']  ;
        var ky = kResize['ky']  ;
       // оставим одну толщину
        currentPictures['borderSize'] = philosophyPictures['borderSize'] * kx ;

        currentPictures['items'] = {} ;
        var currentItems = currentPictures['items'] ;
        var items = philosophyPictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            currentItems[itemKey] = newImgItem(item) ;
        }
        return currentPictures ;
    };
    /**
     * получить ценктральный круг
     * @returns {{}}
     */
    this.getCentralCircle = function() {
        var currentCircle = {} ;
        currentCircle['dir'] = centralCircle['dir'] ;
        currentCircle['place'] =  placeResize(centralCircle['place']) ;
        currentCircle['textArea'] =  placeResize(centralCircle['textArea']) ;
        currentCircle['query'] = centralCircle['query'] ;
        currentCircle['answer'] = centralCircle['answer'] ;
        return currentCircle ;
    } ;
    var newTextArea = function(alpha,newPlace) {
       var textArea = {} ;


    } ;
    /**
     * планка "далее" - запуск выполнения запроса
     * @returns {{}}
     */
    this.getStamp = function() {
        var currentStamp = {} ;
        currentStamp['dir'] = stamp['dir'] ;
        currentStamp['place'] = placeResize(stamp['place']) ;
        currentStamp['query'] = stamp['query'] ;
        currentStamp['answer'] = stamp['answer'] ;
        return currentStamp ;
    } ;

    this.stampShow = function(type) {
        var currentStamp = _this.getStamp() ;
        var place = currentStamp['place'] ;
        var dir = currentStamp['dir'] ;
        var imgFile = currentStamp[type]['img']['file'] ;
        var stampPicture = dir +'/' + imgFile ;
        _this.defineAbsolutePosition($stampBlock,place,stampPicture) ;
    } ;
    /**
     * выводит центральный круг по типу
     * внутри круга определяется область ввода запроса
     * @param showType = "query" - ввод текста запроса | 'answer' - философский ответ
     */
    this.centralCircleShow = function(showType) {
        var currentCircle = _this.getCentralCircle() ;
        var place = currentCircle['place'] ;
        var textAreaPlace = currentCircle['textArea'] ;
        var dir = currentCircle['dir'] ;

        var typeBlock = currentCircle[showType] ;

        var ballPicture = dir +'/' + typeBlock['ball'] ;
        var textAreaBackGround = dir +'/' + typeBlock['textArea'] ;
        var currentColor = typeBlock['color'] ;
        var readonly = typeBlock['readonly'] ;
        var idText = typeBlock['idText'] ;
        _this.defineAbsolutePosition($centralCircleBlock,place,ballPicture) ;

        defineTextArea($centralCircleTextBlock,textAreaPlace,textAreaBackGround,
            currentColor,0,readonly,idText) ;
    } ;
    /**
     * позиционирование блока и вставка изображения
     * @param $block
     * @param place
     * @param imgFile
     */
    this.defineAbsolutePosition = function($block,place,imgFile) {
        $block.css('position','absolute') ;
        $block.empty() ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var $img = $('<img/>') ;
        $img.attr('src',imgFile) ;
        $block.css('top',y1) ;
        $block.css('left',x1) ;
        $img.css('width',x2 - x1) ;
        $img.css('width',x2 - x1) ;
        $block.append($img) ;
    } ;
    /**
     * определение области ввода запроса
     * запускается поддержка управления высотой области ввода
     * @param $block
     * @param place
     * @param imgFile
     * @param color
     * @param fontSize
     * @param readonly - true - признак что поле не нужно( для оформления "философии")
     * @param idText
     */
    var defineTextArea = function($block,place,imgFile,color,fontSize,readonly,idText) {
        $block.css('position','absolute') ;
       $block.removeAttr('hidden') ;
//        $block.css('border','3px solid red') ;
        $block.empty() ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var $txt = $('<textarea/>') ;
        $block.css('top',y1) ;
        $block.css('left',x1) ;
        $block.css('color',color) ;
        if (readonly) {
            return ;
        }else {
           $txt.removeAttr('readonly') ;
        }

        var txtWidth = x2 - x1 ;
        var txtHeight = y2 - y1 ;

        $block.css('width',txtWidth) ;
        $block.css('height',txtHeight) ;

        $txt.removeAttr('hidden') ;

        $block.append($txt) ;

        $txt.addClass('queryText') ;
        $txt.attr('placeholder','Введите вопрос') ;
        $txt.css('width',0.95*txtWidth) ;
         $txt.attr('id',idText) ;
        $txt.css('height',0.97 * txtHeight) ;
        $txt.css('max-height',0.8 * txtHeight) ;
        $block.css('overflow','hidden') ;
        $txt.css('background','transparent') ;
        $txt.css('border','0px solid white') ;
        centralCircleText.init(txtWidth,txtHeight,$txt) ;
    } ;
    /**
     * ид области ввода текста
     * @param showType - тип ('query' | 'answer')
     * @returns {*}
     */
    this.getIdText = function(showType) {
        return centralCircle[showType]['idText'] ;
    } ;
    this.getTextAreaBlock = function() {
        return $centralCircleTextBlock ;
    } ;
    /**
     * вращение центрального круга - процесс "размышления оракула"
     * @param callback   - возвращает управление при окончании "размышления"
     */
    this.centralCircleRotate = function(callback) {
        $centralCircleTextBlock.attr('hidden', 'hidden');  // убираем поле ввода
        var $block = $centralCircleBlock;
        var x0 = pixelToNumber($block.css('left')) + pixelToNumber($block.css('width')) / 2;
        var y0 = pixelToNumber($block.css('top')) + pixelToNumber($block.css('height')) / 2;
        var $img = $block.children('img');
        var n = 0;          //  счётчик шагов  - элементарных поворотов на угол alphaStep
        var alphaStep = 30 ;   // шаг поворота (угловые градусы)
        var maxTime = 3000 ;
        animateStop = false;
        var time = 0 ;

        var timeDelay = 300;
        var tmpTimer = setInterval(function () {
            if (time > maxTime) {        //  остановить цикл вращения)
                clearInterval(tmpTimer);
                $centralCircleTextBlock.removeAttr('hidden');    // поле ввода - возврат
                if (callback !== undefined) {
                    callback() ;
                }
            } else {
                var alpha = ++n * alphaStep ;
                $img.css('transform', 'rotate(' + alpha + 'deg)');
                n = (n >= 6) ? 0 : n;
                time += timeDelay ;
            }
        }, timeDelay);


    };
    /**
     * преобразовать строку вида 230px в число 230
     * @param strPixel
     * @returns {number}
     */
    var pixelToNumber = function (strPixel) {
        var n = strPixel.replace('px', '');
        return n - 0;
    };


}
