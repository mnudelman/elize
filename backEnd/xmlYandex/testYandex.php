<?php
/**
 * отладка подключения к yndex/search/xlm
 */
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
setlocale(LC_ALL,"ru_RU.UTF-8") ;
mb_internal_encoding("UTF-8");

include_once __DIR__.'/yandexConfig.php' ;
include_once __DIR__.'/local.php' ;
$taskPar = TaskParameters::getInstance() ;
$taskPar->setParameter('query','оренбург') ;
$yandex = new YandexController() ;
$yandex->setQuery('оренбург') ;
$yandex->setPage(1) ;
$yandex->queryGo() ;
$error = $yandex->getError() ;
$result = $yandex->getResultsForShow() ;




//$passages = $rrSimple['passages'] ;
//$passage = $passages[0] ;
//$pass = Yandex::highlight($passage) ;
var_dump($result) ;