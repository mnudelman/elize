/**
 * Сообщения программы
 */
function Messages() {
    var $message = $('#messages');
    this.showMessage = function(text) {
        $message.dialog({
            title: 'Сообщения программы',
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
        $message.append('<strong>'+text+'</strong>') ;
    }

}