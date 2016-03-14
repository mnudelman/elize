<?php
session_start() ;
/**
*  отладка класса AddSignal - дополнительные сигналы
 */
?>
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
include_once __DIR__ . '/request_url.php';
mb_internal_encoding("UTF-8");
// загружаем параметры---//

$answ = [
    'successful' => false,
    'message' => 'ERROR:тип запроса не распознан "'.$operation.'"'
] ;
//$url = request_url() ;
//echo 'url:'.$url.'<br>' ;
$signal  = new AddSignals() ;
$answ = $signal->getSignals() ;
//var_dump($_SERVER) ;
var_dump($answ) ;
