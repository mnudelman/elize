/**
 * Created by michael on 17.02.16.
 */
function testScrollBackground() {
    var scrollBack = paramSet.scrollBackground ;
    scrollBack.answerInit() ;
    var error = 'ОШИБКА. Что-то не так' ;
    var totalHuman = 'Найдено 100 000 ответов' ;
    scrollBack.putError(error) ;
    scrollBack.putTotalHuman(totalHuman) ;
    var $li = $('<li/>') ;
    $li.addClass('box') ;
    $li.append('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') ;
    scrollBack.putAnswerItem($li) ;
}
