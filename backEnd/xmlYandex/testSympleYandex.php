<?php
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
setlocale(LC_ALL,"ru_RU.UTF-8") ;
mb_internal_encoding("UTF-8");
//--------------------------------------//
include_once __DIR__.'/local.php' ;
$taskPar = TaskParameters::getInstance() ;
$taskPar->setParameter('query','оренбург') ;
$mp = new SympleYandex() ;
$mp->setQuery('оренбург') ;
$mp->queryGo() ;
$result = $mp->getResult() ;
//$passages = $rrSimple['passages'] ;
//$passage = $passages[0] ;
//$pass = Yandex::highlight($passage) ;
var_dump($result) ;
echo json_encode($result) ;