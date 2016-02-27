/**
 * объект - атрибуты офорления формы PhilosophyForm
 */
function PhilosophyFormAttr() {
   var thoughts = [];
    //--- наборы картинок --//
    var animals = {} ;
    var astrology = {} ;
    var cards = {} ;
    var colors = {} ;
    var countries = {} ;
    var digits = {} ;
    var domino = {} ;
    var elements = {} ;
    var money = {} ;
    var moon_calendar = {} ;
    var taro = {} ;
    var trees = {} ;
    var dirImages = paramSet.dirImages ;
    var backgroundImg = paramSet.backgroundImage ;
    var _this = this;
    //----------------------------//
    this.init = function () {
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

        astrology = {
            dir : dirImages + '/astrology',
            pictures : [
                '2_blizhetsi.jpg',
                '2_deva.jpg',
                '2_koz.jpg',
                '2_lev.jpg',
                '2_oven.jpg',
                '2_rak.jpg',
                '2_rib.jpg',
                '2_skorpion.jpg',
                '2_strelets.jpg',
                '2_telets.jpg',
                '2_vesi.jpg',
                '2_vod.jpg'
            ]
        } ;
        cards = {
            dir : dirImages + '/cards',
            pictures : [
               '1_qw.jpg',
               '2_qw.jpg',
                '3_qw.jpg',
                '4_qw.jpg',
                '5_qw.jpg',
                '6_qw.jpg',
                '7_qw.jpg',
                '8_qw.jpg',
                '9_qw.jpg',
                '10_qw.jpg',
                '11_qw.jpg',
                '12_qw.jpg',
                '13_qw.jpg',
                '14_qw.jpg',
                '15_qw.jpg',
                '16_qw.jpg',
                '17_qw.jpg'
            ]
        } ;
        colors = {
            dir : dirImages + '/colors',
            pictures : [
                '1_krasnii.jpg',
                '2_orangevii.jpg',
                '3_goltii.jpg',
                '4_zelenii.jpg',
                '5_oluboi.jpg',
                '6_sinii.jpg',
                '7_fioletovii.jpg'
            ]
        } ;
        countries = {
            dir : dirImages + '/countries',
            pictures : [
                '1_str.jpg',
                '2_str.jpg',
                '3_str.jpg',
                '4_str.jpg',
                '5_str.jpg',
                '6_str.jpg',
                '7_str.jpg',
                '8_str.jpg',
                '9_str.jpg',
                '10_str.jpg',
                '11_str.jpg',
                '26_str.jpg',
                '30_str.jpg',
                '38_str.jpg',
                '40_str.jpg',
                '57_str.jpg',
                '64_str.jpg'
            ]
        } ;
        digits = {
            dir : dirImages + '/digits',
            pictures : [
                '0_0_0.jpg',
                '1_1_1.jpg',
                '2_2_2.jpg',
                '3_3_3.jpg',
                '4_4_4.jpg',
                '5_5_5.jpg',
                '6_6_6.jpg',
                '7_7_7.jpg',
                '8_8_8.jpg',
                '9_9_9.jpg'
            ]
        } ;
        domino = {
            dir : dirImages + '/domino',
            pictures : [
                'stock-vector-vector-domino-seven-dots-18251245.jpg'
            ]
        } ;
        elements = {
            dir : dirImages + '/elements',
            pictures : [
              '1_voda.jpg',
              '2_ogon.jpg',
              '3_zemlya.jpg',
              '4_vozduh.jpg'
            ]
        } ;
        animals = {
            dir : dirImages + '/animals',
            pictures : [
                '1_as.jpg',
                '2_as.jpeg',
                '3_as.jpg',
                '4_as.jpg',
                '5_as.jpg',
                '6_as.jpg',
                '7_as.jpg',
                '8_as.jpg',
                '9_as.jpg',
                '10_as.jpg',
                '11_as.jpg',
                '12_as.jpg',
                '13_as.jpg',
                '14_as.jpg',
                '15_as.jpg'
            ]

        } ;
        money = {
            dir : dirImages + '/money',
            pictures : [
                '1_hsvets frank.jpg',
                '2_evro.jpg'
            ]
        } ;
        moon_calendar = {
            dir : dirImages + '/moon_calendar',
            pictures : [
                '0_.jpg',
                '1.jpg',
                '2.jpg',
                '3.jpg',
                '4.jpg',
                '5.jpg',
                '6.jpg',
                '7.jpg',
                'voshod_6.jpg',
                'zakat_2.jpg'
            ]
        } ;
        taro = {
            dir : dirImages + '/taro',
            pictures : [
                '1_the fool.jpg',
                '2_the magician.jpg',
                '3_vg.jpg',
                '4_im.jpg',
                '5_imp.jpg',
                '6_vgrets.jpg',
                '7_vlub.jpg',
                '8_kol.jpg',
                '9_sila.jpg',
                '10_otshel.jpg',
                '11_koleso.jpg',
                '12_prav.jpg'
            ]
        } ;
        trees = {
            dir : dirImages + '/trees',
            pictures : [
                '1_d.jpg',
                '2_bereza_2.JPG',
                '3_yablonya_2.jpg',
                '4_pihta.jpg',
                '5_yaz.jpg',
                '6_kiparis.jpg',
                '7_topol.jpg',
                '8_kedr.jpg',
                '8_sosna.jpg',
                '10_iva.jpg',
                '11_lipa.jpg',
                '12_oreshnik.jpg'
            ]
        } ;
    };

    /**
     * случайный выбор фразы
     * @returns {*}
     */
    this.getPhrase = function() {
        return thoughts[randomSelect(thoughts.length)] ;
    } ;
    /**
     * получить текущий набор картинок
     */
    this.getPictureSet = function() {
        return backgroundImg.getPhilosophyPictures() ;
    } ;
     var randomSelect = function (n) {
        if (n == 0) {
            var select_i = 0 ;
        } else if (n >= 1) {
            var alpha = Math.random() * n ;
            select_i = Math.round(alpha) ;
        }
        return select_i;
    };
    this.getPictSubst = function(substName) {


        var substSet = {} ;
        switch (substName) {
            case 'animals' :
                substSet = animals ;
                break ;
            case 'astrology' :
                substSet = astrology ;
                break ;
            case 'cards' :
                substSet = cards ;
                break ;
            case 'colors' :
                substSet = colors ;
                break ;
            case 'countries' :
                substSet = countries ;
                break ;
            case 'digits' :
                substSet = digits ;
                break ;
            case 'domino':
                substSet = domino ;
                break ;
            case  'elements' :
                substSet = elements ;
                break ;
            case 'money' :
                substSet = money ;
                break ;
            case  'moon_calendar' :
                substSet = moon_calendar ;
                break ;
            case 'taro' :
                substSet = taro ;
                break ;
            case 'trees' :
                substSet = trees ;
                break ;

        }
        var pictures = substSet.pictures ;
        var n = pictures.length ;
        var i = randomSelect(n - 1) ;
        var pictFile = substSet.dir + '/' + pictures[i] ;
        return pictFile ;
    } ;

}