/**
 * форма исполнения запроса
 */
function RequestGoForm() {
    var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
    var $textLabel = $('#textGoLabel') ;
    var $requestText = $('#requestText') ;
    var $buttonGo = $('#requestGoBt') ;
    var $treeResult = $('#treeResult') ;
    var resultNodes ;         // список узлов, полученный от разбора запроса
    var currentTreeResult  ;
    var currentRootId ;       // корневой результата

    var _this = this ;
    //-----------------------------//
    this.init = function() {
        $buttonGo.button() ;
        $buttonGo.css('border-radius',20) ;
        $buttonGo.css('position','absolute') ;
        $buttonGo.position({
            my : "right center",
            at : "right-10 top+80",
            of : "#requestGoDialog"
        }) ;
        $buttonGo.on('click',requestGo) ;
        $textLabel.css('position','absolute') ;
        $textLabel.position({
            my : "left top",
            at : "left+10 top+80",
            of : "#requestGoDialog"
        }) ;
        $requestText.css('position','absolute') ;
        $requestText.css('max-width',400) ;
        $requestText.css('max-height',100) ;
        $requestText.position({
            my : "left top",
            at : "left+80 top+60",
            of : "#requestGoDialog"

        }) ;
        $treeResult.css('position','absolute') ;
        $treeResult.position({
            my : "left top",
            at : "left+10 top+170",
            of : "#requestGoDialog"

        }) ;
        treeInit() ;
    } ;
    /**
     * Отправить запрос на выполнение
     */
    var requestGo = function() {    // отправить запрос на исполнение
        $resultNodes = {} ;
        var goVect = {
                'operation' : 'requestGo',
                'nodeRoot' : 'requestRoot',
                'nodeType' : 'root',
                'successful' : false,
                'requestText' : $requestText.val(),
                'nodes' : []
            } ;

            ajaxExecute.postData(goVect, true);
            var tmpTimer = setInterval(function () {
                var answ = ajaxExecute.getRequestResult();
                if (false == answ || undefined == answ) {
                    var mess = 'Нет соединения с БД....' ;

                } else {
                    clearInterval(tmpTimer);
                    if (answ['successful'] == true) {
                        goVect['successful'] = true;

                        resultNodes = answ['result'] ;
                        treeBuild() ;
                    } else {
                        ready = false;
                        message = answ['message'];
                    }
                }
            }, 300);

        } ;
    /**
     * строится дерево вида:
     * root -> question, subject, action, object  - разделы запроса
     * каждый раздел представлен структурой: concepts - список распознанных понятий
     * concepts -> concept1,......
     * concept_i -> path: nod1/nod2/... - путь по дереву - описателю запроса
     *              synonym: слово, по которому распознано понятие
     *              valid: true | false - признак допустимости понятия
     *
     */
    var treeBuild = function() {
        if (currentTreeResult === undefined) {
            treeInit() ;
        }
        var absoluteRootNode = currentTreeResult.get_node("#") ;
        currentRootId = absoluteRootNode['children'][0] ;
        var currentRootNode = currentTreeResult.get_node(currentRootId) ;
        clearTree(currentRootNode) ;                 // чистить старые узлы
        for (var nodeKey in resultNodes) {
            var resultNode = resultNodes[nodeKey] ;
            var concepts = resultNode['concepts'] ;
            var treeNodeId = currentTreeResult.create_node(currentRootNode,nodeKey) ;
            var pNode = currentTreeResult.get_node(treeNodeId) ;
            var conceptsId = currentTreeResult.create_node(pNode,'concepts') ;
            var conceptsNode = currentTreeResult.get_node(conceptsId) ;
            for (var i = 0; i < concepts.length; i++) {
                var concept = concepts[i] ;
                var conceptName = 'concept: '+concept['concept'] ;
                var path = (concept['conceptPath']).toString() ;
                var conceptPath = 'path: '+ path.replace(/,/g,'/') ;
                var synonym = 'synonym: '+concept['synonym'] ;
                var valid = 'valid: '+concept['valid'] ;
                var conceptId = currentTreeResult.create_node(conceptsNode,conceptName) ;
                var conceptNode = currentTreeResult.get_node(conceptId) ;
                currentTreeResult.create_node(conceptNode,conceptPath) ;
                currentTreeResult.create_node(conceptNode,synonym) ;
                currentTreeResult.create_node(conceptNode,valid) ;

            }
        }
    } ;
    /**
     * удаление узлов дерева перед новым заполнением
     * @param currentRootNode
     */
    var clearTree = function(currentRootNode) {
        var children = [] ;
        while ((children = currentRootNode['children_d']).length > 0)
        for (var i = 0 ; i < children.length; i++) {
            var nodeId = children[i] ;
            currentTreeResult.delete_node(nodeId) ;
        }
    } ;
    /**
     * определение дерева
     */
    var treeInit = function() {
        $('#treeResult').jstree({
        'core': {
            'data' : [
                {
                    "text" : "resultRoot",
                    "state" : { "opened" : true }
                }
            ],
            'check_callback': function (operation, node, node_parent, node_position, more) {
                // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
                // in case of 'rename_node' node_position is filled with the new node name
                // повторный вызов выполняется функциями jstree

                return true ;

            }

        }


    });
    currentTreeResult = $('#treeResult').jstree(true) ;      // сохранение ссылки на дерево

    $('#treeResult').on("open_node.jstree", function (e,data) {
        paneHeightChange() ;
    }) ;
    $('#treeResult').on("close_node.jstree", function (e,data) {
        paneHeightChange() ;
    }) ;

} ;
    /**
     * обработка изменения видимой части дерева
     */
    var paneHeightChange = function() {
        var heightOffset = 170;
        var minHeightPx = $('#treeEditDialog').css('min-height');
        var minHeight_0 = minHeightPx.split('px')[0];
        var minHeight = minHeight_0 - heightOffset;
        var minNodes = 10;
        var nodeCount = heightPanelCalculate();
        var height = minHeight / minNodes * nodeCount;
        var realHeight = Math.max(height + heightOffset, minHeight_0);
        $('#requestGoDialog').css('height', realHeight);
    } ;
    var heightPanelCalculate = function() {
        var absoluteRootNode = currentTreeResult.get_node("#");
        currentRootId = absoluteRootNode['children'][0];
        var currentRootNode = currentTreeResult.get_node(currentRootId);
        var children = currentRootNode['children_d'];
        var countOpenedNodes = 0;
        for (var i = 0; i < children.length; i++) {
            var nodeid = children[i];
            var treeNode = currentTreeResult.get_node(nodeid);
            var parentId = treeNode['parent'];
            var treeParentNode = currentTreeResult.get_node(parentId);
            var parentIsOpen = (parentId === '#') ? false : treeParentNode['state']['opened'];
            var parentIsClosed = (parentId === '#') ? false : !treeParentNode['state']['opened'];
            var isOpen = treeNode['state']['opened'];
            countOpenedNodes += (!parentIsClosed && (isOpen || parentIsOpen)) ? 1 : 0;
        }
        return countOpenedNodes;
    } ;
}