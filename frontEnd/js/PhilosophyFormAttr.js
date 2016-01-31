/**
 * объект - атрибуты офорления формы PhilosophyForm
 * к атрибутам оформления относятся:
 * 1. наборы картинок (зодиак, таро, ...)
 * 2. способ расположения (круг, построчно, случайным образом)
 */
function PhilosophyFormAttr() {
    var currentSetName;      // текущий набор картинок
    var picturesSets = {};           // наборы картинок
    var topologySet = {} ;
    var thoughts = [];
    var dirImages = paramSet.windowLocationHost + '/images';
    var PICTURES_NUMBER = 12 ;    // количество картинок
    var _this = this;
    //----------------------------//
    this.init = function () {
        topologySet = {
            'watch': {
                matrix: {cols: 7, rows: 7},
                cells: {
                    1: [4],
                    2: [3, 5],
                    3: [2, 6],
                    4: [1, 7],
                    5: [2, 6],
                    6: [3, 5],
                    7: [4]
                },
                text: {row:4, col:2, rowspan:0,colspan:5}
            },
            '4-2-4': {
                matrix: {cols: 4, rows: 3},
                cells: {
                    1: [1, 2, 3, 4],
                    2: [1, 4],
                    3: [1, 2, 3, 4]
                },
                text: {row:2, col:2, rowspan:0,colspan:2}

            }

        } ;

        picturesSets = {
            'zodiac': {
                size:  {'w' : 120, 'h': 100} ,
                topology: [] ,
                pictures :
                    [
                        'kartinki24_ru_signs_of_the_zodiac_37.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_38.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_39.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_40.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_41.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_42.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_43.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_44.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_45.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_46.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_47.jpg',
                        'kartinki24_ru_signs_of_the_zodiac_48.jpg'
                    ]

            },
            'tarot': {
                size:  {'w' : 120, 'h': 150} , //{'w' : 140, 'h': 280} ,
                topology: ['4-2-4','watch'] ,
                pictures :
                    [
                        '38075740.jpg',
                        '112885603.jpg',
                        '142035602.jpg',
                        '153425673.jpg',
                        '211445842.jpg',
                        '239571852.jpg',
                        '242996532.jpg',
                        '271481376.jpg',
                        '356303728.jpg',
                        '498007563.jpg',
                        '510014273.jpg',
                        '550152435.jpg',
                        '703747749.jpg',
                        '777222789.jpg',
                        '778738349.jpg',
                        '798183803.jpg',
                        '864365995.jpg'
                    ]
            }
        };
        thoughts = [
            'ДА',
            'НЕТ',
            'Может быть',
            'Возможно',
            'Не сейчас',
            'Может, стоит подумать?',
            'Вернее всего «Да»',
            'Вернее всего «Нет»',
            'Если вы так решили, то «Да»',
            'Если вы сомневаетесь, то «Нет»',
            'Сегодня на этот вопрос нет ответа',
            'Попробуйте обратиться за советом к другу',
            'Не всё получается, так как мы хотим',
            'Вы думаете в правильном направлении',
            'Как вы захотите, так и будет',
            'Надо приложить максимум усилий',
            'Звезды сегодня на вашей стороне',
            'Скорее «Да», чем «Нет»',
            'Скорее «Нет», чем «Да»',
            'Перенесите решение этого вопроса на некоторое время',
            'Сегодня это не основной ваш вопрос',
            'Может, стоит сегодня подумать о более важном?',
            'Вы сами найдете ответ на этот вопрос через некоторое время',
            'Не делайте то, о чем думаете',
            'Это только ваши фантазии',
            'Иногда мечты воплощаются в жизнь',
            'Вы на правильном пути',
            'Если вы себе в чем то откажите, то «Да»',
            'Возможно, но для этого надо многое сделать',
            'Вам придется самому принимать решение',
            'Спросите у близкого человека «Да или Нет», то что он ответит и будет ответом на ваш вопрос',
            'Еще раз все обдумайте',
            'Подумайте о последствиях вашего решения',
            'Вам придется потрудиться',
            'Ни что не дается просто так',
            'Откройте вашу любимую книгу на 37 странице, третий абзац сверху – прочитайте и все станет понятно. (страницы должны меняться от 17 до 77, все с цифрой 7 на конце) (абзацы тоже, с первого по пятый)',
            'Сложно дать однозначный ответ – обратитесь к Оракулу.',
            'Для этого придется чем-то пожертвовать',
            'Есть шанс',
            'Скоро',
            'Не сейчас',
            'Почему бы и нет.',
            'Если бы вас об этом спросили, что вы бы ответили?',
            'Сегодня все в ваших руках',
            'Подкиньте монетку на «Орел» или «Решку»',
            'Если сейчас чистое небо, то «Да», если в тучах то «Нет»',
            'Спросите «Да или Нет» у первого человека которого увидите',
            'Сейчас «Да», но все может измениться',
            'Сейчас «Нет», но все может поменяться',
            'Вам это не поможет'
        ];


    };
    /**
     * случайный выбор фразы
     * @returns {*}
     */
    this.getPhrase = function() {
 //       return 'Спросите у близкого человека «Да или Нет», то что он ответит и будет ответом на ваш вопрос' ;
        return thoughts[randomSelect(thoughts.length)] ;
    } ;
    /**
     * получить текущий набор картинок
     */
    this.getPictureSet = function() {
        picturesSetDefine() ;      // разыгрывается тек набор

        var topology =  defineCurrentTopology() ;   // топология должна быть 1-ой (!)
        var pictureSet  = defineCurrentSet() ;
        var size = picturesSets[currentSetName]['size'] ;
        return {
            'pictures': pictureSet,
            'size': picturesSets[currentSetName]['size'],
            'topology' : topology
        };
    } ;
    /**
     * определить топологию для набора картинок
     * @returns {*}
     */
    var defineCurrentTopology = function() {
        var topologies = picturesSets[currentSetName]['topology'] ; // возможные топологии
        if (topologies === undefined || topologies.length === 0 ) {
            var i = 0;
            topologies = [] ;
            for (var key in topologySet) {
                topologies[i++] = key;
            }
        }
        // разыгрываем
        var n = 0 ;
        for (var key in topologies) {
            n++ ;
        }
        var find_i = randomSelect(n - 1);

        var name = topologies[find_i] ;
        var cells = topologySet[name]['cells'] ;
        var n = 0 ;
        for (var key in cells) {
            n += (cells[key]).length ; ;
        }
        PICTURES_NUMBER = n ; // число картинок для топологии
        return topologySet[name] ;
    } ;
    /**
     * определить текущий набор картинок
     * набор должен содержать ровно PICTURES_NUMBER элементов
     * если число элементов в наборе !== PICTURES_NUMBER, то
     * набор формируется случайным образом
     */
    var defineCurrentSet = function() {
        var dir = dirImages + '/' + currentSetName + '/' ;
        var set = [] ;
        var n = (picturesSets[currentSetName]['pictures']).length ;
        if (n <= PICTURES_NUMBER ) {
            for (var i = 0; i < n; i++) {
                set[i] = dir + picturesSets[currentSetName]['pictures'][i] ;
            }
        }else {
            var setIndex = [] ;
            for (var i = 0; i < PICTURES_NUMBER; i++) {
                while (true) {                  // обеспечить уникальность картинок
                    var j = randomSelect(n-1) ;
                    if (setIndex.length === 0 || setIndex.indexOf(j) < 0 ) {
                        setIndex[i] = j ;
                        break ;
                    }else {
                        continue ;
                    }
                }
                var pict = picturesSets[currentSetName]['pictures'][j] ;
                set[i] = dir + pict ;
            }
        }
        return set ;
    } ;
    /**
     * определяет первоначальный выбор набора картинок
     */
    var picturesSetDefine = function () {
        var sets = [];
        var i = 0;
        for (var setName in picturesSets) {
            if (currentSetName === undefined || setName !== currentSetName) {
                sets[i++] = setName;
            }
        }
        var n = sets.length;
        var find_i = randomSelect(n-1);
        currentSetName = (find_i === undefined) ? sets[0] : sets[find_i];

    };
    var randomSelect = function (n) {
        if (n == 0) {
            var select_i = 0 ;
        } else if (n >= 1) {
            var alpha = Math.random() * n ;
            select_i = Math.round(alpha) ;
        }
        return select_i;
    };

}