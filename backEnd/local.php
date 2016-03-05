<?php
/**
* Привязка текущейДиректории к корневойПроекта
*/
?>
<?php
$currentDir = __DIR__ ;
// определяем верхний уровень
$topDir = realpath($currentDir) ;
$pi = pathinfo($_SERVER['PHP_SELF']) ;
$currentHtmlDir = $pi['dirname'] ; // относительный адрес для HTML-ссылок
$topHtmlDir = realpath($currentHtmlDir.'/..') ;
$firstSymb = $topHtmlDir[0] ;
if ('/' !== $firstSymb) {
    $topHtmlDir = '/'.$topHtmlDir ;
}

// подключаем класс TaskStore - общие параметры
$dirService = $topDir .'/service' ;
include_once $dirService . '/TaskStore.php' ;
include_once $dirService . '/DbConnector.php' ;
include_once $dirService . '/Message.php' ;
include_once $dirService . '/TaskParameters.php' ;
include_once __DIR__.'/setUp.php' ;
//------ подключение БД -------------//
$pdo = DbConnector::getConnect() ;
if (!DbConnector::$isSuccessful) {
    die('EXIT');
}
$dirProject = realpath(__DIR__ .'/..' ) ;
TaskStore::init($topDir,$topHtmlDir,$dirProject) ;
//  подключаем autoLoad  - авт подключение классов
include_once $dirService . '/autoload.php' ;
//-------------------------------------------//

