<?php
session_start() ;
/**
 * контроллер обращения к БД
 */
?>
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
setlocale(LC_ALL,"ru_RU.UTF-8") ;
mb_internal_encoding("UTF-8");
include_once __DIR__ . '/local.php';
// загружаем параметры---//
$taskPar = TaskParameters::getInstance() ;
$taskPar->setParameters($_GET,$_POST) ;
$operation = $taskPar->getParameter('operation')  ;
$requestTree = new RequestTree() ;
$answ = [
    'successful' => false,
    'message' => 'ERROR:тип запроса не распознан "'.$operation.'"'
] ;

switch($operation) {
    case 'requestUpload' : {                // получить узлы дерева
        $nodeRootName = $taskPar->getParameter('nodeRoot') ;
        $requestTree->setNodeRoot($nodeRootName) ;      // имя корня
        $answ = $requestTree->uploadTree() ;
        break ;
    }
    case 'requestDownload' : {             // загрузить дерево в БД
        $pocketN =  $taskPar->getParameter('pocketN')  ;
        $nodes = $taskPar->getParameter('nodes')  ;     // узлы для загрузки
        $pocketBegin= $taskPar->getParameter('pocketBegin')  ;
        $pocketBegin = ($pocketBegin === 'true') ? true : false ;
        $pocketEnd= $taskPar->getParameter('pocketEnd')  ;
        $pocketEnd = ($pocketEnd === 'true') ? true : false ;
        if ($pocketBegin) {
            $_SESSION['sendPocket'] = [] ;
        }
        $sendPocket = $_SESSION['sendPocket'] ;
        $sendPocket[] = $nodes ;
        $_SESSION['sendPocket'] = $sendPocket;
        $result = [] ;
        if ($pocketEnd) {
            for ($i = 0; $i < sizeof($sendPocket); $i++) {
                $result = array_merge($result,$sendPocket[$i]) ;
            }
            $answ = $requestTree->downloadTree($result) ;
            $answ['pocketEnd'] = true ;
        }else {
            $answ = ['pocketN' => $pocketN,
                'pocketBegin'=> $pocketBegin,
                'pocketEnd' => $pocketEnd,
            ] ;
        }
        break ;
    }
    case 'requestGo' : {                                  // тип запроса
        $phrase = $taskPar->getParameter('requestText')  ;  // 1 шаг - разбор
        $rootName = $taskPar->getParameter('nodeRoot')  ;
        $reqGo = new RequestGo($rootName) ;
        $nodes = $reqGo->getRequestTree() ;
        $reqGo->parseDo($phrase) ;
        $answ = $reqGo->getResult() ;
        //-----------------------------------
        $requestResult = $answ['result'] ;               // 2 шаг - определить тип
        $rType = new RequestType() ;
        $rType->init() ;
        $rType->setResultRequest($requestResult) ;
        $rType->typeRulesClc() ;
        $answ['requestTypes'] = $rType->getRequestTypes() ;
        break ;
    }
    case 'yandex' : {                              // запрос к информ системе yandex
        $query = $taskPar->getParameter('query') ;
        $page = $taskPar->getParameter('page') ;
        $yandex = new YandexController() ;
        $yandex->setQuery($query) ;
        $yandex->setPage($page) ;
        $yandex->queryGo() ;

        $answ = $yandex->getResultsForShow() ;
        break ;
    }
    case 'mainProjects' : {                             // запрос к основным проектам
        $query = $taskPar->getParameter('query') ;
        $cityId = $taskPar->getParameter('cityId') ;
        $cityName = $taskPar->getParameter('cityName') ;
        $regionId = $taskPar->getParameter('regionId') ;
       $mp = new MainProjects() ;
        $mp->setQuery($query) ;
        $mp->setCity($cityId,$cityName,$regionId) ;
        $mp->projectsGo() ;
        $answ = $mp->getResult() ;
        break ;
    }
    case 'getAddSignals' : {        // дполнительные сигналы
        $signal  = new AddSignals() ;
        $result = $signal->getSignals() ;
        $answ = [
            'successful' => true,
            'result' => $result
        ] ;
        break ;
    }
    case 'getThoughts' : {        // мысли
        $thoughts  = new Thoughts() ;
        $result = $thoughts->getThoughts() ;
        $answ = [
            'successful' => true,
            'result' => $result
        ] ;
        break ;
    }
    case 'geoLocation' : {              // определить город по широте, долготе
        $geo = new GeoLocation() ;
        $lat = $taskPar->getParameter('lat') ;
        $long = $taskPar->getParameter('long') ;
        $geo->selectCity($lat,$long) ;
        $answ = $geo->getResult() ;
        break ;
    }

    default : {    // весь $_GET отправиить обратно

    }
}
    echo json_encode($answ) ;

