/**
 * наличие блока $('#userInterfaceBlock') - признак запуска userInterface()
 */
function MainScript() {
    var requestForm = paramSet.requestForm ; //
    var requestGoForm = paramSet.requestGoForm ;
    var mainProjectsForm = paramSet.mainProjectsForm ;
    var philosophyForm = paramSet.philosophyForm ;
    var userInterface =  paramSet.userInterface ;
    var _this = this;
    //---------------------------------------------//
    this.init = function () {
//     Начальная заставка и меню
        var $user = $('#userInterfaceBlock') ;
        if ($user.length == 0 ) {
            var $tabs = $('#tabs');
            $tabs.tabs({
                heightStyle: 'auto'
            });
            $tabs.animate({height: "show"}, 1000);
            requestForm.init();       // нач установка
            requestGoForm.init();
            philosophyForm.init();
            requestForm.requestEdit();
        }else {

            userInterface.init() ;
            philosophyForm.init();
        }
    };

}