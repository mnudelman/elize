<?php
/**
 * класс, обеспечивающий операции с БД для requestTree - дерева запросов
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
/////////////////////////////////////////////////////////////////////////////////////////
class RequestTree_db  extends Db_base {
    // --------------------------------- //
    private $typeList = [] ;         //  типы узлов - копия таблицы БД node_types
    private $errors = [] ;           // ошибки операций
    private $debug = [] ;            // отладка
    //-----------------------------------//
    public function __construct() {
        parent::__construct() ;
          $this->errors = [] ;
          $this->getTypeList() ;    // возмём сразу из БД   список типов узлов
    }

    /**
     * получить список накопленных ошибок
     * @return array
     */
    public function getErrors() {
        return $this->errors ;
    }
    public function getDebug() {
        return $this->debug ;
    }
    /**
     * выбрать справочникТиповУзлов в $this->typeList
     */
    private function getTypeList() {
        //$sql = 'SELECT typeid,type_name FROM node_types' ;
        $sql = 'SELECT * FROM node_types' ;
        $subst = [] ;
        $rows = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $rows) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        foreach ($rows as $row) {
            $this->typeList[$row['typeid']] = $row['type_name'];

        }
    }
    /**
     * Изменить атрибуты узла
     * @param $recNode
     */
    public function updateNode($recNode) {
        $typeid = $this->getTypeId($recNode['node_type']) ;
        $sql = 'UPDATE request_tree SET
                node_name = :nodeName, parentid = :parentid, typeid = :typeid,
                node_valid = :nodeValid, node_default = :nodeDefault,
                comment = :comment
                WHERE request_tree.nodeid = :nodeid ' ;
        $subst =[
            'nodeid' => $recNode['nodeid'],
            'nodeName' => $recNode['node_name'],
            'parentid' => $recNode['parentid'],
            'typeid' => $typeid,
            'nodeValid' => $recNode['node_valid'],
            'nodeDefault'=> $recNode['node_default'],
            'comment'  => $recNode['comment']
        ] ;
        $result = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $result) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages() ] ;
            return false ;
        }
        $this->debug[] = [
            'method' => 'updateNode',
            'sql' => $sql,
            'subst'=> $subst
        ] ;
        return $result ;
    }
    /**
     * Получить узел по идентификатору
     * @param $nodeid - поле $FIELD_NODEID
     */
    public function getNodeById($nodeid) {
        $sql = 'SELECT request_tree.*,node_types.type_name as node_type
                FROM request_tree,node_types
                WHERE request_tree.nodeid = :nodeid AND request_tree.typeid = node_types.typeid' ;
        $subst = ['nodeid' => $nodeid] ;
        $rows = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $rows) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages() ] ;
            return false ;
        }
        return $rows[0]  ;
    }

    /**
     * удалить запись из БД
     * @param $recNode
     */
    public function delNode($nodeid) {
        $sql = 'DELETE
                FROM request_tree
                WHERE request_tree.nodeid = :nodeid' ;
        $subst = [] ;
        $result = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $result) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        return true ;
    }

    /** добавить запись в БД
     * @param $recNode
     */
    public function addNode($recNode) {
        $sql = 'INSERT INTO request_tree
                (node_name,typeid,node_valid,node_default,comment) VALUES
                (:node_name, :typeid, :node_valid, :node_default, :comment)' ;
        $typeid = $this->getTypeId($recNode['node_type']) ;
        $subst = [
            'node_name' => $recNode['node_name'],
            'typeid' => $typeid,
            'node_valid' => $recNode['node_valid'],
            'node_default' => $recNode['node_default'],
            'comment' =>   $recNode['comment'],
        ] ;
        $result = $this->sqlExecute($sql, $subst, __METHOD__);
        $txt = __METHOD__ . 'result = '.$result ;
        $this->msg->addMessage($txt) ;
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

    /**
     * определяет typeid по имени  typeName
     * @param $tpName
     * @return mixed
     */
    private function getTypeId($tpName) {
        return array_search($tpName,$this->typeList) ;

    }

    /**
     * получить дочерние элементы
     * @param $parentDbId
     * @return array
     */
    public function getChildNodes($parentDbId) {
        $sql = 'SELECT request_tree.*,node_types.type_name as node_type
                FROM request_tree,node_types
                WHERE request_tree.parentid = :parentid AND request_tree.typeid = node_types.typeid' ;
        $subst = ['parentid' => $parentDbId] ;
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

    /**
     * получить корневой узел дерева
     * @param $rootName
     * @param string $rootType
     * @return array
     */
    public function getRootByName($rootName,$rootType='root') {
        $sql = 'SELECT request_tree.*,node_types.type_name as node_type
                FROM request_tree,node_types
                WHERE request_tree.node_name = :nodeName
                      AND request_tree.typeid = node_types.typeid
                      AND node_types.type_name = :typeName' ;
        $subst = [
            'nodeName' => $rootName,
            'typeName' => $rootType] ;
        $rows = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $rows) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        return $rows[0] ;

    }
}