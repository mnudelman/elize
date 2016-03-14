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
 в конце таблицы выводится условная средняя оценка по всем сигналам
 таблица для вывода передаётся в объект
 scrollBackground - фоновое изображение вывода результата
 */
function AddSignalsTable() {
    var addSignals = {} ;
    var signalTypes = [] ;     //  список типов в порядке их вывода
    var backgroundImg ;
    var dirImages;             // папка изображений
    var scrollBackground ;     // объект - фоновое изображение для вывода
   var PICT_MAX_WIDTH = 230 ;   // max ширина картинки 09.03.2016
    var CSS_TEXT_SIGNAL = 'textSignal' ; // класс - текстовое оформление сигнала
    var CSS_TOTAL_SIGNAL = 'totalSignal' ; // класс для итоговой подписи
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
    } ;
    /**
     * вывод таблицы
     * signalTypes - список типов сигналов в порядке их вывода
     * как таковая таблица не формируется. Строки передаются на вывод
     */
    this.tableShow = function() {
        scrollBackground.answerInit() ;        // вывод пустой формы
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
        var kResize = backgroundImg.getKResize()  ; // коэффициенты для пересчёта
                                                    // на размер окна браузера
        // ширина столбцов из общей ширины области
        var widthTot = scrollBackground.getDataAreaWidth() ;
        var width = widthTot/4 - 20 ;

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
        $tdPict.addClass(CSS_TEXT_SIGNAL) ;
        $tdPict.css('width',imgWidth) ;
        $tdPict.append($img) ;
        //-- подпись под картинкой --//
        $img.css('width','95%') ;
        var txt = typeComment + '. ' + signalName ;
        $tdPict.append('<p>' +txt + '</p>') ;
        return $tdPict ;
    } ;
    /**
     * графа 4 - весы - ранг сигнала
     * три вида весов в зависимости от ранга
     * > 50% - весы ЗА(pro), <50% - ПРОТИВ(contra), =50% -(equal)
     * @param $tdBalance
     * @param width
     * @param rang
     * @returns {*}
     */
    var tdBalanceBuild = function($tdBalance,width,rang) {
        $tdBalance.css('width',width) ;
        var dirBalance = dirImages + '/balance' ;
        var balancePict =  (rang > 0) ? 'balance_pro.png' : 'balance_contra.png' ;
        balancePict =  (rang === 0) ? 'balance_equal.png' : balancePict ;
        var $imgB = $('<img/>') ;
        $imgB.attr('src',dirBalance + '/' +balancePict) ;
        $tdBalance.append($imgB) ;

        $tdBalance.css('vertical-align','top') ;
        $imgB.css('width','100%') ;

        var $proContra = textProContraBuild() ;    // подпись "за"       "против"

        $tdBalance.append($proContra) ;
        var $rangDiagram  = rangDiagramBuild(rang) ;  // линейная диаграмма
        $tdBalance.append($rangDiagram) ;
        return $tdBalance ;
    } ;
    /**
     * подпись под весами (ЗА        ПОТИВ)
     * @returns {*|jQuery|HTMLElement}
     */
    var textProContraBuild = function() {
        var dirBalance = dirImages + '/balance' ;
        var $textProContra = $('<div/>') ;
        var $imgProContra  = $('<img/>') ;
        var proContraPict  = dirBalance + '/text_pro_contra.png' ;
        $imgProContra.attr('src',proContraPict) ;
        $textProContra.append($imgProContra) ;
        $imgProContra.css('width','100%') ;
        return $textProContra ;
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
        var rangPro = Math.round(50 + rang/2) ;
        var rangContra = 100 - rangPro ;
        var dirBalance = dirImages + '/balance' ;
        var proPict = dirBalance +'/green_line.png' ;
        var contraPict = dirBalance +'/red_line.png' ;
        var $imgPro  = $('<img/>') ;
        $imgPro.attr('src',proPict) ;
        var $imgContra  = $('<img/>') ;
        $imgContra.attr('src',contraPict) ;
        $rangBlock.append($imgPro) ;
        $rangBlock.append($imgContra) ;

        $imgPro.css('width',rangPro + '%') ;
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
        $txtBlock.addClass(CSS_TEXT_SIGNAL) ;
        $txtBlock.css('padding','0 10px') ;
        $txtBlock.css('column-count',2) ;
        $txtBlock.css('column-gap','2em') ;
        $txtBlock.css('column-width',width/2) ;
        $txtBlock.append(text) ;
        return $txtBlock ;

    } ;
    /**
     * подвал - итоговая оценка - среднее по всем
     * размер весов увеличен в 1.5 раза
     * @param totalRang
     * @returns {*|jQuery|HTMLElement}
     */
    var signalTotalRowBuild = function(totalRang) {
        var rangPro = 50 + Math.round(totalRang/2) ;
        var rangContra = 100 - rangPro ;

        var dirBalance = dirImages + '/balance' ;
        var $tr = $('<tr/>') ;
        var widthTot = scrollBackground.getDataAreaWidth() ;
        var width = (widthTot/4 - 20) *1.5 ;

        var $totalBlock = $('<div/>') ;
        var $totalTextBlock = $('<div/>') ;
        var $imgText = $('<img/>') ;
        $imgText.attr('src',dirBalance + '/text_kosekven.png') ;
        $imgText.css('width',width) ;
        $totalTextBlock.append($imgText) ;
        $totalBlock.append($totalTextBlock) ;


        var $balanceBlock = $('<div/>') ;

        var marginLeft = (widthTot - width)/2 ;
        tdBalanceBuild($balanceBlock,width,totalRang) ;

        $totalBlock.append($balanceBlock) ;
        //--- значение ранга //
        var $percBlock = $('<div/>') ;
        $percBlock.css('width',width) ;
        $percBlock.addClass(CSS_TOTAL_SIGNAL) ;
        //-- левый край % - за
        var $leftPers =  $('<div/>') ;
        $leftPers.css('float','left') ;
        $leftPers.append(rangPro +'%') ;
        $leftPers.css('width',50) ;
        $percBlock.append($leftPers) ;
        //-- правый край % - за
        var $rightPers =  $('<div/>') ;
        $rightPers.css('float','right') ;
        $rightPers.css('width',50) ;

        $rightPers.append(rangContra +'%') ;
        $percBlock.append($rightPers) ;
        $totalBlock.append($percBlock) ;
        $totalBlock.css('margin-left',marginLeft) ;
        return $totalBlock ;
    } ;

}
