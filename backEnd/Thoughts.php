<?php
/**
 * Выбрать из БД список мыслей
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
class Thoughts {
    private $thoughts = [] ;
    //--------------------------------//
    private $db ;                     // объект для обращений к БД
    private $msg ;                    // формирование сообщений

    //----------------------------//
    public function __construct() {
        $this->db = new Thoughts_db() ;
        $this->msg = Message::getInstace() ;
    }
    public function getThoughts() {
        $this->thoughts = $this->db->getThoughts() ;
        return  $this->thoughts ;

    }

}