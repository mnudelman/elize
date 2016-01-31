/**
 * Created by mnudelman@yandex.ru on 22.11.15.
 */
function MainScript() {
    var requestForm = paramSet.requestForm ; //
    var requestGoForm = paramSet.requestGoForm ;
    var mainProjectsForm = paramSet.mainProjectsForm ;
    var philosophyForm = paramSet.philosophyForm ;
    var _this = this;
    //---------------------------------------------//
    this.init = function () {
//     Начальная заставка и меню

        var $tabs = $('#tabs') ;
        $tabs.tabs({
            heightStyle : 'auto'
        });
        $tabs.animate({height: "show"}, 1000);
        requestForm.init() ;       // нач установка
        requestGoForm.init() ;
        requestForm.requestEdit() ;
        philosophyForm.init() ;
    };

}