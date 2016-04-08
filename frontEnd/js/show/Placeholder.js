/**
 * Объект - имитатор placeholder
 */
function Placeholder() {
    var $placeholder ;            // блок - имитатор placeholder
    var $textArea ;               // элемент ввода, прикрываемый placeholder' ом
    var $blockContainer ;
    var blockWidth ;                // обрамляющий блок
    var blockHeight;
    var currentHeight = 0 ;         // текущая высота области
    var HOLDER_HEIGHT = 20 ;
    var FONT_SIZE_NORMAL ;
    var FONT_SIZE_MIN ;
    var backgroundImg ;
    var PLACEHOLDER_TEXT = 'ЗАДАЙТЕ ВОПРОС' ;
    var PLACEHOLDER_CSS = 'placeholder' ;
    var _this = this ;
    //------------------------//
    this.init = function($blkContainer) {
        backgroundImg = paramSet.backgroundImage ;
        $blockContainer = $blkContainer ;
        $placeholder = $('<div />') ;
        $placeholder.attr('id','placeholder') ;
        $blkContainer.append($placeholder) ;
        $placeholder.append(PLACEHOLDER_TEXT) ;
        $placeholder.addClass(PLACEHOLDER_CSS);
        $placeholder.attr('id', 'placeholder');
        $placeholder.attr('hidden','hidden') ;
        FONT_SIZE_NORMAL = ($placeholder.css('font-size')).replace('px','') - 0 ;
        FONT_SIZE_MIN =  0.7 * FONT_SIZE_NORMAL;
    } ;
    this.holderSetPlace = function() {
        blockWidth = $blockContainer.width();
        blockHeight = $blockContainer.height();
        $placeholder.css('width',blockWidth) ;
        var holderHeight = $placeholder.height() ;
        var top = Math.round((blockHeight - holderHeight) / 2);
        $placeholder.css('margin-top', top);

    } ;
    /**
     * Элемент, прикрываемый  placeholder' ом
     * @param $txtArea
     */
    this.setTextArea = function($txtArea) {
        $textArea = $txtArea ;
    } ;
    this.show = function() {
        $blockContainer.removeAttr('hidden') ;
        $textArea.attr('hidden','hidden') ;
        var fontSize = fontSizeClc() ;
        $placeholder.css('font-size',fontSize) ;
        _this.holderSetPlace() ;
        $placeholder.removeAttr('hidden') ;

    } ;
    this.hide = function() {
        $placeholder.attr('hidden','hidden') ;
        var fontSize = fontSizeClc() ;
        $textArea.css('font-size',fontSize) ;
        $textArea.removeAttr('hidden') ;

        $textArea.focus() ;
    } ;
    this.hideAll = function() {
        $placeholder.attr('hidden','hidden') ;
        $textArea.attr('hidden','hidden') ;
    } ;
    var fontSizeClc = function() {
        var kResize = backgroundImg.getKResize() ;
        var ky = kResize['ky'] ;
        return  (ky < 0.5) ? FONT_SIZE_MIN : FONT_SIZE_NORMAL ;
    } ;
}
