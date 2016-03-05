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
mb_internal_encoding("UTF-8");
// загружаем параметры---//

$answ = [
    'successful' => false,
    'message' => 'ERROR:тип запроса не распознан "'.$operation.'"'
] ;
$signal  = new AddSignals() ;
$answ = $signal->getSignals() ;
var_dump($answ) ;
