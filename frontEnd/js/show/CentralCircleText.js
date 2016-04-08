/**
 * Объект поддерживает изменение рзмеров при вводе
 * области textArea в центральном круге
 * plagin - autoResize
 */
function CentralCircleText() {
    var $textArea ;                // элемент <textArea>
    var blockWidth ;                // обрамляющий блок
    var blockHeight;
    var currentHeight = 0 ;         // текущая высота области
    var MIN_HEIGHT = 30 ;
    var _this = this ;
    //------------------------//
    this.init = function(blockW,blockH,$txt) {
        $textArea = $txt ;
        blockWidth = blockW ;
        blockHeight = blockH ;
        currentHeight = (currentHeight === 0) ? MIN_HEIGHT : currentHeight ;
        $textArea.css('height',currentHeight) ;
        $textArea.css('min-height',MIN_HEIGHT) ;
        resize() ;
        $textArea.autoResize({
            //  при изменение размера:
            onResize : function() {
                resize() ;
            },
            // после изменения размера:
            animateCallback : function() {
 //               $(this).css({opacity:1});
            },
            // Замедляем анимацию:
            animateDuration : 300,
            // отступ:
            extraSpace : 10,
            minHeight : MIN_HEIGHT     // мин высота (добавил)
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

}