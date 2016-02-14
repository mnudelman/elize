/**
 * Объект отображения философских мыслей
 */
function PhilosophyForm() {
    var formAttr ;        // объект - атрибуты формы
    var currentPhrase = '' ;          // текущая фраза
    var backgroundImg ; // объект - компоненты изображения
    var animateStop = false ;
    var $resultBlock = $('#resultBlockPhilosophy') ;
    //----------------------------------//
    this.init = function() {
        backgroundImg = paramSet.backgroundImage ; // объект - компоненты изображения
        formAttr = new PhilosophyFormAttr() ;        // объект - атрибуты формы
        formAttr.init() ;
    } ;
     /**
     * изменить фразу
     */
    var phraseChange = function() {
        currentPhrase = formAttr.getPhrase() ;
     } ;

    this.queryGo = function() {
       responseShow() ;
    } ;
    var
    /**
     * прервать вывод
     */
    this.stopShow = function() {
        $resultBlock.empty() ;
    } ;

    var responseShow = function() {
        $resultBlock.empty() ;
        var pictures = backgroundImg.getPhilosophyPictures() ;
        var dir = pictures['dir'] ;
        var items = pictures['items'] ;
        for (var itemKey in items) {
            var item = items[itemKey] ;
            showItem(dir,item) ;

        }
    } ;
    var showItem = function(dir,item) {
       var place = item['place'] ;
       var imgFile = dir + '/' + item['img']['file'] ;
       var top = place['y1'] ;
       var left =  place['x1'] ;
       var width =  place['x2'] - place['x1'] ;
       var height =  place['y2'] - place['y1'] ;
       var $img = $('<img/>') ;
       $img.attr('src',imgFile) ;
       $img.css('width',width) ;
       $img.css('height',height) ;
       var $block = $('<div/>') ;
       $block.append($img) ;
        $block.css('position','absolute') ;
        $block.css('top',top) ;
        $block.css('left',left) ;
       $resultBlock.append($block) ;

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
