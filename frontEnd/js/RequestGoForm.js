/**
 * форма исполнения запроса
 */
function RequestGoForm() {
    var $textLabel = $('#textGoLabel') ;
    var $requestText = $('#requestText') ;
    var $buttonGo = $('#requestGoBt') ;
    var $result ;
    var _this = this ;
    //-----------------------------//
    this.init = function() {
        $buttonGo.button() ;
        $buttonGo.css('border-radius',20) ;
        $buttonGo.css('position','absolute') ;
        $buttonGo.position({
            my : "right center",
            at : "right-10 top+80",
            of : "#requestGoDialog"
        }) ;
        $textLabel.css('position','absolute') ;
        $textLabel.position({
            my : "left top",
            at : "left+10 top+80",
            of : "#requestGoDialog"
        }) ;
        $requestText.css('position','absolute') ;
        $requestText.css('max-width',400) ;
        $requestText.css('max-height',100) ;
        $requestText.position({
            my : "left top",
            at : "left+80 top+60",
            of : "#requestGoDialog"

        }) ;
    }
}
