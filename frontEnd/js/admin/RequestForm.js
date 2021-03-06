/**
 * форма редактирования описателя запроса
 * используется для редактирования структуры запроса
 */
function RequestForm() {
    var ajax ;                //  объект обмена с сервером
    var callStack;                      // стек вызовов
    var logger ;              // сообщения
    var nodeTypes = {};       // типы узлов в смысле jstree
    var typesNames = {};       // имена типов
    var conceptSet = {} ;     // возможные значения узла типа concept
    var treeData = [] ;       // построенное дерево
    var nodeEditForm = new NodeEditForm() ;         // объект-редактирование узла
    var currentTree ;          // текущее дерево
    var autoTreeBuild = false ;    // построение дерева из БД
    var $myTree = $('#mytree') ;
    var $treeSaveBt = $('#treeSave') ;   // кнопка сохранения
    var nodeRootDefaultName = 'requestRoot' ;   // имя по умолчанию корневого узла дерева
    var POCKET_SIZE = 20 ;         // размер пакета (узлов)
    var scrollBackground ;

    /**
     * загрузка описания
     */
    this.init = function() {       // Загрузка описания
        ajax = new AjaxRequest() ;
        callStack = paramSet.callStack ;
        conceptSet = {
            'question_concept' : ['why','where','when'],
            'subject_concept'  : ['user']
        } ;
        typesNames = {       // имена типов
            'question' : 'вопросы - раздел запроса',
            'sub_question' : 'подраздел вопроса',
            'subject'  : 'субъект - раздел запроса',
            'action'   : 'действие - раздел запроса',
            'object'   : 'объект - раздел запроса',
            'sub_object': 'подраздел запроса',
            'concept'  : 'понятие',
            'synonym'  : 'слово, определяющее понятие',
            'function' : 'функция, определяющая понятие'
        };

        nodeTypes = {                       // типы узлов дерева запросов
            '#': {
                'max_children': 1,
                'max_depth': -1,
                'valid_children': ['root']
            },
            'root': {
                'max_children': -1,
                'max_depth': -1,
                'valid_children': ['question', 'subject', 'action', 'object']
            },
            'question': {                       // раздел - ВОПРОС
                'max_children': -1,
                'max_depth': 2,
                'valid_children': ['sub_question','concept']
            },
            'sub_question': {                       // раздел - ВОПРОС
                'max_children': -1,
                'max_depth': 2,
                'valid_children': ['sub_question','concept']
            },
            'subject': {                       // раздел - СУБЪЕКТ - 'user' only
                'max_children': 1,
                'max_depth': 2,
                'valid_children': ['concept']
            },
            'action': {                         // раздел - ДЕЙСТВИЯ
                'max_children': -1,
                'max_depth': 2,
                'valid_children': ['concept']
            },
            'object': {                          // раздел - ОБЪЕКТ ЗАПРОСА
                'max_children': -1,
                'max_depth': -1,
                'valid_children': ['sub_object', 'concept']
            },
            'sub_object': {                       // подраздел - ОБЪЕКТа ЗАПРОСА
                'max_children': -1,
                'max_depth': -1,
                'valid_children': ['sub_object', 'concept']
            },
            'concept': {                          // ПОНЯТИЕ
                'max_children': -1,
                'max_depth': 1,
                'valid_children': ['function','synonym']
            },
            'function' : {                    // функция, определяющая понятие
                'max_children': 0,
                'max_depth': 1,
                'valid_children': []
            } ,
            'synonym': {                          // синонимы - слова, определяющие понятие
                'max_children': 0,
                'max_depth': 1,
                'valid_children': []
            }

        };
        nodeEditForm.init(nodeTypes,typesNames) ;     // форма редактирования узла
        scrollBackground = paramSet.scrollBackground ;
        scrollBackground.init() ;
        var backgroundImg = paramSet.backgroundImage ;
        backgroundImg.init() ;
        var logger = paramSet.logger ;
        logger.init() ;
    };
    /**
     * редактировать описание
     */
    this.requestEdit = function () {
        callStack.pushItem('requestForm',reshow) ;
        $('#addForm').attr('hidden', 'hidden');
           requestTreeInit() ;     // инициализация дерева
           commandSet() ;          // командные кнопки

    };
    /**
     * точка возврата
     */
    var reshow = function() {
        $('#globalResult').attr('hidden','hidden') ;
    } ;
    var  commandSet = function() {
        $treeSaveBt.button() ;
        $treeSaveBt.off('click') ;
        $treeSaveBt.on('click',sendNodePockets) ;
       } ;
    var sendNodePockets = function() {
        var sendPockets = sendPocketsPrepare() ;
        var iMax = sendPockets.length - 1 ;
        for (var i = 0; i <= iMax; i++) {
            var statBeg = (i === 0) ;
            var statEnd = (i === iMax) ;
            requestTreeDownload(i,statBeg,statEnd,sendPockets[i]) ;
        }
    } ;
    /**
     * подготовка пакетов узлов
     */
    var sendPocketsPrepare = function() {
        var treeNodes = nodeEditForm.getTreeNodes() ; // список узлов ведётся в nodeEditForm
        var sendPockets = [] ;
        var iPocket = 0 ;
        var i = POCKET_SIZE + 1 ;
        for (var nodeId in treeNodes) {
            var node = treeNodes[nodeId];
            if (i > POCKET_SIZE) {
                i = 1;
                sendPockets[iPocket] = {};
                var currentPocket = sendPockets[iPocket];
                iPocket++ ;
            }
            currentPocket[nodeId] = node;
            i++;
        }
        return sendPockets ;
    } ;


    /**
     * инициализация дерева
     */
    requestTreeInit = function() {
        $('#mytree').jstree({
            'contextmenu': {
                'show_at_node': false
            },
            'core': {
                'data': [
                ],
                'check_callback': function (operation, node, node_parent, node_position, more) {
                    // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
                    // in case of 'rename_node' node_position is filled with the new node name
                    // повторный вызов выполняется функциями jstree
                    if (node_parent.type == '#') {
                        return true ;
                    }
                    if (operation  ==='create_node') { // проверить допустимость добавления
                        var type = node_parent.type ;
                        var validChildren = nodeTypes[type]['valid_children'] ;
                        var maxDepth  = nodeTypes[type]['max_depth'] ;
                        if (validChildren.length == 0 || maxDepth == 0) {
                            alert('"create_node" is not possible') ;
                            return false ;
                        }
                    }
                    if (['move_node','copy_node','delete_node'].indexOf(operation) >= 0) {// пока не допускаю
                        alert('in construction') ;
                        return false ;
                    }
                    if (node.type === 'root' && ['move_node','copy_node','delete_node'].indexOf(operation) >= 0) {
                        return false ;
                    }
                    if (['move_node'].indexOf(operation) >= 0) {
                        return true ;
                    }
                    if (!nodeEditForm.operationIsComplete()  || autoTreeBuild) {     // операция начата, но не завершена
                        // вызов из jstree
                        return true ;
                    }
                    nodeEditForm.setAttr(operation,node_parent,node) ; // параметры в форму
                    nodeEditForm.edit() ;                              // форма - редактирования узла
                    return false ;

                }

            },
            'types': nodeTypes,
            'plugins': ['contextmenu','types']
    });
        currentTree = $('#mytree').jstree(true) ;

        $('#mytree').on("open_node.jstree", function (e,data) {
            paneHeightChange() ;
        }) ;
        $('#mytree').on("close_node.jstree", function (e,data) {
            paneHeightChange() ;
        }) ;

        nodeEditForm.setCurrentTree(currentTree) ;  //  передать дерево в форму редавктиования узлов
        requestTreeUpload() ;
    } ;
    var paneHeightChange = function() {
       var minHeightPx = $('#treeEditDialog').css('min-height') ;
       var minHeight = minHeightPx.split('px')[0] ;
       var minNodes = 12 ;
       var nodeCount = heightPanelCalculate() ;
       var height = minHeight/minNodes * nodeCount ;
       var realHeight = Math.max(height,minHeight) ;
       $('#treeEditDialog').css('height',realHeight) ;
    } ;
    var heightPanelCalculate = function() {
        var treeNodes = nodeEditForm.getTreeNodes() ;
        var countOpenedNodes = 0 ;
        for (var nodeId in treeNodes) {
            var node = treeNodes[nodeId] ;
            var parentId = node['parent'] ;
            var parentIsOpen = (parentId === '#') ? false : treeNodes[parentId]['state']['opened'] ;
            var parentIsClosed = (parentId === '#') ? false : !treeNodes[parentId]['state']['opened'] ;
            var isOpen = node['state']['opened'] ;
            countOpenedNodes += (!parentIsClosed && (isOpen || parentIsOpen)) ? 1 : 0 ;
        }
        return countOpenedNodes ;
    } ;

    /**
     * Загрузить описание
     */
    var requestTreeUpload = function() {
        var uploadVect = {
            'operation' : 'requestUpload',
            'nodeRoot' : 'requestRoot',
            'nodeType' : 'root',
            'successful' : false,
            'nodes' : []
        } ;

        ajax.setData(uploadVect) ;
        ajax.setRequestFunc(function(answ){
            if (answ['successful'] == true) {
                treeBuild(answ['nodes']);
            }else {
                var message = answ['message'];
                ajax.errorMessage(message) ;
            }
        }) ;
        ajax.go() ;

    } ;

    /**
     * индекс в списке - id в БД.
     * 1. ищем node.type == 'root'
     * 2. обход и создание узлов в дереве запроса currentTree
     * построить дерево по списку узлов
     * @param nodes
     */
    var treeBuild = function(nodes) {
        autoTreeBuild = true ;
        nodeEditForm.setOperationIsComplete(false) ;
        treeData = [] ;
        var node = {} ;
        var nodeRoot = getRoot(nodes) ;
        if (nodeRoot === false ) {        // нет дерева
            nodeRoot = nodeEditForm.newNode() ;
            nodeRoot['text'] = nodeRootDefaultName ;     // имя по умолчанию
            nodeRoot['type'] = 'root';
            nodeRoot['data']['new'] = true;
        }

        nodeRoot = nodeEditForm.addNode('#',nodeRoot) ;
        var dbChildId = nodeRoot['data']['dbChildId'] ;   // список id дочерних узлов
        // запускаем обход дерева
        childNodeAdd(nodeRoot,dbChildId,nodes) ;
        autoTreeBuild = false ;
        nodeEditForm.setOperationIsComplete(true) ;
    } ;

    var childNodeAdd = function(parentNode,dbChildId,nodes) {
        for (var i = 0; i < dbChildId.length; i++) {
            var dbId = dbChildId[i] ;
            var dbNode = nodes[dbId] ;
            var treeNode = nodeEditForm.addNode(parentNode,dbNode) ;
            var currentdbChildId = dbNode['data']['dbChildId'] ;   // список id дочерних узлов
            if (currentdbChildId.length == 0) {             // нет дочерних
                continue ;
            }
            childNodeAdd(treeNode,currentdbChildId,nodes) ;      // рекурсия по дочерним узлам
        }
    } ;
    var getRoot = function(nodes) {
       for (var key in nodes) {
           var node = nodes[key] ;
           if (node['type'] === 'root') {
               return node ;
           }
       }
       return false ;
    } ;
    /**
     * загрузить дерево запроса в БД
     */
    var requestTreeDownload = function(pocketN,pocketBegin,pocketEnd,sendPocket) {
        var downloadVect = {
            'operation' : 'requestDownload',
            'successful' : false,
            'pocketN' : pocketN,
            'pocketBegin' : pocketBegin,
            'pocketEnd' : pocketEnd,
            'nodes' : sendPocket
        } ;
        ajax.setData(downloadVect) ;
        ajax.setRequestFunc(function(answ){       // обработка нормального возврата
            if (answ['successful'] == true) {
                downloadVect['successful'] = true;
                message = answ['message'];
                // загрузка в БД прошла успешно -> убрать флаги 'new' и поставить dbId
                if (answ['pocketEnd'] == true) {     // последний пакет
                    nodeEditForm.clearNewNode(answ['downloadNodes'])
                }
            }else {
                var message = answ['message'];
                ajax.errorMessage(message) ;
            }
        }) ;
        ajax.go() ;
    } ;

}
