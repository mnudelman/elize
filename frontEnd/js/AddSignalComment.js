/**
 * объект - поясняющий текст к дополнительномуСигналу,
 * текст появляется при наведении на картинку сигнала
 */
function AddSignalComment() {
    var scrollBackground;
    var backgroundImage ;
    var CSS_CLASS = 'addSignalComment' ;
    var commentPlace = {} ;     // описатель положения блока
    var textPlace = {} ;      // расположение текста внутри
    var $commentDiv  ;
    var $dataDiv ;
    var $titleDiv ;
    var $textDiv ;
    var parentBlockPlace = {t:0,l:0,w:0,h:0} ;
    var POSITION_PART_LEFT = 'left' ;
    var POSITION_PART_RIGHT = 'right' ;
    var currentPositionPart;
    var fontSizeNormal ;
    var fontSizeMin ;
    var COMMENT_WIDTH = 200 ;
    var COMMENT_HEIGHT = 300 ;
    var COMMENT_ID = 'addSignalComment' ;
    var COMMENT_DATA_ID = 'addSignalComment_data' ;
    var COMMENT_TITLE_ID = 'addSignalComment_title' ;
    var COMMENT_TEXT_ID = 'addSignalComment_text' ;
    var _this = this ;
    //----------------------------//
    this.init = function() {
        scrollBackground = paramSet.scrollBackground ;
        backgroundImage = paramSet.backgroundImage ;
        $commentDiv = $('#' + COMMENT_ID) ;
        if ($commentDiv.length === 0) {
            $commentDiv = $('<div/>') ;
            $commentDiv.attr('id',COMMENT_ID) ;
        }
        $commentDiv.attr('hidden','hidden') ;
        $commentDiv.addClass(CSS_CLASS) ;
        $commentDiv.empty() ;
    } ;
    this.setCommentPlace = function(place,txtPlace) {
        commentPlace = place ;
        textPlace = txtPlace ;
        commentReplace() ;
        commentTextReplace() ;
    } ;
    this.setParentBlockPlace = function(place) {
        parentBlockPlace = place ;
    } ;
    this.setPositionPart = function(posPart) {
        currentPositionPart = posPart ;
    } ;
    this.showComment = function(title,text) {
        $titleDiv.empty() ;
        $titleDiv.append('<strong>' + title + '</strong>') ;
        $textDiv.empty() ;
        $textDiv.append( text) ;
        $commentDiv.removeAttr('hidden') ;
    } ;
    this.hideComment = function() {
        $commentDiv.attr('hidden','hidden') ;
    } ;
    var commentReplace = function() {
        var wH = $(window).height() ;
        var top = commentPlace['y1'] ;
        var left = commentPlace['x1'] ;
        var w = commentPlace['x2'] - commentPlace['x1'] ;
        var h = commentPlace['y2'] - commentPlace['y1'] ;
        w = Math.max(w,COMMENT_WIDTH) ;
        h= COMMENT_HEIGHT ;
        var blkTop = parentBlockPlace['t'] ;
        var blkLeft = parentBlockPlace['l'] ;
        var blkHeight = parentBlockPlace['h'] ;
        var blkWidth = parentBlockPlace['w'] ;
        if (currentPositionPart == POSITION_PART_LEFT) {
            top = blkTop ;
            left = blkLeft + blkWidth + 10 ;
        }else {
            top = blkTop ;
            left = blkLeft - w - 10 ;

        }




        $commentDiv.css('top',top) ;
        $commentDiv.css('left',left) ;
        $commentDiv.css('width',w) ;
        $commentDiv.css('min-height',h) ;
        $commentDiv.css('height',wH - top-5) ;
//        $commentDiv.css('overflow-y','auto') ;



    } ;
    var commentTextReplace = function() {
        var mainSize = scrollBackground.getMainBlockSize() ;
        var w = $commentDiv.width() ;
        var h = $commentDiv.height() ;
        var k = h/mainSize['h'] ;
        $dataDiv = $('#' + COMMENT_DATA_ID) ;
        if ($dataDiv.length === 0) {
            $dataDiv = $('<div/>') ;
            $dataDiv.attr('id',COMMENT_DATA_ID) ;
        }
        $commentDiv.append($dataDiv) ;
        $dataDiv.css('background-color','rgba(50,255,30,0)') ;
        $dataDiv.css('overflow-x','hidden') ;
        $dataDiv.empty() ;

        $dataDiv.css('position','absolute') ;
        var top =  k * (textPlace['y1']  + 100) ;
        var left = k*50 ; // extPlace['x1'] ;
        var w = textPlace['x2'] - left - k*50 ;

        var h = textPlace['y2'] - textPlace['y1'] ;

        $dataDiv.css('top',top) ;
        $dataDiv.css('left',left) ;
        $dataDiv.css('width',w) ;









//        $dataDiv.css('height',h) ;

        $titleDiv = $('#' + COMMENT_TITLE_ID) ;
        if ($titleDiv.length === 0) {
            $titleDiv = $('<div/>') ;
            $titleDiv.attr('id',COMMENT_TITLE_ID) ;
        }
        $titleDiv.addClass('textSignal') ;
        //var fontSizeNormal =
        //    ($titleDiv.css('font-size')).replace('px','') - 0 ;
        //var fontSizeMin = 0.6 * fontSizeNormal ;
        //var kResize = backgroundImage.getKResize() ;
        //var fontSize = kResize['kx'] * fontSizeNormal ;
        //fontSize = Math.min(fontSize,fontSizeNormal) ;
        //fontSize = Math.max(fontSize,fontSizeMin) ;
        //$titleDiv.css('font-size',fontSize) ;



        $dataDiv.append($titleDiv) ;
        $titleDiv.css('width',w) ;
        $textDiv =  $('#' + COMMENT_TEXT_ID) ;
        if ($textDiv.length === 0) {
            $textDiv = $('<div/>') ;
            $textDiv.attr('id',COMMENT_TEXT_ID) ;
        }
        $textDiv.css('width',w) ;
        $textDiv.addClass('textSignal') ;
        //$textDiv.css('font-size',fontSize) ;
        $dataDiv.append($textDiv) ;

    } ;
 }
