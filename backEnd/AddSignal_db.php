<?php
/**
 * класс поддерживающий операции с БД для AddSignal - дополнительные сигналы
 */

session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
/////////////////////////////////////////////////////////////////////////////////////////
class AddSignal_db  extends Db_base
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
     * получить список накопленных ошибок
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
    public function getSignalTypes() {
        $sql = 'SELECT typeid,type_name,comment  FROM add_signals_types' ;
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
    public function getSignalByFile($file) {
        $sql = 'SELECT typeid,name,rang,text  FROM add_signals
                 WHERE file_name = :file' ;
        $subst = [
            'file' => $file
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
            'id' => $row['id'],
            'typeid' => $row['typeid'],
            'name' => $row['name'],
            'text' => $row['text'],
            'rang' => $row['rang'],
            'file' => $file
        ];


    }
}