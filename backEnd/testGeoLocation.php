<?php
session_start() ;
/**
 *  отладка класса GeoLocation -
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
$geo = new GeoLocation() ;
$lat = -1 ; // 51.7727 ;   //                    $taskPar->getParameter('lat') ;
$long = -1 ; // 55.0988 ;
$geo->selectCity($lat,$long) ;
$answ = $geo->getResult() ;
var_dump($answ) ;
