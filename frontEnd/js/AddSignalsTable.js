/**
 * Таблица  - дополнительные сигналы
 * Дополнительный сигнал - это структура вида:
 * addSignals = {signalType : addSignal,.....}
 addSignal = {file : <файл-изображение> ,
              name : <имя сигнала>,
              rang : <ранг>,
              text  : <текст-описатель>,
              typeComment: <имя типа>
             }
  каждый  addSignal выводится как строка таблицы
 колонки : -изображение с подписью,
           -текстовое опимание,
           -весы с диаграммой, иллюстрирующие ранг
 в конце таблицы выводится условная средняя оценка по всем сигналам
 таблица для вывода передаётся в объект
 scrollBackground - фоновое изображение вывода результата
 При ширине графы меньше некоторой величины, уменьшаются размеры шрифтов
 */
function AddSignalsTable() {
    var addSignals = {} ;
    var signalTypes = [] ;     //  список типов в порядке их вывода
    var backgroundImg ;
    var dirImages;             // папка изображений
    var scrollBackground ;     // объект - фоновое изображение для вывода
    var imgBalance = {} ;      // элементы изображения весов в таблице сигналов
    var kResize ;              // пересчёт на размер окна
    var tabColumnWidth ;          // ширина колонки таблицы сигналов
    var PICT_MAX_WIDTH = 230 ;   // max ширина картинки 09.03.2016
    var CSS_TEXT_SIGNAL = 'textSignal' ; // класс - текстовое оформление сигнала
    var CSS_TEXT_SIGNAL1 = 'textSignal1' ; // класс - подпись под картинкой
    var CSS_PRO_CONTRA_TEXT = 'proContraText' ;    // подпись на диаграмме ЗА    - ПРОТИВ
    var CSS_BIG_PRO_CONTRA_TEXT = 'proContraBigText' ; // подпись на итоговой диаграмме
    var smallScreenFlag = false ;                // переключение на узкий экран
    //----- классы для малой ширины колонки таблицы ---//
    var CSS_TEXT_SIGNAL_SMALL = 'textSignalSmall' ; // класс - текстовое оформление сигнала
    var CSS_TEXT_SIGNAL1_SMALL = 'textSignal1Small' ; // класс - подпись под картинкой
    var CSS_PRO_CONTRA_TEXT_SMALL = 'proContraTextSmall' ;    // подпись на диаграмме ЗА    - ПРОТИВ
    var CSS_BIG_PRO_CONTRA_TEXT_SMALL = 'proContraBigTextSmall' ; // подпись на итоговой диаграмме
    var COLUMN_WIDTH_MIN = 142 ;    // ширина весов, при которой переключать на малый экран

    var _this = this ;
    //---------------------------------------------------//
    /**
     *  список сигналов поступает извне
     * @param signals   -  сигналы
     * @param signalTps - список типов в порядке их вывода
     */
    this.init = function(signals,signalTps) {
        addSignals = signals ;
        signalTypes  = signalTps ;
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
        dirImages = paramSet.dirImages ;
        scrollBackground = paramSet.scrollBackground ; // объект для вывода
                                                       // результата

        imgBalance = {
            dir : dirImages + '/balance',
            normal : {
                pictContra:'balance_contra_3.png',
                pictEqual: 'balance_equal.png',
                w: 142 ,
                h: 117,
                css: CSS_PRO_CONTRA_TEXT,
                cssSmall : CSS_PRO_CONTRA_TEXT_SMALL
            },
            big: {
                pictContra:'balance_big_contra.png',
                pictEqual: 'balance_big_equal.png',
                w: 223 ,
                h: 176 ,
                css: CSS_BIG_PRO_CONTRA_TEXT,
                cssSmall: CSS_BIG_PRO_CONTRA_TEXT_SMALL,
                kIncr: 1.62
            },
            diagram: {
                linePro: 'green_line.png',
                lineContra: 'red_line.png'
            },
            text: {
                pro: 'За',
                contra: 'Против'
            }
        } ;
    } ;
    /**
     * вывод таблицы
     * signalTypes - список типов сигналов в порядке их вывода
     * как таковая таблица не формируется. Строки передаются на вывод
     */
    this.tableShow = function() {
        scrollBackground.answerInit('oracle') ;        // вывод пустой формы
        scrollBackground.answerBegin() ;        // начало вывода
        var n = 0 ;
        var totalRang = 0 ;                    // суммарная оценка
        for (var i = 0 ; i < signalTypes.length ; i++) {
            var itemKey = signalTypes[i] ;
            var signal = addSignals[itemKey] ;
            totalRang += signal['rang'] - 0 ;
            n++ ;
            var $row = signalRowBuild(signal,itemKey) ;  // строка таблицы
            scrollBackground.putAnswerItem($row) ;
        }
        totalRang = totalRang/n ;
        var $totalRow = signalTotalRowBuild(totalRang) ;
        scrollBackground.putAnswerItem($totalRow,false) ;


    } ;
    var getColumnWidth = function() {
        tabColumnWidth = scrollBackground.getDataAreaWidth()/4 - 13 +13 ; //20 ;  // колонка  таблицы
        smallScreenFlag = (tabColumnWidth <= COLUMN_WIDTH_MIN) ;   // переключить на малый экран
        if (smallScreenFlag) {
            tabColumnWidth = scrollBackground.getDataAreaWidth()/4 - 5 + 5
        }
    } ;
    /**
     * построитель строки таблицы
     * графа1 - картинка, графа2,3 - текст-описатель, графа4 - весы
     * signal['file'] - имя файла вместе с папкой - именем типа сигнала
     * signal['file'] = <typeName>/<fileName>
     * @param signal
     * @param typeName
     * @returns {*|jQuery|HTMLElement}
     */
    var signalRowBuild = function(signal,typeName) {
         kResize = backgroundImg.getKResize()  ; // коэффициенты для пересчёта
                                                    // на размер окна браузера
        // ширина столбцов из общей ширины области
 //       if (tabColumnWidth === undefined) {
            getColumnWidth() ;
 //       }
        var width = tabColumnWidth ;

        var $tr = $('<tr/>') ;
        // графа1 - картинка
         var $tdPict = pictColumnBuild(signal,typeName,width) ;

        //-- графа 2,3 - текст-описатель
        var $tdText1 = $('<td/>') ;
        $tdText1.css('width',2 * width) ;
        $tdText1.css('vertical-align','top') ;
        var text = signal['text'] ;
        var $txt1 = textColumnBuild(text,width) ;
        $tdText1.append($txt1) ;

        //--- графа 4 - весы  -ранг сигнала
        var rang = signal['rang'] ;
        var $tdBalance = $('<td/>') ;
        tdBalanceBuild($tdBalance,width,rang) ;
        //-- всё в строку таблицы --//
        $tr.append($tdPict) ;
        $tr.append($tdText1) ;
        $tr.append($tdBalance) ;

        return $tr ;
    } ;
    /**
     * графа1 - картинка с подписью
     */
    var pictColumnBuild = function(signal,typeName,width) {
        var $tdPict = $('<td/>') ;
        var pictFile = signal['file'] ;            // содержит полный адрес
        var typeComment = signal['typeComment'] ;  // коментарий к типу
        var signalName =  signal['name'] ;         // имя сигнала

        var $img = $('<img/>') ;
        $img.attr('src',pictFile) ;
        var imgId =  typeName + '_img' ;
        $img.attr('id',imgId) ;
        var imgWidth = Math.min(width,PICT_MAX_WIDTH) ;
        if (smallScreenFlag) {
            $tdPict.addClass(CSS_TEXT_SIGNAL1_SMALL) ;
        }else {
            $tdPict.addClass(CSS_TEXT_SIGNAL1) ;
        }





        $tdPict.css('width',imgWidth) ;
        $tdPict.append($img) ;
        //-- подпись под картинкой --//
        $img.css('width',imgWidth) ;
        var txt = typeComment + '. ' + signalName ;
        var $p = $('<div/>') ;
        $p.css('width',imgWidth) ;
        $p.css('overflow','hidden') ;
        $p.append(txt) ;
        $tdPict.append($p) ;
 //       $tdPict.append( txt ) ;
        return $tdPict ;
    } ;
    /**
     *  клетка с весами
     * @param $tdBalance   - обрамляющий блок
     * @param width        - ширина блока
     * @param rang         -
     * @param bigFlag      - true -> использовать imgBalance.big
     * @returns {*}
     */
    var tdBalanceBuild = function($tdBalance,tdWidth,rang,bigFlag) {
        bigFlag = (bigFlag === undefined) ? false : bigFlag ;
        var currentImg = (bigFlag) ? imgBalance.big : imgBalance.normal ;
        $tdBalance.css('width',tdWidth) ;
        if (!bigFlag) {

        }
        var dirBalance = imgBalance['dir'] ;

        var balancePict =  currentImg['pictContra'];
        balancePict =  (rang === 0) ? currentImg['pictEqual'] : balancePict ;
        var $imgB = $('<img/>') ;
        $imgB.attr('src',dirBalance + '/' +balancePict) ;
        $tdBalance.append($imgB) ;
        if (rang > 0) {
            $imgB.css('transform','scaleX(-1)') ;
        }
        $tdBalance.css('vertical-align','top') ;





        $tdBalance.css('padding-right',kResize['kx'] * 25) ;

        var imgW = currentImg['w'] ;
        var imgH = currentImg['h'] ;
        if (tdWidth > imgW ) {
            $imgB.css('width',imgW) ;
            $imgB.css('height',imgH) ;
        }else {
            $imgB.css('width',tdWidth) ;
            imgW = tdWidth ;
        }

        var left = ($tdBalance.width() - imgW)/2 ;
        $imgB.css('margin-left',left) ;
        //-- подпись над диаграммой -- //
        var textLeft = imgBalance.text['pro'] ;
        var textRight = imgBalance.text['contra'] ;

        var $proContra = textBalanceBuild(currentImg,tdWidth,textLeft,textRight) ;

  //      $proContra.css('margin-right',5) ;

        $tdBalance.append($proContra) ;
        var $rangDiagram  = rangDiagramBuild(rang) ;  // линейная диаграмма


        $tdBalance.append($rangDiagram) ;
        $rangDiagram.css('width',tdWidth) ;
 //       $rangDiagram.css('margin-right',5) ;
        return $tdBalance ;
    } ;
    /**
     * подпись под весами (ЗА        ПОТИВ)
     * @returns {*|jQuery|HTMLElement}
     */
    var textBalanceBuild = function(currentImg,tdWidth,textLeft,textRight) {

        var $textBlock = $('<div/>') ;
        var textCss = currentImg['css'] ;
        var textCssSmall = (currentImg['cssSmall'] !== undefined) ? currentImg['cssSmall'] : textCss ;
        $textBlock.css('width',tdWidth) ;
//        $textBlock.css('width','100%') ;
        textCss = (smallScreenFlag) ? textCssSmall : textCss ;
        $textBlock.addClass(textCss) ;
        //-- левый край  - текст
        var $textLeft =  $('<div/>') ;
        $textLeft.css('float','left') ;
        $textLeft.append(textLeft) ;
        $textLeft.css('width','20%') ;
        $textLeft.css('text-align','left') ;
        $textBlock.append($textLeft) ;
        //-- правый край - текст
        var $textRight =  $('<div/>') ;
        $textRight.css('float','right') ;
        $textRight.css('width','80%') ;
        $textRight.css('text-align','right') ;

        $textRight.append(textRight) ;
        $textBlock.append($textRight) ;
        return $textBlock ;
    } ;
    /**
     * линейная диаграмма под весами
     * зелёная часть - %за, красная - %против
     * оценка считается от 50%
     * @param rang
     * @returns {*|jQuery|HTMLElement}
     */
    var rangDiagramBuild = function(rang) {
        var $rangBlock = $('<div/>') ;
        $rangBlock.css('clear','both') ;
        var rangPro = Math.round(50 + rang/2) ;
        var rangContra = 100 - rangPro ;
        var dirBalance = imgBalance.dir ;
        var diagram = imgBalance.diagram ;
        var proPict = dirBalance +'/' + diagram['linePro'] ;
        var contraPict = dirBalance +'/' + diagram['lineContra'] ;
        var $imgPro  = $('<img/>') ;
        $imgPro.attr('src',proPict) ;
        var $imgContra  = $('<img/>') ;
        $imgContra.attr('src',contraPict) ;
        $rangBlock.append($imgPro) ;
        $rangBlock.append($imgContra) ;

        $imgPro.css('width',rangPro  + '%') ;
        $imgPro.css('height',3) ;
        $imgContra.css('width',rangContra + '%') ;
        $imgContra.css('height',3) ;
        return $rangBlock ;

    };
    /**
     * графы 2,3 - текстовое описание сигнала
     * @param text
     * @param width
     * @returns {*|jQuery|HTMLElement}
     */
    var textColumnBuild = function(text,width)  {
        var $txtBlock = $('<div/>') ;
        if (smallScreenFlag) {
            $txtBlock.addClass(CSS_TEXT_SIGNAL_SMALL) ;
        }else {
            $txtBlock.addClass(CSS_TEXT_SIGNAL) ;
        }
        var leftPadding = kResize['kx'] * 10 ;
        var rightPadding = kResize['kx'] * 30 ;
        rightPadding = Math.min(rightPadding,10) ;
        rightPadding = Math.max(rightPadding,5) ;
        leftPadding = 10 ;
//        $txtBlock.css('padding','0 15px 0 10px') ;
        $txtBlock.css('padding-left',leftPadding) ;
        $txtBlock.css('padding-right',rightPadding) ;
        $txtBlock.css('margin-right','5px') ;
        $txtBlock.css('column-count',2) ;
//        $txtBlock.css('column-count',1) ;
        $txtBlock.css('column-gap','2em') ;
        $txtBlock.css('column-width',width/2) ;
        $txtBlock.append(text) ;
        $txtBlock.css('overflow','hidden') ;

        return $txtBlock ;

    } ;
    /**
     * подвал - итоговая оценка - среднее по всем
     * размер весов увеличен в 1.5 раза
     * @param totalRang
     * @returns {*|jQuery|HTMLElement}
     */
    var signalTotalRowBuild = function(totalRang) {
        var kIncr = imgBalance.big['kIncr'] ;      // увеличение ширины по отношению к обычной
        var rangPro = 50 + Math.round(totalRang/2) ;
        var rangContra = 100 - rangPro ;
        // -- корректировать при 50% --//
        totalRang = (rangPro === rangContra) ? 0 : totalRang ;

        var dirBalance = imgBalance['dir'] ;
        var $tr = $('<tr/>') ;
        var width = tabColumnWidth * kIncr ;

        var $totalBlock = $('<div/>') ;
        var $totalTextBlock = $('<div/>') ;
        var $imgText = $('<img/>') ;
        $imgText.attr('src',dirBalance + '/text_kosekven.png') ;
        $imgText.css('width',width) ;
        $totalTextBlock.append($imgText) ;
        $totalBlock.append($totalTextBlock) ;


        var $balanceBlock = $('<div/>') ;

        var marginLeft = (4 * tabColumnWidth - width)/2 ;


        var bigFlag = true ;

        tdBalanceBuild($balanceBlock,width,totalRang,bigFlag) ;
        $totalBlock.append($balanceBlock) ;
        //--- значение ранга //
        var currentImg = imgBalance.big ;
        var textLeft = rangPro + '%';
        var textRight = rangContra + '%';
        var $percBlock = textBalanceBuild(currentImg,width,textLeft,textRight) ;
        $totalBlock.append($percBlock) ;
        $totalBlock.css('margin-left',marginLeft) ;
        return $totalBlock ;
    } ;

}
