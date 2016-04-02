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
 * вывод двух элементов изображения: планки ввода запроса и
 * центрального круга в статическом режиме и при вращении
 */
function BackgroundImg() {
    var mainImg = {} ;          // главная кртинка( body {background-image}
    var clouds = {} ;           // облака
    var philosophyPictures = {} ; // картинки для иллюстрации
    var centralCircle = {} ;      // центральный круг
    var centralCircleGlow = {};   // размытый шар
    var stamp = {} ;              // печать - ввод запроса
    var dirImages = paramSet.dirImages ;
    var placeholder ;             // объект - имитатор placeholder
    var dirMainImg ;
    var dirSmoke ;
    var dirPictures ;
    var $centralCircleBlock = $('#centralCircle') ;             // центральный круг
    var $centralCircleGlowBlock = $('#centralCircleGlow') ;     // ореол вокруг центрального круга
    var $centralCircleTextBlock = $('#centralCircleText') ;     // область текста внутри круга
    var $stampBlock = $('#stamp') ;
    var centralCircleText ;       // объект поддержки измеения размера области ввода
    var currentMainWidth ;        // текущие размеры основного блока
    var currentMainHeight ;
    var _this = this ;
    //------------------------------------//
    this.init = function() {
        placeholder = paramSet.placeholder ;

        centralCircleText = new CentralCircleText() ;
        dirSmoke = dirImages + '/smoke' ;
        dirPictures =  dirImages + '/philosophy' ;
        dirMainImg =   dirImages + '/userInterface' ;

        mainImg = {                         //  главное изображение - задаёт пропорции всех элементов
            file: "magic2_empty_serg.jpg",
            size : {w:1917, h:1074 ,u:'px'}
        } ;
        centralCircle = {                 // центральный круг
            dir: dirMainImg,
            place: {
                x1: 800,
                y1: 380,
                x2: 1130,
                y2: 710
            },
            increase: {            // координаты при раздувании центрального шара
                y1: 183 ,
                y2: 710
            },
            textArea: {            // область текста внутри круга
                x1: 827 - 6,
                y1: 460 + 5,
                x2: 1095 + 6,
                y2: 625 + 5
            },
            query: {     // ценральный круг при вводе запроса
                idText : 'queryText',
                ball: 'yellow_ball_3.png',
                textArea: 'yellow_text_area.png',
                color: '#fff',
                readonly: false

            },
            answer: {      // центральный круг при "философском" ответе
                idText : 'answerText',
                ball: 'blue_ball.png',
                textArea: 'blue_text_area.png',
                color: 'yellow' , ///   '#f3114c',
                readonly: true
            }

        } ;
        centralCircleGlow = {   // размытый шар
            dir: dirMainImg,
            place: {
                x1: 800 - 40,
                y1: 380 - 40,
                x2: 1130 + 40,
                y2: 710 +40
                },
            img: {
                file :'yellow_ball_glow.png'
            }
        } ;



        stamp = {       // планка "далее" - ввод запроса
            dir: dirMainImg,
            css: 'stamp',
            place: {
                x1: 808,
                y1: 678,
                x2: 1111,
                y2: 748
            },
            query: {                     // ввод вопроса
                img: {
                    file: 'stamp_ask.png'
                }
            },
            answer: {                   // "далее" для пояснения ответа
                img: {
                    file: 'stamp.png'
                }
            }
        } ;
       //-- имена элементов облаков совпадают с элементами шаблона
       //   добавлены индексы l - левая половина, r - правая
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
//   картинки основного фона
//   правые и левые элементы имеют одинаковые размеры ->
//           можно использовать одни и те же рамки
//  атрибут typeSignal определяет типСигнала для картинки
//  place.dy - поправка для обеспечение центрирования по вертикали
// изображение задаётся тремя файлами:
//  text: <статическое изображение основного фона с подписью>
//  border: <файл - рамка с чёрным фоном>
//  file: <изображение - основа для имитации кругового вращения>
//  область place - это расположение рамки с фоном
//  область innerPlace - бласть внутри рамки - собственно само изображение
// топология расположения:
// l1_1 - l1_2 - l1_3       r1_1 - r1_2  - r1_3
//    l2_1    l2_2             r2_1    r2_2
//    l3_1    l2_2             r2_1    r3_1
        philosophyPictures = {
            dir: dirPictures,
            commentBlock: {                // не используется
                place: {
                    x1: 766,      // l2_2 +
                    w: 394,
                    y1: 362,      // l1_3 +
                    h: 333
                },
                textPlace: {
                    x1:  50,      // l2_2 +
                    w:   340,
                    y1: 188,      // l1_3 +  - шапка
                    h: 333 - 188

                }

            },
            items: {
                'l1_1': {                      // карты
                    place: {
                        x1: 340,
                        w: 178,
                        y1: 211,
                        h: 151,
                        dy : 10      //  поправка
                    },
                    innerPlace: {
                        x1: 358,
                        w: 142,
                        y1: 228,
                        h: 117
                    },
                    img: {
                        file: 'l1_1_o.png',
                        border:'l1_1_b.png',
                        text: 'l1_1_t.png'
                    },
                    typeSignal: 'cards'    // имя множества картинок в философском ответе
                },
                'l1_2': {                      // созвездия
                    place: {
                        x1: 533, // 537,
                        w: 178,
                        y1: 211,
                        h: 151,
                        dy : 10      //  поправка

                    },
                    innerPlace: {
                        x1: 551,
                        w: 142,
                        y1: 228,
                        h: 117
                    },

                    img: {
                        file: 'l1_2_o.png',
                        border:'l1_1_b.png',
                        text: 'l1_2_t.png'

                    },
                    typeSignal: 'astrology'
                },
                'l1_3': {                     // домино
                    place: {
                        x1: 727,
                        w: 178,
                        y1: 211,
                        h: 151,
                        dy : 0      //  поправка
                    },
                    innerPlace: {
                        x1: 745,
                        w: 142,
                        y1: 228,
                        h: 117
                    },

                    img: {
                        file: 'l1_3_o.png',
                        border:'l1_1_b.png',
                        text: 'l1_3_t.png'
                    },
                    typeSignal: 'domino'
                },
                'l2_1': {                      // лунно-солнечный календарь
                    place: {
                        x1: 340,
                        w: 207,
                        y1: 374,
                        h: 153,
                        dy : 10  + 5     //  поправка
                    },
                    innerPlace: {
                        x1: 358,
                        w: 171,
                        y1: 392,
                        h: 119
                    },
                    img: {
                        file: 'l2_1_o.png',
                        border:'l2_1_b.png',
                        text: 'l2_1_t.png'
                    },
                    typeSignal: 'moon_calendar'
                },
                'l2_2': {                      // карты таро
                    place: {
                        x1: 560,
                        w: 205,
                        y1: 374,
                        h: 317,
                        dy : 10      //  поправка
                    },
                    innerPlace: {
                        x1: 578,
                        w: 171,
                        y1: 392,
                        h: 284
                    },
                    img: {
                        file: 'l2_2_o.png',
                        border:'l2_2_b.png',
                        text: 'l2_2_t.png'
                    },
                    typeSignal: 'taro'
                },
                'l3_1': {                      // стихии
                    place: {
                        x1: 340,
                        w: 207,
                        y1: 539,
                        h: 153,
                        dy : 10      //  поправка
                    },
                    innerPlace: {
                        x1: 358,
                        w: 171,
                        y1: 556,
                        h: 119
                    },
                    img: {
                        file: 'l3_1_o.png',
                        border:'l2_1_b.png',
                        text: 'l3_1_t.png'
                    },
                    typeSignal: 'elements'
                },
                'r1_1': {                         // звери
                    place: {
                        x1: 1019,
                        w: 178,
                        y1: 211,
                        h: 151,
                        dy : 10      //  поправка
                    },
                    innerPlace: {
                        x1: 1037,
                        w: 142,
                        y1: 228,
                        h: 117
                    },
                    img: {
                        file: 'r1_1_o.png',
                        border:'l1_1_b.png',
                        text: 'r1_1_t.png'
                    },
                    typeSignal: 'animals'
                },
                'r1_2': {                         // деревья
                    place: {
                        x1: 1212,
                        w: 178,
                        y1: 211,
                        h: 151,
                        dy : 10 + 5      //  поправка
                    },
                    innerPlace: {
                        x1: 1230,
                        w: 142,
                        y1: 228,
                        h: 117
                    },
                    img: {
                        file: 'r1_2_o.png',
                        border:'l1_1_b.png',
                        text: 'r1_2_t.png'
                    },
                    typeSignal: 'trees'
                },
                'r1_3': {                        // валюта
                    place: {
                        x1: 1406,
                        w: 178,
                        y1: 211,
                        h: 151,
                        dy : 10      //  поправка
                    },
                    innerPlace: {
                        x1: 1424,
                        w: 142,
                        y1: 228,
                        h: 117
                    },
                    img: {
                        file: 'r1_3_o.png',
                        border:'l1_1_b.png',
                        text: 'r1_3_t.png'
                    },
                    typeSignal: 'money'
                },
                'r2_1': {                       // цифры
                    place: {
                        x1: 1160,
                        w: 205,
                        y1: 374,
                        h: 317,
                        dy : 10      //  поправка
                    },
                    innerPlace: {
                        x1: 1178,
                        w: 171,
                        y1: 391,
                        h: 284
                    },
                    img: {
                        file: 'r2_1_o.png',
                        border:'l2_2_b.png',
                        text: 'r2_1_t.png'
                    },
                    typeSignal: 'digits'
                },
                'r2_2': {                     // цвета
                    place: {
                        x1: 1377,
                        w: 207,
                        y1: 374,
                        h: 153,
                        dy : 10 + 5     //  поправка
                    },
                    innerPlace: {
                        x1: 1396,
                        w: 171,
                        y1: 392,
                        h: 119
                    },
                    img: {
                        file: 'r2_2_o.png',
                        border:'l2_1_b.png',
                        text: 'r2_2_t.png'
                    },
                    typeSignal: 'colors'
                },
                'r3_1': {                    // страны
                    place: {
                        x1: 1377,
                        w: 207,
                        y1: 539,
                        h: 153,
                        dy : 0      //  поправка
                    },
                    innerPlace: {
                        x1: 1396,
                        w: 171,
                        y1: 556,
                        h: 119
                    },
                    img: {
                        file: 'r3_1_o.png',
                        border:'l2_1_b.png',
                        text: 'r3_1_t.png'
                    },
                    typeSignal: 'countries'
                }
            }
        } ;

       _this.setCurrentSize() ;
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
     * было ли изменение размера экрана ?
     * @returns {boolean}
     */
    this.isResize = function() {
        var screenW = $(window).width() ;
        var screenH = $(window).height() ;

        return (screenW !== currentMainWidth || screenH !== currentMainHeight) ;
    } ;
    /**
     * фиксировать текущий размер эрана
     */
    this.setCurrentSize = function() {
        currentMainWidth = $(window).width() ;
        currentMainHeight = $(window).height() ;
    } ;
    /**
     * пересчёт в реальный размер экрана
     */
    this.getKResize = function() {
        var screenH = currentMainHeight  ;
        var screenW = currentMainWidth   ;
//     -------------------------------    //
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
        var innerPlace = item['innerPlace'] ;
        if (innerPlace !== undefined) {
            currentItem['innerPlace'] = placeResize(innerPlace) ;
        }
        currentItem['place'] = placeResize(place) ;
        currentItem['img'] = newItemImg(item['img']) ;
        if(item['typeSignal'] !== undefined) {
            currentItem['typeSignal'] = item['typeSignal'];
        }
        return currentItem ;
    } ;
    var newItemImg = function(itemImg) {
        var file = itemImg['file'] ;
        var borderFile = itemImg['border'] ;
        var textFile =  itemImg['text'] ;
        return {file: file, border:borderFile, text:textFile } ;
    } ;
    /**
     * пересчёт координат для объекта place
     * place может в качестве альтернативы содержать
     * крайние точки: x2,y2 или w - ширину и h - высоту области
     * но на выходе всё приводится к {x1: , y1: , x2: , y2: }
     * @param place
     * @returns {{}}
     */
    var placeResize = function(place) {
        var x1 = place['x1'] ;
        var y1 = place['y1'] ;
        var x2 = place['x2'] ;
        var y2 = place['y2'] ;
        var w =  place['w'] ;
        var h =  place['h'] ;
        var dy = (place['dy'] === undefined) ? 0 : place['dy'] ;

        var newPlace = {} ;
        var kResize = _this.getKResize()  ;
        var kx = kResize['kx']  ;
        var ky = kResize['ky']  ;
        newPlace['x1'] = Math.round(kx * x1) ;
        newPlace['y1'] = Math.round(ky * y1) ;
        if (x2 !== undefined) {
            newPlace['x2'] = Math.round(kx * x2) ;
        }
        if (y2 !== undefined) {
            newPlace['y2'] = Math.round(ky * y2) ;
        }
        if (w !== undefined) {
            newPlace['x2'] = newPlace['x1'] + Math.round(kx * w) ;
        }

        if (h !== undefined) {
            newPlace['y2'] = newPlace['y1'] + Math.round(ky * h) ;
        }
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
        var commentBlock = philosophyPictures['commentBlock'] ;
        var commentPlace = commentBlock['place'] ;
        currentPictures['commentBlock'] = {} ;
        currentPictures['commentBlock']['place'] =  placeResize(commentPlace) ;
        var textPlace = commentBlock['textPlace'] ;
        currentPictures['commentBlock']['textPlace'] = placeResize(textPlace) ;
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
    /**
     * размытый шар
     * @returns {{}}
     */
    this.getCentralCircleGlow = function() {
        var currentGlow = {} ;
        currentGlow['dir'] = centralCircleGlow['dir'] ;
        currentGlow['place'] =  placeResize(centralCircleGlow['place']) ;
        currentGlow['img'] =  centralCircleGlow['img'];
        return currentGlow ;
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
    /**
     * показать планку
     * @param type
     */
    this.stampShow = function(type) {
        var currentStamp = _this.getStamp() ;
        var place = currentStamp['place'] ;
        var dir = currentStamp['dir'] ;
        var imgFile = currentStamp[type]['img']['file'] ;
        $stampBlock.removeClass() ;
        $stampBlock.addClass(stamp.css) ;
        var stampPicture = dir +'/' + imgFile ;
        _this.defineAbsolutePosition($stampBlock,place,stampPicture) ;
    } ;
    /**
     * вывод размытого шара
     */
    _this.centralCircleGlowShow = function() {
        var currentGlow = _this.getCentralCircleGlow() ;
        var place = currentGlow['place'] ;
        var dir = currentGlow['dir'] ;
        var glowPicture = dir +'/' + currentGlow['img']['file'] ;
        _this.defineAbsolutePosition($centralCircleGlowBlock,place,glowPicture) ;

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
        if (showType == 'answer') {
            $centralCircleGlowBlock.attr('hidden','hidden') ;
        }
        if (showType == 'query') {
            $centralCircleGlowBlock.removeAttr('hidden') ;
            var $txt = defineTextArea($centralCircleTextBlock, textAreaPlace, textAreaBackGround,
                currentColor, 0, readonly, idText);
            placeholder.init($centralCircleTextBlock) ;      // имитатор placeholder
            placeholder.setTextArea($txt) ;
        }
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
        $img.css('height',y2 - y1) ;
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
        $block.empty() ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var $txt = $('<textarea/>') ;
        $txt.attr('tabindex',1) ;
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
        $txt.attr("spellcheck","false") ;
        $block.append($txt) ;

        $txt.addClass('queryText') ;
//        $txt.attr('placeholder','ВВЕДИТЕ ВОПРОС') ;
        $txt.css('width',0.95*txtWidth) ;
         $txt.attr('id',idText) ;
        $txt.css('height',0.97 * txtHeight) ;
        $txt.css('max-height',0.8 * txtHeight) ;
        $block.css('overflow','hidden') ;
        $txt.css('background','transparent') ;
        $txt.css('border','0px solid white') ;
        centralCircleText.init(txtWidth,txtHeight,$txt) ;
        return $txt ;
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
     * контроль окончания раздумья выполняется, когда шар возвращается в исходное состояние
     * @param callback   - выдаёт true при окончании раздумья
     */
    this.centralCircleRotate = function(callback) {
//        $centralCircleGlowBlock.attr('hidden','hidden') ;
        $centralCircleTextBlock.attr('hidden', 'hidden');  // убираем поле ввода
        placeholder.hideAll() ;      // убрать и не показывать
        var $block = $centralCircleBlock;
        var $img = $block.children('img');                      //  шар
        var $imgGl = $centralCircleGlowBlock.children('img') ;  // ореол
        var w0Gl  = $imgGl.width() ;
        var h0Gl  = $imgGl.height() ;
        var left0Gl = 0 ;
        var top0Gl =  0 ;



        var n = 0;          //  счётчик шагов  - элементарных поворотов на угол alphaStep
        var alphaStep = Math.PI/6 ;   // шаг поворота
        var maxTime = 3000 ;
        var time = 0 ;
        var i = 0 ;
        var iSign = 1 ;
        var timeDelay = 150 ;

       // -- начальное положение шара  -- //
        var w0 = $img.width() ;
        var h0 = $img.height() ;
        var left0 = pixelToNumber($img.css('margin-left')) ;
        var top0 = pixelToNumber($img.css('margin-top')) ; ;
     // -- крайняя верхняя точка при расширении шара  -- //
        var kResize = _this.getKResize() ;
        var dMax =  kResize['ky'] *
            (centralCircle.increase['y2'] - centralCircle.increase['y1'] );
        var deltaR = Math.round((dMax - h0)/20) ;    // шаг увеличения/уменьшение радиуса шара
//    -- начальное положение шара  -- //
        var imgTop = top0 ;
        var imgHeight = h0 ;
        var imgLeft = left0 ;
        var imgWidth = w0 ;

//    -- начальное положение ореола  -- //
        var imgTopGl = top0Gl ;
        var imgHeightGl = h0Gl ;
        var imgLeftGl = left0Gl ;
        var imgWidthGl = w0Gl ;
        var identityMatrix = 'matrix(1,0,0,1,0,0)' ;     // единичная матрица

        var tmpTimer = setInterval(function () {
            var identityFlag = false ;     // использовать единичную матрицу
            if (imgHeight +  deltaR * iSign >= dMax ) {
                iSign = -1 ;
            }
            if (imgHeight +  deltaR * iSign <= h0) {       // начальное положение
                n = 0 ;
                iSign = 1 ;
                imgTop = top0 ;
                imgHeight = h0 ;
                imgLeft = left0 ;
                imgWidth = w0 ;

                imgTopGl = top0Gl ;
                imgHeightGl = h0Gl ;
                imgLeftGl = left0Gl ;
                imgWidthGl = w0Gl ;
                identityFlag = true ;

                var stopFlag = true ;
                if (callback !== undefined) {
                    stopFlag = callback() ;
                }
                if (stopFlag) {
                    clearInterval(tmpTimer);
                    iSign = 0 ;
                }
            }
            imgTop = imgTop -    deltaR * iSign;
            imgHeight = imgHeight +  2 * deltaR * iSign;
            imgLeft = imgLeft - deltaR * iSign;
            imgWidth = imgWidth +  2 * deltaR * iSign;

            imgTopGl = imgTopGl -    deltaR * iSign;
            imgHeightGl = imgHeightGl +  2 * deltaR * iSign;
            imgLeftGl = imgLeftGl - deltaR * iSign;
            imgWidthGl = imgWidthGl +  2 * deltaR * iSign;

            //transform: matrix(a, c, b, d, tx, ty)
            if (identityFlag) {
                var matrix = identityMatrix ;
            } else {
                var ky = imgHeight/h0 ;
                var kx = imgWidth/w0 ;
//          -- убрать анимацию --   //
                ky = 1 ;
                kx = 1 ;
                var alpha = ++n * alphaStep ;
                var tx = 0 ;
                var ty =   imgTop - top0  ;
                ty = 0 ;
                var a = kx * Math.cos(alpha) ;
                var b = kx * Math.sin(alpha) ;
                var c = (-1) * b ;
                var d = ky *  Math.cos(alpha) ;
                matrix = 'matrix(' + a + ',' + c + ',' + b +',' + d +',' + tx + ',' + ty + ')' ;

            }
            $img.css('transform', matrix);
//    ---  аналогично для ореола   ---   ///
            if (identityFlag) {
                var matrix = identityMatrix ;
            } else {
                 ky = imgHeightGl/h0Gl ;
                 kx = imgWidthGl/w0Gl ;
//          -- убрать анимацию --   //
                ky = 1 ;
                kx = 1 ;

                 tx = 0 ;
                 ty =   imgTopGl - top0Gl  ;
                ty = 0 ;
                 a = kx ;
                 b = 0 ;
                 c = 0 ;
                 d = ky ;
                matrix = 'matrix(' + a + ',' + c + ',' + b +',' + d +',' + tx + ',' + ty + ')' ;

            }
            $imgGl.css('transform', matrix);
            time += timeDelay ;
            if (++i > 5) {

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
