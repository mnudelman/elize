/**
 * контроллер 0 уровня. Определяет вид запуска user | admin.
 * запуск user при наличии блока $('#userInterfaceBlock'), иначе
 * запуск admin ( редактирование описаний)
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
                heightStyle: 'auto',
                collapsible: true
            });

            $tabs.animate({height: "show"}, 1000);
            $tabs.draggable();
            requestForm.init();       // нач установка
            requestGoForm.init();
//            philosophyForm.init();
            requestForm.requestEdit();
        }else {

            userInterface.init() ;
            philosophyForm.init();
        }
    };

}