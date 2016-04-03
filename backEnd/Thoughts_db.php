<?php
/**
 * класс поддерживающий операции с БД для thoughts */

session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
/////////////////////////////////////////////////////////////////////////////////////////
class Thoughts_db  extends Db_base
{
    // --------------------------------- //
    private $errors = [];           // ошибки операций
    private $debug = [];            // отладка

    //-----------------------------------//
    public function __construct()
    {
        parent::__construct();
        $this->errors = [];
    }

    /**
     * получить список мыслей
     * @return array
     */
    public function getErrors()
    {
        return $this->errors;
    }

    public function getDebug()
    {
        return $this->debug;
    }
    public function getThoughts() {
        $sql = 'SELECT text  FROM thoughts' ;
        $subst = [
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

        return $rows ;

    }
}