<?php
/**
 * Класс, обслуживающий дерево запроса
 * индекс массива $uploadNodes - это request_tree.nodeid - т.е. это ид БД
 * Элементы $uploadNodes - это наборы данных для построения дерева запроса
 * индекс массива $downloadNodes - это treeId - идентификатор, полученный при построении дерева
 * сами элементы  $downloadNodes - это узлы, полученные при построении дерева
 *         node = [ 'id' => <nodeId>,
 *                  'type' => <nodeTyp>,
 *                  'child' => [id дочерних элементов,....],
 *                   'parent' => <id зщдительского узла>,
 *                   'parents' => [все родитнльские узлы вплоть до корня],
 *                  'text' => <nodeName>,
 *                  'data' => ['dbId' => <request_tree.nodeid>,
 *                             'parentDbId =>  <request_tree.parentid>,
 *                             'new' => <true для нового узла>,
 *                             'delete'  => <true для удалённог узла>,
 *                             'rename' => <true для изменённого имени>
 *                             'move'   => <true при смене родительского узла>
 *                             'dbChildId' => [список dbId дочерних элементов]
 *                   ]
 *                ]
 * для uploadNode в 'data' добавлено поле 'dbChildId' => [request_tree.nodeid,...] для дочерних элементов
 * два метода для обмена с БД:
 * 1. uploadTree() - читает дерево запроса из БД
 * 2. downloadTree() - помещает  дерево запроса в БД
 * метод setRootNode - задаёт корневой узел дерева( по умолчанию корневой узел имеет имя 'requestRoot')
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';

class RequestTree
{
    private $uploadNodes = [];       // массив узлов для выгрузки из БД
    private $downloadNodes = [];     // массив узлов для загрузки в БД
    private $rootNodeName = 'requestRoot' ;    // имя корневого узла
    private $dbRootNode ;
    //--------------------------------//
    private $db ;                     // объект для обращений к БД
    private $msg ;                    // формирование сообщений

    //----------------------------//
    public function __construct() {
        $this->db= new RequestTree_db() ;
        $this->msg = Message::getInstace() ;
    }
    /**
     *    Создать пустой узел
     */
    private function createNode()
    {
        return [
            'id' => true,
            'type' => true,
            'children' => [],
            'parent' => false,
            'parents' => [],
            'text' => 'newName',
            'data' => [
                'comment' => '',
                'dbId' => false,
                'parentDbId' => false,
                'new' => false,
                'delete' => false,
                'rename' => false,
                'move' => false,
                'dbChildId' => [],
                'valid' => true,
                'default' => false
            ]
        ];
    }
    public function setNodeRoot($nodeName) {
        $this->rootNodeName = $nodeName ;
    }


    /**
     * подготовка массива $uploadNodes для передачи во frontEnd обработку
     */
    public function uploadTree() {

        $dbRecNode = $this->db->getRootByName($this->rootNodeName,'root');
        $dbId = $dbRecNode['nodeid'] ;
        $this->dbRootNode = $this->createUploadNode($dbRecNode) ;
        $this->uploadChild($dbRecNode) ;
        // ошибки обмена с БД
        $errors = $this->db->getErrors() ;
        $successful = (sizeof($errors) === 0);
        return [
            'successful' => $successful,
            'errors' => $errors,
            'nodes' => $this->uploadNodes
        ] ;
    }
    private function uploadChild($dbRecParentNode) {
        $parentDbId = $dbRecParentNode['nodeid'] ;
        $dbRecChileNodes = $this->db->getChildNodes($parentDbId) ;
        $parentNode = $this->createUploadNode($dbRecParentNode) ;
    //    $this->uploadNodes[$parentDbId] = $parentNode ;
        foreach ($dbRecChileNodes as $recId => $recChildNode) {
            $recChildId = $recChildNode['nodeid'] ;
            $ind = sizeof($parentNode['data']['dbChildId']) ;
            $parentNode['data']['dbChildId'][$ind] = $recChildId ;
            $this->uploadChild($recChildNode) ;                  // рекурсия по дочерним элементам
        }
        $this->uploadNodes[$parentDbId] = $parentNode ;      // сохранить обновления в списке
    }

    /**
     * @param $recNode - запись из БД
     * @return $uploadNode  - сформированный узел;
     */
    private function createUploadNode($recNode) {
        $uploadNode = $this->createNode() ;
        $uploadNode['text'] = $recNode['node_name'] ;
        $uploadNode['type'] = $recNode['node_type'] ;
        $uploadNode['data']['dbId'] = $recNode['nodeid'] ;
        $uploadNode['data']['parentDbId'] = $recNode['parentid'] ;
        $uploadNode['data']['comment'] = $recNode['comment'] ;
        return $uploadNode ;

    }

    /**
     * Загрузка узлов в БД
     * 1. новые узлы
     * 2. удалённые узлы
     * 3. Обновление ссылок
     * @param $dlNodes - массив узлов дерева для загрузки в БД
     */
    public function downloadTree($dlNodes) {
        $this->downloadNodes = $dlNodes ;
        $this->addNewNodes() ;              // добавить новые узлы
//        $this->deleteNodes() ;              // убрать удалённые
        $this->updateNodes() ;              // внести изменения
        // ошибки обмена с БД
        $errors = $this->db->getErrors() ;
        $debug =  $this->db->getDebug() ;
        $successful = (sizeof($errors) === 0);
        $messages = $this->msg->getMessages() ;
        return [
            'successful' => $successful,
            'errors' => $errors,
            'debug' => $debug,
            'downloadNodes' => $this->downloadNodes,
            'messages' => $messages,
            'dlNodes' => $dlNodes
        ] ;

    }

    /**
     * Добавить новые узлы - признак нового - node['data'['new'] === true
     */
    private function addNewNodes() {
        foreach ($this->downloadNodes as $treeNodeId => $treeNode) {
            if ($treeNode['data']['new'] === "true") {
                $recNode = $this->createRecNode($treeNode) ;
                $dbId = $this->db->addNode($recNode) ;
                $treeNode['data']['dbId'] = $dbId ;
                $this->downloadNodes[$treeNodeId] = $treeNode ;

            }
        }
    }

    /**
     * Удалить отмеченные узлы. призна удаления node['data']['delete'] === true
     * удаляется отмеченный элемент и все его дочерние
     */
    private function deleteNodes() {
        $storeDeleteNodes = [] ;       // память удалённых узлов
        foreach ($this->downloadNodes as $treeNodeId => $treeNode) {
            if (array_search($treeNodeId, $storeDeleteNodes) !== false) {   // узел уже удалён
                continue ;
            }
            if ($treeNode['data']['delete'] === "true") {
                $this->deleteFromDb($treeNode,$storeDeleteNodes) ;
            }
        }
    }

    /**
     * исполнитель удаления узла и всех его дочерних
     * дочерние удаляются независимо от того отмечены они 'delete' или нет
     * @param $treeNode
     * @param $storeDeleteNodes -  список удалённых узлов позволяет избежать повторных проходов по дереву
     */
    private function deleteFromDb($treeNode,$storeDeleteNodes) {
        $storeDeleteNodes[] = $treeNode ;     // запомнить удалёённый узел, чтобы избежать повторных проходов
        $recNode = $this->createRecNode($treeNode) ;
        $this->db->delNode($recNode) ;
        $childNodes = $treeNode['children'] ;    // список treeId дочерних
        if (sizeof($childNodes) == 0) {
            return true ;
        }
        foreach ($childNodes as $key => $childNodeId) {
            $childTreeNode = $this->downloadNodes[$childNodeId] ;
            $childTreeNode['data']['delete'] = true ;
            $this->deleteFromDb($childTreeNode,$storeDeleteNodes) ;         // рекурсивное удаление дочерних элементов
        }

    }

    /**
     * проход по всем узлам дерева и сравнение с хранимой информацией по узлу
     * если в значениях атрибутов есть отличие, то обновление
     */
    private function updateNodes() {
        foreach ($this->downloadNodes as $treeNodeId => $treeNode) {
            if ($treeNode['data']['delete'] === 'true') {      // удалённых уже нет в БД (!)
                continue ;
            }
            $dbId = $treeNode['data']['dbId'] ;
            $dbRecNode = $this->db->getNodeById($dbId) ;

            $parentTreeId = $treeNode['parent'] ;

            if ($parentTreeId !== '#') {
                $parentTreeNode = $this->downloadNodes[$parentTreeId] ;
                $parentTreeDbId = $parentTreeNode['data']['dbId'] ;
                $treeNode['data']['parentDbId'] = $parentTreeDbId ;
            } else {
                $treeNode['data']['parentDbId'] = 0 ;
            }
            $this->downloadNodes[$treeNodeId] = $treeNode ;     // сохранить изменения в  $treeNode
            if ($this->notEqualNodes($treeNode,$dbRecNode)) {      // обновить запись БД
                $newRecNode = $this->createRecNode($treeNode) ;
                $this->db->updateNode($newRecNode) ;
            }

        }
    }

    /**
     * проверяет соответствие узлаДерева и узла в БД
     * @param $treeNode    - узел дерева
     * @param $dbRecNode   - поля записи
     * @return bool       - true при несовпадении
     */
    private function notEqualNodes($treeNode,$recNode) {
        $comment = (is_null($recNode['comment'])) ? '' : $recNode['comment'] ;
        $equalFlag = (
        $treeNode['text'] === $recNode['node_name'] &&
        $treeNode['type'] === $recNode['node_type'] &&
        $treeNode['data']['dbId'] === $recNode['nodeid'] &&
        $treeNode['data']['parentDbId'] === $recNode['parentid'] &&
        $treeNode['data']['comment'] === $comment
        );
        return !$equalFlag ;
    }

    /**
     * операция преобразования узлаДерева в массив полей БД
     * операция обратная  createUploadNode
     * @param $treeNode
     */
    private function createRecNode($treeNode) {
        $valid = ($treeNode['data']['valid'] === 'true') ? true : false ;
        $default = ($treeNode['data']['default'] === 'true') ? true : false ;
        return [
            'nodeid' => $treeNode['data']['dbId'],
            'parentid' => $treeNode['data']['parentDbId'],
            'node_name' => $treeNode['text'],
            'node_type' => $treeNode['type'],
            'node_valid' => $valid,
            'node_default' => $default,
            'comment' =>  $treeNode['data']['comment'],
         ] ;
    }
}