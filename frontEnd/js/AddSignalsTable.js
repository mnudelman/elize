/**
 * Таблица - свиток
 */
function AddSignalsTable() {
    var addSignals = {} ;
    var backgroundImg ;
    var $addSignalsTable = $('#addSignalsTable') ;
    var $addSignalsTotal = $('#addSignalsTotal') ;
    var dirImages;
    var scrollBackground ;
    var totalFontSize = 0 ;

    var _this = this ;
    this.init = function(signals) {
        addSignals = signals ;
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
        dirImages = paramSet.dirImages ;
    } ;
    this.tableShow = function() {
        scrollBackground = paramSet.scrollBackground ;
        scrollBackground.answerInit() ;        // вывод пустой формы
        scrollBackground.answerBegin() ;        // начало вывода
        $addSignalsTable.empty();
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var items = pictures['items'] ;
        var n = 0 ;
        var totalRang = 0 ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            var place = item['place'] ;
            var substName = item['subst'] ;
            var signal = addSignals[substName] ;
            totalRang += signal['rang'] - 0 ;
            n++ ;
            var substFile = dirImages + '/' +signal['file'] ;
            var $row = signalRowBuild(signal,place,substName) ;
            $addSignalsTable.append($row) ;
            scrollBackground.putAnswerItem($row) ;
        }
        totalRang = totalRang/n ;
        var $totalRow = signalTotalRowBuild(totalRang) ;
        $addSignalsTable.append($totalRow) ;
        scrollBackground.putAnswerItem($totalRow,false) ;

    } ;
    var signalRowBuild = function(signal,place,name) {
        var kResize = backgroundImg.getKResize()  ;
        var $tr = $('<tr/>') ;
        var $tdPict = $('<td/>') ;
        var pictFile =  dirImages + '/' +signal['file'] ;
        var typeComment = signal['typeComment'] ;
        var signalName =  signal['name'] ;
        var widthTot = scrollBackground.getDataAreaWidth() ;
        var width = widthTot/4 - 20 ;


        var height = place['y2'] - place['y1'] ;
        var $img = $('<img/>') ;

        $img.attr('src',pictFile) ;


        var imgId =  name + '_img' ;
        $img.attr('id',imgId) ;

        //$img.css('height',height) ;
        $tdPict.addClass('textSignal') ;
        $tdPict.css('width',width) ;
        $tdPict.append($img) ;
        $img.css('width','100%') ;
        var txt = typeComment + '. ' + signalName ;
        $tdPict.append('<p>' +txt + '</p>') ;
        //------------//
        var $tdText1 = $('<td/>') ;
//        $tdText1.css('align','top') ;
        $tdText1.css('width',2 * width) ;
        $tdText1.css('vertical-align','top') ;
        var text = signal['text'] ;
        var h =  kImgRealSize(pictFile) * width ;
        var $txt1 = textColumnBuild(text,width) ;

        $tdText1.append($txt1) ;



        var rang = signal['rang'] ;
        var $tdBalance = $('<td/>') ;
        tdBalanceBuild($tdBalance,width,rang) ;

        $tr.append($tdPict) ;
        $tr.append($tdText1) ;
        $tr.append($tdBalance) ;

        return $tr ;
    } ;
    var kImgRealSize = function(pictFile) {
        var img = new Image();

        img.src = pictFile;
        return img.height/img.width ;
    } ;
    var tdBalanceBuild = function($tdBalance,width,rang) {
//        var $tdBalance = $('<td/>') ;
        $tdBalance.css('width',width) ;
        var dirBalance = dirImages + '/balance' ;
        var balancePict =  (rang > 0) ? 'balance_pro.png' : 'balance_contra_1.png' ;
        balancePict =  (rang === 0) ? 'balance_equal_1.png' : balancePict ;
        var $imgB = $('<img/>') ;
        $imgB.attr('src',dirBalance + '/' +balancePict) ;
        $tdBalance.append($imgB) ;

        $tdBalance.css('vertical-align','top') ;
        $imgB.css('width','100%') ;

        var $proContra = textProContraBuild() ;    // подпись "за"       "против"

        $tdBalance.append($proContra) ;
        var $rangDiagram  = rangDiagramBuild(rang) ;
        $tdBalance.append($rangDiagram) ;
        return $tdBalance ;
    } ;
    var textProContraBuild = function() {
        var dirBalance = dirImages + '/balance' ;
        var $textProContra = $('<div/>') ;
        var $imgProContra  = $('<img/>') ;
        var proContraPict  = dirBalance + '/text_pro_contra.png' ;
        $imgProContra.attr('src',proContraPict) ;
        $textProContra.append($imgProContra) ;
        $imgProContra.css('width','100%') ;

        totalFontSize = $imgProContra.height() ;


        return $textProContra ;
    } ;
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

//        $imgPro.css('width','50%') ;
        $imgPro.css('height',3) ;
        $imgContra.css('width',rangContra + '%') ;
//        $imgContra.css('width','50%') ;
        $imgContra.css('height',3) ;
        return $rangBlock ;

    };
    var textColumnBuild = function(text,width)  {
        var $txtBlock = $('<div/>') ;
        $txtBlock.addClass('textSignal') ;
        $txtBlock.css('padding','0 10px') ;
        $txtBlock.css('column-count',2) ;
        $txtBlock.css('column-gap','2em') ;
        $txtBlock.css('column-width',width/2) ;
        $txtBlock.append(text) ;
        return $txtBlock ;

    } ;
    var signalTotalRowBuild = function(totalRang) {
        var rangPro = 50 + Math.round(totalRang/2) ;
        var rangContra = 100 - rangPro ;

        var dirBalance = dirImages + '/balance' ;
        var $tr = $('<tr/>') ;
        var kResize = backgroundImg.getKResize()  ;
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

        $percBlock.addClass('totalSignal') ;
        //$percBlock.css('font-size',20) ;
        //$percBlock.css('font-family','palar') ;
        //$percBlock.css('color','#6a2e02') ;

        var totatRang = totalRangClc() ;
        var $leftPers =  $('<div/>') ;
        $leftPers.css('float','left') ;
        $leftPers.append(rangPro +'%') ;
        $leftPers.css('width',50) ;
        $percBlock.append($leftPers) ;

        var $rightPers =  $('<div/>') ;
        $rightPers.css('float','right') ;
        $rightPers.css('width',50) ;

        $rightPers.append(rangContra +'%') ;
        $percBlock.append($rightPers) ;
        $totalBlock.append($percBlock) ;
        $totalBlock.css('margin-left',marginLeft) ;
        return $totalBlock ;
    } ;
    var totalRangClc = function() {

    } ;

}
