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


        $resultBlock.dialog({

            title: 'Результат запроса',
            maxWidth: resultWidth,
            width: 1000 ,
  //          maxHeight : resultHeight,
            modal: true,
            position: {
                my: "center top", at: "center top+10", of: window
            },
            beforeClose: function (event, ui) {
            }
        });
        $resultBlock.css('overflow','auto') ;

        topologyBuild() ;     // построить топологию изображения
        commandSet();
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
        $tableShow.attr('cellspacing',2) ;
        $tableShow.attr('border',1) ;
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
