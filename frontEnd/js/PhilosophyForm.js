/**
 * Объект отображения философских мыслей
 */
function PhilosophyForm() {
    var formAttr ;        // объект - атрибуты формы
    var $resultBlock = $('#resultBlockPhilosophy');
    var phraseBlockId = 'phraseBlock' ;    // блок для вывода фразы
    var pictureBlocksId = [] ;             // список id клеток с картинками
    var pictureIndexes = [] ;              // индексы списка картинок
    var currentBlockSize = {'W' : 160, 'H': 130} ;
    var currentPictureSet = {} ;             // объект - набор картинок
    var currentPictures  = [] ;       // набор картинок - атрибут pictureSet
    var currentPhrase = '' ;          // текущая фраза
    var animateStop = false ;         //  остановить цикл анимации
    //----------------------------------//
    this.init = function() {
        formAttr = new PhilosophyFormAttr() ;        // объект - атрибуты формы
        formAttr.init() ;
    } ;
     /**
     * изменить фразу
     */
    var phraseChange = function() {
        currentPhrase = formAttr.getPhrase() ;
        $('#'+phraseBlockId).empty() ; 
         $('#'+phraseBlockId).append('<strong>' + currentPhrase +'</strong>') ;

     } ;

    this.queryGo = function() {
       responseShow() ;
    } ;


    var responseShow = function() {
        $resultBlock.empty() ;


        currentPictureSet = formAttr.getPictureSet() ;
        currentPhrase = formAttr.getPhrase() ;

  //      currentBlockSize = formAttr.getPictureSize() ;
        var resultWidth = 1500 ; //(currentBlockSize['W'] + currentDw) * 7 ;
        var resultHeight = 600 ; //currentBlockSize['H'] * 8 ;


  //      $resultBlock.dialog({
  //
  //          title: 'Результат запроса',
  //          maxWidth: resultWidth,
  //          width: 1000 ,
  ////          maxHeight : resultHeight,
  //          modal: true,
  //          position: {
  //              my: "center top", at: "center top+10", of: window
  //          },
  //          beforeClose: function (event, ui) {
  //          }
  //      });

        //var windowHeight = $(window).height() ;
        //var windowWidth = $(window).width() ;
        //var w = 1.203*windowHeight ;
        //$resultBlock.dialog({
        //    autoOpen: false,
        //    width: w,
        //    height: windowHeight,
        //    minHeight: 400,
        //    minWidth: 500,
        //    maxWidth: 1500,
        //    dialogClass: "result" ,
        //    show: { effect: "blind", duration: 1000 },
        //    hide: {
        //        effect: "explode",
        //        duration: 1000
        //    },
        //    beforeClose:function (event, ui) {
        //        animateStop = true ;         //  остановить цикл анимации
        //    }
        //});

        var windowHeight = $(window).height() ;
        var windowWidth = $(window).width() ;
        var w = 1.184*windowHeight ;
        var left = (windowWidth - w)/2 ;
        $resultBlock.css('width',w) ;
        $resultBlock.css('height',windowHeight) ;
        $resultBlock.css('overflow','auto') ;
        $resultBlock.css('position','absolute') ;
        $resultBlock.css('top',0) ;
        $resultBlock.css('left',left) ;
        $resultBlock.css('padding-left','10%') ;
        $resultBlock.css('padding-right','10%') ;
        $resultBlock.show( "blind", 1000);

        $resultBlock.removeAttr('hidden') ;
        $resultBlock.on('click',function(e) {     // закрыть по click
            var x = e.pageX;
            var y = e.pageY;
            var windowHeight = $(window).height() ;
            var windowWidth = $(window).width() ;
            if (x/windowWidth >= 0.7 && y/windowHeight <= 0.1) {
                animateStop = true ;         //  остановить цикл анимации
                $resultBlock.hide( "explode", 1000);
                //$resultBlock.hide( "drop", { direction: "down" }, "slow" );

//                $resultBlock.attr('hidden','hidden') ;
            }
        }) ;


        topologyBuild() ;     // построить топологию изображения
   //     commandSet();
        $('#'+phraseBlockId).click(function() {
        // animateStop = true ;
            phraseChange() ;
        }) ;
        cycleShow() ;
    } ;
    var cycleShow = function() {
        animateStop = false ;
        var timeDelay = 1500;
        var textTimeSteps = 4;
        var timeStep = 0;
        var moveSign = 1 ;
        var tmpTimer = setInterval(function () {
            if (animateStop) {        //  остановить цикл анимации)
                clearInterval(tmpTimer);
            }
            if (timeStep >= textTimeSteps) {
                phraseChange() ;
                moveSign = (Math.random() > 0.5 ) ? +1 : -1 ;
                timeStep = 0 ;
            }
            timeStep++ ;
            pictureMove(moveSign) ;
        }, timeDelay);


    } ;
    /**
     * currentPictures = {pictures: [картинки],
     *                    size: {w:<width>,y:<height>},   - размер картинки
     *                   topology: { matrix: { cols:<cols>, rows:<rows>},
     *                              cells: {<row>: [col1,col2,..]},
     *                             text: {row:<row>, col:<col>, rowspan:<rowspan>,colspan:<colspan>}
     *                            }
     *               }
     */
    var topologyBuild = function() {
        currentPictures = currentPictureSet['pictures'] ; // [] - картинок
        //  строим table
        var tableCols = currentPictureSet['topology']['matrix']['cols'] ;
        var tableRows = currentPictureSet['topology']['matrix']['rows'] ;
        var cells = currentPictureSet['topology']['cells'] ;
        var pictSize = currentPictureSet['size'] ;
        var textPlace = currentPictureSet['topology']['text'] ;
        var $tableShow = $('<table/>') ;
        $tableShow.attr('id','tableShow') ;
        $tableShow.attr('cols',tableCols) ;
        $tableShow.attr('cellpadding',2) ;
        $tableShow.attr('cellspacing',0) ;
        $tableShow.attr('border',0) ;
        $tableShow.css('background-color','rgba(217,189,143,0.7)') ;
        $tableShow.css('height','70%') ;
        $tableShow.css('width','70%') ;
        $tableShow.css('margin-left','6%') ;
        $tableShow.css('margin-top','6%') ;


        var pict_i = 0 ;
        for (var i = 1 ; i <= tableRows; i++) {
            var tr = $('<tr/>') ;
            var rowCells = cells[i] ;
            for (var j = 1; j <= tableCols; j++) {
                var td = $('<td/>') ;
                tr.append(td) ;
                if (rowCells.indexOf(j) >= 0) {    // картинку
                    var blkId = 'td_' + i + '_'+j ;
                    td.attr('id',blkId) ;

                    pictureBlocksId[pict_i] = blkId ;             // список id клеток с картинками
                    pictureIndexes[pict_i] = pict_i ;              // индексы списка картинок

                    var img = $('<img/>') ;
                    img.attr('src',currentPictures[pict_i++]) ;
                    img.attr('width',pictSize['w']) ;
                    td.attr('align','center') ;


                    td.append(img) ;
                    td.css('width','24%') ;
                    td.css('height','32%') ;

                }
                if (textPlace['row'] == i && textPlace['col'] == j) {
                    if (textPlace['rowspan'] !== undefined && textPlace['rowspan'] > 0) {
                        td.attr('rowspan',textPlace['rowspan']) ;
                    }
                    if (textPlace['colspan'] !== undefined && textPlace['colspan'] > 0) {
                        td.attr('colspan',textPlace['colspan']) ;
                        j += textPlace['colspan'] - 1 ;
                    }
                    td.attr('id',phraseBlockId) ;
                    td.css('border','2px solid black') ;
                    td.css('background-color','grey') ;
                    td.css('color','red') ;
                    td.css('font-size','20px') ;
                    td.css('text-align','center') ;
                    td.append('<strong>' + currentPhrase +'</strong>') ;
                    td.css('width','50%') ;
                    td.css('height','50%') ;
                }

            }
            $tableShow.append(tr) ;
        }
        $resultBlock.append($tableShow) ;
    } ;
    var pictureMove = function(sign) {
        var n = pictureIndexes.length ;
        if (sign > 0) {
           var iLast = pictureIndexes[n-1] ;
            for (i = n-1; i > 0 ; i--) {
                pictureIndexes[i] = pictureIndexes[i-1] ;
            }
            pictureIndexes[0] = iLast ;
        } else {
            var iFirst = pictureIndexes[0] ;
            for (i = 0; i < n - 1 ; i++) {
                pictureIndexes[i] = pictureIndexes[i+1] ;
            }
            pictureIndexes[n-1] = iFirst ;

        }
       for (var i = 0 ; i < pictureBlocksId.length ; i++) {
            var imgInd = pictureIndexes[i] ;
            var blkId = pictureBlocksId[i] ;
            $('#' + blkId + ' img').attr('src',currentPictures[imgInd]) ;
        }
    } ;
    var  commandSet = function() {
         var cmdSpeedIncr = {
             text: 'move+',
             click: function () {
                    pictureMove(+1) ;
             }
         } ;
        var cmdSpeedDecr = {
            text: 'move-',
            click: function () {
                pictureMove(-1) ;
            }
        } ;
        var cmdChangeImages = {
            text: 'сменить набор',
            click: function () {
                responseShow() ;
            }
        } ;
        var cmdPhraseChange = {
            text: 'сменить фразу',
            click: function () {
                phraseChange() ;
            }
        } ;
        var cmdExit = {
            text: 'заканчить',
            click: function () {
                $($resultBlock).dialog('close')  ;
            }
        } ;
        $($resultBlock).dialog("option", "buttons", [
            cmdSpeedIncr,cmdSpeedDecr,cmdChangeImages,cmdPhraseChange,cmdExit
        ]);
    } ;
}
