/**
 * Сообщения программы
 */
function Messages() {
    var commonFunc ;                  // общие функции
    var $message = $('#messages');      // блок вывода сообщений
    //------------------------------------//
    this.showMessage = function(text,title) {
        commonFunc = paramSet.commonFunc ;
        $message.dialog({
            title: (title == undefined || title.length === 0) ? 'Сообщения программы' : title,
            width: 400,
            modal: true,
            beforeClose: function (event, ui) {

            },
            buttons: [
                {
                    text: "продолжить",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "прервать",
                    click: function() {
                        $( this ).dialog( "close" );
                        window.close() ;
                    }
                }
            ]
        }) ;
        $message.empty() ;
        commonFunc.parseText($message,text) ;
    } ;
}