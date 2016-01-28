<?php
/**
 * отладка подключения к yndex/search/xlm
 */
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