<?php
session_start() ;
/**
 * по $_GET определяет передачу управления
 *  параметр: typ имя программы-исполнителя запроса
 */
?>
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
mb_internal_encoding("UTF-8");
// загружаем параметры---//
$taskPar = TaskParameters::getInstance() ;
$taskPar->setParameters($_GET,$_POST) ;
$operation = $taskPar->getParameter('operation')  ;
$requestTree = new RequestTree() ;
$answ = [
    'successful' => false,
    'message' => 'ERROR:тип запроса не распознан "'.$operation.'"'
] ;
//$phrase = 'я хочу купить холодильник цена' ;
//$phrase ='Хочу
// купить     холодильник-стиральную машину..... !- , ???  ' ;
//$phrase = 'я хочу купить стиральную машину цена' ;
//$phrase = 'мне хотелось бы ознакомиться с ценами на компьютеры в челябинске' ;
//$phrase = 'срочно нужен мастер по ремонту телевизоров в городе Сочи' ;
//$phrase = 'нужен мастер-сантехник в москве срочно !!!!' ;
//$phrase = 'Где купить телевизор?' ;
//$phrase = 'почему я хочу купить холодильник по низкой цене в оренбурге' ;
$phrase = 'помогите стать миллионером' ;

$reqGo = new RequestGo('requestRoot') ;
$reqGo->parseDo($phrase) ;
$answ = $reqGo->getResult() ;

//----------------------------------///
$requestResult = $answ['result'] ;
$rType = new RequestType() ;
$rType->init() ;
$rType->setResultRequest($requestResult) ;
$rType->typeRulesClc() ;
//var_dump($answ) ;
