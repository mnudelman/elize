/**
 * ПРедставление результата
 */
function ResultShow() {
    this.init = function () {

    };



    this.showGo = function () {
        var windowHeight = $(window).height() ;
        var windowWidth = $(window).width() ;
        var w = 1.203*windowHeight ;
        $('#resultBlock').dialog({
         autoOpen: false,
          width: w,
          height: windowHeight,
          minHeight: 400,
          minWidth: 500,
          maxWidth: 1500,
          dialogClass: "result" ,
         show: { effect: "blind", duration: 1000 },
            hide: {
                        effect: "explode",
                        duration: 1000
                    },
            buttons: [
                {
                    text: "Ok",
                    icons: {
                        primary: "ui-icon-heart"
                    },
                    click: function() {
                        $( this ).dialog( "close" );
                    }

                    // Uncommenting the following line would hide the text,
                    // resulting in the label being used as a tooltip
                    //showText: false
                }
            ]
        });
        $('#resultBlock').dialog('open') ;
    } ;
    //$('#resultBlock').dialog({
    //    width: 500,
    //    height:400,
    //    autoOpen: false,
    //    show: {
    //        effect: "blind",
    //        duration: 1000
    //    },
    //    hide: {
    //        effect: "explode",
    //        duration: 1000
    //    }
    //});
    //} ;
}