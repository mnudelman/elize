/**
 * Описатель фонового изображения
 */
function BackgroundImg() {
    var mainImg = {} ;          // главная кртинка( body {background-image}
    var kHW = 0 ;               // отношение height/width для mainImg
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
    var _this = this ;
    //------------------------------------//
    this.init = function() {
        dirSmoke = dirImages + '/smoke' ;
        dirPictures =  dirImages + '/philosophy' ;
        dirMainImg =   dirImages + '/userInterface' ;

        mainImg = {
            file: "magic2.png",
            size : {w:1917, h:1074 ,u:'px'}
        } ;
        centralCircle = {
            dir: dirMainImg,
            place: {
                x1: 800, //808,
                y1: 380,
                x2: 1130,
                y2: 700
            },
            textArea: {
                x1: 827,
                y1: 460,
                x2: 1095,
                y2: 625 //630 // 632
            },

            query: {
                idText : 'queryText',
                ball: 'yellow_ball_clear.png',
                textArea: 'yellow_text_area.png',
                color: 'black', //'#47d4d9', // 'blue',    // '#11f371',
                readonly: false

            },
            answer: {
                idText : 'answerText',
                ball: 'blue_ball.png',
                textArea: 'blue_text_area.png',
                color: 'yellow' , ///   '#f3114c',
                readonly: true
            }

        } ;
        stamp = {
            place: {
                x1: 806,
                y1: 682,
                x2: 1104,
                y2: 746
            }

        } ;

       clouds = {
           dir: dirSmoke,
           items: {
               '141': {
                   place: {
                       x1: 548,
                       y1: 670,
                       x2: 1408,
                       y2: 860
                   },
                   img: {
                       file: '141.png'
                   }
               },
               '196l': {
                   place: {
                       x1: 159, //192,
                       y1: 705, //710,
                       x2: 684,   //632,
                       y2: 1023
                   },
                   img: {
                       file: '196l.png'
                   }
               },
               '196r': {
                   place: {
                       x1: 1154,
                       y1: 718,
                       x2: 1598,
                       y2: 996
                   },
                   img: {
                       file: '196r.png'
                   }
               },
               '197l': {
                   place: {
                       x1: 120,
                       y1: 672,
                       x2: 616,
                       y2: 922
                   },
                   img: {
                       file: '197l.png'
                   }
               },
               '197r': {
                   place: {
                       x1: 1270,
                       y1: 672,
                       x2: 1776,
                       y2: 930
                   },
                   img: {
                       file: '197r.png'
                   }
               },
               '146l': {
                   place: {
                       x1: 534,
                       y1: 680,
                       x2: 726,
                       y2: 796
                   },
                   img: {
                       file: '146l.png'
                   }
               },
               '146r': {
                   place: {
                       x1: 1093,
                       y1: 688,
                       x2: 1274,
                       y2: 788
                   },
                   img: {
                       file: '146r.png'
                   }
               },
               '147': {
                   place: {
                       x1: 645,
                       y1: 804,
                       x2: 1349,
                       y2: 956
                   },
                   img: {
                       file: '147.png'
                   }
               },
               '144': {
                   place: {
                       x1: 547,
                       y1: 713,
                       x2: 1330,
                       y2: 1019
                   },
                   img: {
                       file: '144.png'
                   }
               },
               '142r': {
                   place: {
                       x1: 1426,
                       y1: 680,
                       x2: 1790,
                       y2: 824
                   },
                   img: {
                       file: '142r.png'
                   }
               },
               '142l': {
                   place: {
                       x1: 110,
                       y1: 678,
                       x2: 476,
                       y2: 834
                   },
                   img: {
                       file: '142l.png'
                   }
               },
               '139r': {
                   place: {
                       x1: 740,
                       y1: 658,
                       x2: 1172,
                       y2: 834
                   },
                   img: {
                       file: '139r.png'
                   }
               },
               '139l': {
                   place: {
                       x1: 740,
                       y1: 658,
                       x2: 1172,
                       y2: 834
                   },
                   img: {
                       file: '139l.png'
                   }
               },
               '140l': {
                   place: {
                       x1: 384,
                       y1: 648,
                       x2: 826,
                       y2: 828
                   },
                   img: {
                       file: '140l.png'
                   }
               },
               '140r': {
                   place: {
                       x1: 1112,
                       y1: 634,
                       x2: 1572,
                       y2: 824
                   },
                   img: {
                       file: '140r.png'
                   }
               }
           }
       } ;

        philosophyPictures = {
            dir: dirPictures,
            items: {
                'l1_1': {
                    place: {
                        x1: 344,
                        y1: 215,
                        x2: 514,
                        y2: 358
                    },
                    img: {
                        file: 'l1_1.png'
                    }
                },
                'l1_2': {
                    place: {
                        x1: 536,
                        y1: 215,
                        x2: 706,
                        y2: 362
                    },
                    img: {
                        file: 'l1_2.png'
                    }
                },
                'l1_3': {
                    place: {
                        x1: 732,
                        y1: 215,
                        x2: 899,
                        y2: 361
                    },
                    img: {
                        file: 'l1_3.png'
                    }
                },
                'l2_1': {
                    place: {
                        x1: 344,
                        y1: 377,
                        x2: 540,
                        y2: 524
                    },
                    img: {
                        file: 'l2_1.png'
                    }
                },
                'l2_2': {
                    place: {
                        x1: 563,
                        y1: 377,
                        x2: 760,
                        y2: 690
                    },
                    img: {
                        file: 'l2_2.png'
                    }
                },
                'l3_1': {
                    place: {
                        x1: 344,
                        y1: 542,
                        x2: 540,
                        y2: 690
                    },
                    img: {
                        file: 'l3_1.png'
                    }
                },
                'r1_1': {
                    place: {
                        x1: 1023,
                        y1: 215,
                        x2: 1192,
                        y2: 356
                    },
                    img: {
                        file: 'r1_1.png'
                    }
                },
                'r1_2': {
                    place: {
                        x1: 1017,
                        y1: 215,
                        x2: 1385,
                        y2: 356
                    },
                    img: {
                        file: 'r1_2.png'
                    }
                },
                'r1_3': {
                    place: {
                        x1: 1409,
                        y1: 215,
                        x2: 1581,
                        y2: 358
                    },
                    img: {
                        file: 'r1_3.png'
                    }
                },
                'r2_1': {
                    place: {
                        x1: 1164,
                        y1: 377,
                        x2: 1363,
                        y2: 688
                    },
                    img: {
                        file: 'r2_1.png'
                    }
                },
                'r2_2': {
                    place: {
                        x1: 1381,
                        y1: 377,
                        x2: 1580,
                        y2: 524
                    },
                    img: {
                        file: 'r2_2.png'
                    }
                },
                'r3_1': {
                    place: {
                        x1: 1381,
                        y1: 542,
                        x2: 1580,
                        y2: 688
                    },
                    img: {
                        file: 'r3_1.png'
                    }
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
        return currentItem ;
    } ;
    var newItemImg = function(itemImg) {
        var file = itemImg['file'] ;
        return {file: file} ;
    } ;
    var placeResize = function(place) {
        var x1 = place['x1'] ;
        var y1 = place['y1'] ;
        var x2 = place['x2'] ;
        var y2 = place['y2'] ;
        var newPlace = {} ;
        var kResize = _this.getKResize()  ;
        var kx = kResize['kx']  ;
        var ky = kResize['ky']  ;
        newPlace['x1'] = Math.round(kx * x1) ;
        newPlace['y1'] = Math.round(ky * y1) ;
        newPlace['x2'] = Math.round(kx * x2) ;
        newPlace['y2'] = Math.round(ky * y2) ;
        return newPlace ;

    } ;
    this.getPhilosophyPictures = function() {
        var currentPictures = {} ;
        currentPictures['dir'] = philosophyPictures['dir'] ;
        currentPictures['items'] = {} ;
        var currentItems = currentPictures['items'] ;
        var items = philosophyPictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            currentItems[itemKey] = newImgItem(item) ;
        }
        return currentPictures ;
    };
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
    this.getStamp = function() {
        var currentStamp = {} ;
        currentStamp['place'] = placeResize(stamp['place']) ;
        return currentStamp ;
    } ;
    /**
     * выводит центральный круг по типу
     * @param showType = "query" | 'answer'
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
    var defineTextArea = function($block,place,imgFile,color,fontSize,readonly,idText) {
        $block.css('position','absolute') ;
        $block.empty() ;
        var x1 = place['x1'] ;
        var x2 = place['x2'] ;
        var y1 = place['y1'] ;
        var y2 = place['y2'] ;
        var $txt = $('<textArea/>') ;
        $block.css('top',y1) ;
        $block.css('left',x1) ;
        $block.css('color',color) ;
        if (readonly) {
            $txt.attr('readonly','readonly') ;
        }else {
            $txt.removeAttr('readonly') ;
        }

        $txt.css('width',x2 - x1) ;
        $txt.attr('id',idText) ;
        $txt.css('max-width',x2 - x1) ;
        $txt.css('height',y2 - y1) ;
        $txt.css('max-height',y2 - y1) ;
        $block.css('background-image','url("'+imgFile +'")') ;
        $block.css('background-repeat','no-repeat') ;
        $block.css('background-size','100% 100%') ;
        $block.css('overflow','hidden') ;
        $txt.css('background-color','rgba(0,0,0,0)') ;
        $txt.css('color',color) ;
        $txt.css('border','0') ;
        $block.append($txt) ;

    } ;
    /**
     * ид области ввода текста
     * @param showType - тип ('query' | 'answer')
     * @returns {*}
     */
    this.getIdText = function(showType) {
        return centralCircle[showType]['idText'] ;
    }
}
