/**
 * Сообщения программы
 */
function Messages() {
    var $message = $('#messages');
    this.showMessage = function(text,title) {

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
        if (typeof(text) === 'object') {
           parseText(text,0) ;
        }else {
            $message.append('<strong>'+text+'</strong>') ;
        }

    } ;
    var parseText = function(textObj,level) {
        if (level == 0) {
        }
        var simpleType = ['number','boolean','string','undefined'] ;
        var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp' ;
        var indent ='' ;
        var br = '<br>' ;

        for (var  i = 0; i < level ; i++) {
            indent += tab ;
        }
        var currentType = (typeof textObj) ;
        if (simpleType.indexOf(currentType) >= 0) {
            $message.append(indent+textObj+br) ;
            return true ;
        }
        for (var key in textObj) {
            $message.append(indent+'<strong>'+key+':</strong>'+br) ;
            var value = textObj[key] ;
            parseText(value,level+1) ;
        }
        if (level == 0) {
        }
        return true ;

    }
}