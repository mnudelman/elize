<?php
/**
 * Добавленные js скрипты
 */
//
$scriptsList = [
'jquery' => $dirLib.'//jquery-2.1.4.js',
   'jquery_ui' => $dirJquery_ui.'/jquery-ui.js' ,
   'jstree' => $dirJstree.'/jstree.js',
   'mouseWheel' => $dirMousewheel.'/jquery.mousewheel.js',
   'autoResize' =>  $dirAutoResize.'/autoResize.js',
   'yandex-maps' =>  'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
] ;
foreach ($scriptsList as $name => $scriptFile) {
        echo '<script language="javascript" src="'.$scriptFile.
            '"></script>' ;

}