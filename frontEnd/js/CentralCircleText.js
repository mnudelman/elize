/**
 * Объект поддерживает изменение рзмеров при вводе
 * области textArea в центральном круге
 */
function CentralCircleText() {
    var $textArea ;                // элемент <textArea>
    var blockWidth ;                // обрамляющий блок
    var blockHeight;
    var currentHeight = 0 ;
    var MIN_HEIGHT = 30 ;
    var _this = this ;
    //------------------------//
    this.init = function(blockW,blockH,$txt) {
 //       currentHeight = 0 ;
        $textArea = $txt ;
        blockWidth = blockW ;
        blockHeight = blockH ;
        currentHeight = (currentHeight === 0) ? MIN_HEIGHT : currentHeight ;
        $textArea.css('height',currentHeight) ;
        $textArea.css('mni-height',MIN_HEIGHT) ;
 //       $textArea.css('width',blockWidth) ;
        resize() ;
        $textArea.autoResize({
            //  при изменение размера:
            onResize : function() {
                resize() ;
            },
            // после изменения размера:
            animateCallback : function() {
                $(this).css({opacity:1});
            },
            // Замедляем анимацию:
            animateDuration : 300,
            // Увеличиваем отступ:
            extraSpace : 10,
            minHeight : MIN_HEIGHT
        });
    } ;
    var resize = function() {
        var h  = $textArea.height() ;
        if (h > blockHeight) {
            $textArea.css('height',blockHeight) ;
            h = blockHeight ;
            $textArea.css('margin-top',0) ;
            return ;
        }
        currentHeight = h ;
        var top = Math.round((blockHeight - h) / 2) ;
        $textArea.css('margin-top',top) ;
    } ;
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