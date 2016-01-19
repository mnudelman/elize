<?php
/**
 * Загрузить данные в таблицы ru_names,ru_name_synonyms
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';

/////////////////////////////////////////////////////////////////////////////////////////
class RuNameLoad extends Db_base
  {
    private $errors = [] ;           // ошибки операций
    //--------------------------------//
    public function rootNameIsLoad($name) {
        $sql = 'SELECT nameid FROM ru_names
                 WHERE name_text = :name' ;
        $subst = [
            'name' => $name
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
        return (count($rows) == 1) ;
    }
    public function synonymIsLoad($rootName,$synonym) {
        $nameId = $this->getNameId($rootName) ;
        $sql = 'SELECT * FROM ru_name_synonyms
                 WHERE nameid = :nameid AND synonym = :synonym' ;
        $subst = [
            'nameid' => $nameId,
            'synonym' => $synonym
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
        return (count($rows) == 1) ;
   }
    public function rootNameLoad($name) {
       $sql = 'INSERT INTO ru_names (name_text) VALUES (:name)' ;
        $subst = [
            'name' => $name
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
    public function synonymLoad($rootName,$synonym) {
        $nameId = $this->getNameId($rootName) ;
        $sql = 'INSERT INTO ru_name_synonyms (nameid,synonym)
                VALUES (:nameid, :synonym)' ;
        $subst = [
            'nameid' => $nameId,
            'synonym' => $synonym
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
    private function getNameId($name) {
        $sql = 'SELECT nameid FROM ru_names
                 WHERE name_text = :name' ;
        $subst = [
            'name' => $name
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
        if (count($rows) === 1) {
            $row = $rows[0] ;
            return $row['nameid'] ;
        }else {
            return false ;
        }

    }
}
$currentDir = __DIR__ ;
$sourceFile = $currentDir.'/ru_names.txt' ;
$namesLoad = new RuNameLoad() ;
$msg = Message::getInstace() ;
$handle = fopen($sourceFile,"r") ;
if ($handle < 0) {
    $msg->addMessage('ERROR: Ошибка открытия файла: '.$sourceFile) ;
}
fseek($handle,0,0) ;
$count = 0 ;
while (!feof($handle)) {
    $line = fgets($handle, 200);
    $line = trim($line);
    $arr = explode(' > ', $line);
    $synonym = $arr[0];
    $rootName = $arr[1];
    if ($synonym === $rootName) {
        if (!$namesLoad->rootNameIsLoad($rootName)) {
            $namesLoad->rootNameLoad($rootName);
            echo $count++ . "\n";
        }
    }
    if (!$namesLoad->synonymIsLoad($rootName, $synonym)) {
        $namesLoad->synonymLoad($rootName, $synonym);
        echo $count++ . "\n";

    }


}
$messages = $msg->getMessages() ;
var_dump($messages) ;