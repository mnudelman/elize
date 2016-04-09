<?php
/**
 * формирует список тегов <link .... >
 * для варианта администратора подгружается admin.css, для пользователя - user.css
 */
function cssLinkCreate($dirLocate,$adminFlag) {
      $dirJquery_ui = $dirLocate['dirJquery_ui'] ;
      $dirJstree = $dirLocate['dirJstree'] ;
      $dirStyle = $dirLocate['dirStyle'] ;

  $cssLinkList = [
      $dirJquery_ui.'/sunny/jquery-ui.css',
      $dirJquery_ui.'/sunny/theme.css',
      $dirJstree.'/themes/default/style.min.css',
      $dirStyle.'/formStyle.css',
      $dirStyle.'/style.css',
      $dirStyle.'/yandexStyles.css'
      ] ;
    $cssLinkList[] = ($adminFlag) ? $dirStyle.'/admin.css' : $dirStyle.'/user.css' ;
    foreach ($cssLinkList as $key => $cssLink) {
        echo '<link rel="Stylesheet" href="'.$cssLink.'" type="text/css">' ;
    }
}
