/**
 * Объект отображения философских мыслей
 */
function PhilosophyForm() {
    var $resultBlock = $('#resultBlockPhilosophy');
    var pictureBlocks = [] ;
    var picturesPosition = [] ;
    var currentBlockSize = {'W' : 160, 'H': 100} ;
    var currentDw = 20 ;
    var dirImages = paramSet.windowLocationHost+'/images/zodiak' ;
    var currentImagesSetName = 'zodiak' ;
    var currentPictures  = [
        'kartinki24_ru_signs_of_the_zodiac_37.jpg',
        'kartinki24_ru_signs_of_the_zodiac_38.jpg',
        'kartinki24_ru_signs_of_the_zodiac_39.jpg',
        'kartinki24_ru_signs_of_the_zodiac_40.jpg',
        'kartinki24_ru_signs_of_the_zodiac_41.jpg',
        'kartinki24_ru_signs_of_the_zodiac_42.jpg',
        'kartinki24_ru_signs_of_the_zodiac_43.jpg',
        'kartinki24_ru_signs_of_the_zodiac_44.jpg',
        'kartinki24_ru_signs_of_the_zodiac_45.jpg',
        'kartinki24_ru_signs_of_the_zodiac_46.jpg',
        'kartinki24_ru_signs_of_the_zodiac_47.jpg',
        'kartinki24_ru_signs_of_the_zodiac_48.jpg'
    ] ;
    //----------------------------------//
    this.init = function() {

    } ;
    var ideaDefine = function() {
        var ideaBlock = $('<div/>') ;
        ideaBlock.css('width',600) ;
        ideaBlock.css('height',50) ;
        ideaBlock.css('border','2px solid black') ;
        ideaBlock.css('background-color','grey') ;
        ideaBlock.css('color','red') ;
        ideaBlock.css('font-size','30px') ;
        ideaBlock.css('text-align','center') ;
        ideaBlock.append('<strong>очень ценная мысль</strong>') ;
        $resultBlock.append(ideaBlock) ;
        ideaBlock.position({
            my: 'center center',
            at : 'center center-20',
            of : '#resultBlockPhilosophy'
        }) ;
    } ;

    var pictureBlocksInit = function() {
        for (var i = 0; i < 12; i++) {
            simpleBlockDefine(i) ;
        }
    } ;
    var simpleBlockDefine = function(i) {
        var h = currentBlockSize['H'] ;
        var w = currentBlockSize['W'] ;
        var dw = 5 ; // 20 ;
        var dh = h ; // 0.5 * h ; // 0.33 * h ;
        var y = 0 ;
        var x = 0 ;
        if (i === 0 || i === 12) {
            y = 0 ;
            x = 0 ;
        }
        if (i >=1 && i <= 3) {
            x = i * (w + dw) ;
            y = i * dh ;
        }
        if (i >=4 && i <= 6) {
            x = (3 - (i - 3)) * (w + dw) ;
            y = i * dh ;

        }
        if (i >=7 && i <= 9) {
            x = (-3 + (9 - i)) * (w + dw) ;
            y = (6 - (i - 6)) * dh ;

        }
        if (i >=10 && i <= 11) {
            x = (-3 + (i - 9)) * (w + dw) ;
            y = (6 - (i - 6)) * dh ;

        }
        var block = $('<div/>') ;
        block.css('width',w) ;
        block.css('height',h) ;
        block.css('border','2px solid green') ;
        block.css('background-color','blue') ;
        block.css('color','red') ;
        block.css('font-size','20px') ;
        var url = 'url(' + dirImages + '/' + currentPictures[i] +')' ;
        block.css('background-image',url) ;
        $resultBlock.append(block) ;
        var sign = (x >= 0) ? '+' : '-' ;
        x = (x >= 0) ? x : -x ;
        var at = 'center' + sign  + x + ' top+' + y ;
        var id = 'pictBlock_'+i ;
        var position = definePosition(at) ;
        var blockItem = defineBlockItem(id,i) ;

        block.position(position) ;
        block.attr('id',id) ;
        block.append('N '+i) ;

        picturesPosition[i] = position ;
        pictureBlocks[i] = blockItem ;
        return block ;

    } ;
    var definePosition = function(at) {
        return {my: "center top", at: at, of: '#resultBlockPhilosophy',collision:'none'} ;
    } ;
    var defineBlockItem = function(id,index) {
        return {'id' :id, 'index' : index } ;
    } ;
    this.queryGo = function() {
       responseShow() ;
    } ;
    var responseShow = function() {
   //     $resultBlock.empty() ;
        var resultWidth = (currentBlockSize['W'] + currentDw) * 7 ;
        var resultHeight = currentBlockSize['H'] * 8 ;
        $resultBlock.dialog({

            title: 'Результат запроса',
            width: resultWidth,
            maxHeight : resultHeight,
            modal: true,
            position: {
                my: "center top", at: "center top+10", of: window
            },
            beforeClose: function (event, ui) {
            }
        });
        $resultBlock.css('overflow','auto') ;
        pictureBlocksInit() ;
        ideaDefine() ;
        commandSet();
    } ;

    var pictureMove = function(sign) {
        if (sign > 0) {
            var position_0 = picturesPosition[0] ;
            for (var i = 0 ; i <= 10 ; i++) {
                picturesPosition[i] = picturesPosition[i+1] ;
            }
            picturesPosition[11] = position_0 ;
        } else {
            var position_11 = picturesPosition[11] ;
            for (var i = 11 ; i >= 1 ; i--) {
                picturesPosition[i] = picturesPosition[i-1] ;
            }
            picturesPosition[0] = position_11 ;
        }


        for (var i = 0 ; i <= 11 ; i++) {
            var blk = pictureBlocks[i] ;
            var id = blk['id'] ;
            var index = blk['index'] ;
            var position = picturesPosition[index] ;
            $('#' + id).position(position) ;
      //      index = (index+1 === 12) ? 0 : index + 1 ;
      //      blk['index'] = index ;

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

            }
        } ;
        var cmdExit = {
            text: 'заканчить',
            click: function () {

            }
        } ;
        $($resultBlock).dialog("option", "buttons", [
            cmdSpeedIncr,cmdSpeedDecr,cmdChangeImages,cmdExit
        ]);
    } ;
}
