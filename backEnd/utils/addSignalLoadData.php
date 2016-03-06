<?php
/**
 * Загрузить данные в таблицы add_signals
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';

/////////////////////////////////////////////////////////////////////////////////////////
class AddSignalLoad extends Db_base
{
    public function getSignalTypeByComment($comment)
    {
        $sql = 'SELECT typeid,type_name FROM add_signals_types
                 WHERE comment = :comment' ;
        $subst = [
            'comment' => $comment
        ] ;
        $rows = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $rows) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        $row = $rows[0] ;
        return [
            'typeid' => $row['typeid'],
            'name' => $row['type_name'],
            'comment' => $comment,
        ];

    }
    public function putSignal($currentSignal) {
        $sql = 'INSERT INTO add_signals (typeid, file_name,name,rang, text)
                                 VALUES (:typeid, :fileName, :name, :rang, :text)' ;
        $subst = [
            'typeid' => $currentSignal['typeid'],
            'fileName' => $currentSignal['file'],
            'name' => $currentSignal['name'],
            'rang' => $currentSignal['rang'],
            'text' => $currentSignal['text'],
        ] ;
        $result = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $result) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        return $result ;

    }
}
$currentDir = __DIR__ ;
$sourceFile = $currentDir.'/addSignals.csv' ;
$signalsLoad = new AddSignalLoad() ;
$msg = Message::getInstace() ;

function load($signalLoad,$type,$signal) {
//    echo $signal['id'].'------'.
//        $type['comment'].'-----'.
//        $signal['name'].'-----'.
//        $signal['file'].'-----'.
//        mb_substr($signal['text'],0,50).'-----'.
//        mb_strlen($signal['text']).
//        '<br>'
//    ;
    $signal['typeid'] = $type['typeid'] ;
    $sign = rand(0,1) ;
    $sign = ($sign > 0) ? 1 : -1 ;
    $signal['rang'] = rand(0,100) * $sign ;
    $signalLoad->putSignal($signal) ;
}



$handle = fopen($sourceFile,"r") ;
if ($handle < 0) {
    $msg->addMessage('ERROR: Ошибка открытия файла: '.$sourceFile) ;
}
fseek($handle,0,0) ;
$count = 0 ;
$currentType = [
    'typeid' => 0 ,
    'name' => '',
    'comment' => ''] ;
$KEY_TYPE = 'Тема - ' ;
$currentSignal = [
    'id' => 0,
    'typeid' => '',
    'name' => '',
    'file' => '',
    'rang' => 0,
    'text' => ''
] ;
$signalLine = 0 ;             // 1 - имя 2 - текст 3 - файл
$iTot = 0  ;
while (!feof($handle)) {
    $line = fgets($handle, 3000);
    $line = trim($line);
    $arr = explode(';', $line);
    if (isset($arr[2]) && strpos($arr[2],$KEY_TYPE) === 0 ) {
        $currentType['comment'] = str_replace($KEY_TYPE,'',$arr[2]) ;
        $res = $signalsLoad->getSignalTypeByComment($currentType['comment']) ;
        if (false === $res) {

        }else {
            $currentType['typeid'] = $res['typeid'] ;
            $currentType['name'] = $res['name'] ;
        }
        $signalLine = 0 ;
        continue ;
    }
    switch (++$signalLine) {
        case 1 : {      // имя сигнала
            if (isset($arr[3])) {
                $currentSignal['id'] = $arr[1] ;
                $currentSignal['file'] = $arr[3] ;
                $arr1 = explode('–',$arr[2]) ;
                $currentSignal['name'] = $arr1[0] ;
                $text = $arr1[1] ;
                for ($i = 2; $i < count($arr1); $i++) {
                    $text .= ' – '.$arr1[$i] ;
                }

                $currentSignal['text'] = $text ;
                // могут быть и др строки

                $iTot++  ;
                load($signalsLoad,$currentType,$currentSignal) ;
                $signalLine = 0 ;
            }else {
                if (isset($arr[2]) && strpos($arr[2], '"') == 0) {
                    $currentSignal['id'] = $arr[1];
                    $currentSignal['name'] = str_replace('"', '', $arr[2]);
                }
            }
            break ;
        }
        case 2 : {
            $arr = explode(';', $line);
            if (isset($arr[1])) {    // 2 случай - 2 строки
                $currentSignal['text'] = $arr[0] ;
                $currentSignal['file'] = $arr[1] ;
                $signalLine = 0 ;
                $iTot++  ;
                load($signalsLoad,$currentType,$currentSignal) ;
            }else {
            $currentSignal['text'] = $line ;
            }
            break ;

        }
        case 3 : {
            if(isset($arr[1]) && $arr[0] === '"' ) {
                $currentSignal['file'] = $arr[1] ;
                $currentSignal['typeid'] = $currentType['typeid'] ;
                $iTot++  ;
                load($signalsLoad,$currentType,$currentSignal) ;
            }
            $signalLine = 0 ;
            break ;
        }
        default : {

        }
    }

}
echo 'iTot = '.$iTot ;
$messages = $msg->getMessages() ;
var_dump($messages) ;