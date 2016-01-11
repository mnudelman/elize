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
    case 'requestUpload' : {                // получить узды дерева
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
//                'sessionData' => $sendPocket,
//                'result' => $result
            ] ;
        }


        break ;
    }
    case 'requestGo' : {
        break ;
    }
    default : {    // весь $_GET отправиить обратно

    }
}

echo json_encode($answ) ;