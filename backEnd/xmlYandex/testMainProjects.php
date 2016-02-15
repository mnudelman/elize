<?php
/**
 * проверка  MainProjects
 */
include_once __DIR__.'/local.php' ;
$taskPar = TaskParameters::getInstance() ;
$taskPar->setParameter('query','оренбург') ;
$mp = new MainProjects() ;
$mp->setQuery('стоимость') ;
$mp->queryGo() ;
$result = $mp->getResult() ;




//$passages = $rrSimple['passages'] ;
//$passage = $passages[0] ;
//$pass = Yandex::highlight($passage) ;
var_dump($result) ;
echo json_encode($result) ;