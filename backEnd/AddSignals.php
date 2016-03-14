<?php
/**
 * класс - Дополнительные сигналы
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
class AddSignals {
     private $dirImages ;
    private $htmlDirImages ;
     private $signalsTypes = [] ;
    private $signals = [] ;
    //--------------------------------//
    private $db ;                     // объект для обращений к БД
    private $msg ;                    // формирование сообщений

    //----------------------------//
    public function __construct() {
        $this->db = new AddSignal_db() ;
        $this->msg = Message::getInstace() ;
        $this->signalsTypes = $this->db->getSignalTypes() ;
        $this->dirImages = TaskStore::$dirProject.'/images' ;
        $this->htmlDirImages = TaskStore::$htmlDirTop.'/images' ;
    }
    public function getSignals() {
        foreach ($this->signalsTypes as $type) {
            $typeName  = $type['type_name'] ;
            $signal = $this->getSignal($typeName) ;
            $signal['typeComment'] = $type['comment'] ;
            $this->signals[$typeName] = $signal ;
        }
        return $this->signals ;
    }
    private function getSignal($type) {
        $dir = $this->dirImages.'/'.$type ;
        if (!is_dir($dir)) {
            return false ;
        }
        $files = scandir($dir) ;
        if (false === $files ) {
            return false ;
        }
        $n = $this->countFiles($files) ;
        if ($n == 0) {
            return false ;
        }
        $i = rand(0,$n -1) ;
        $pictFile = $this->getFile($files,$i) ;
        $signalDb = $this->db->getSignalByFile($pictFile) ;

        return [
            'file' => $this->htmlDirImages.'/'.$type.'/'.$pictFile,
            'name' => $signalDb['name'],
            'rang' => $signalDb['rang'],
            'text' => $signalDb['text'],
        ] ;
    }
    private function countFiles($files) {
        $n = 0 ;
        foreach ($files as $file) {
            if ($file === '.' || $file == '..' || is_dir($file)) {
                continue ;
            }
            $n++ ;
        }
        return $n ;
    }
    private  function getFile($files,$i) {
        $n = 0 ;
        $file_i = false ;
        foreach ($files as $file) {
            if ($file === '.' || $file == '..' || is_dir($file)) {
                continue ;
            }
            if ($n === $i)  {
                $file_i = $file ;
                break ;
            }
            $n++ ;
        }
        return $file_i ;
    }
}