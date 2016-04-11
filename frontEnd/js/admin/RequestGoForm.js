/**
 * форма исполнения запроса - часть редактирования описания запроса
 * используется при запуске администратором.
 * Запросы выполняются через объект requestGo
 */
function RequestGoForm() {
//    var ajaxExecute = paramSet.ajaxExecute;    // объект обмена с БД
    var ajax = new AjaxRequest() ;
    var $textLabel = $('#textGoLabel') ;
    var $requestText = $('#requestText') ;
    var $buttonGo = $('#requestGoBt') ;          // запуск определения типа
    var $buttonDebugEmpty = $('#debugEmptyBt') ;   // чистить область сообщений отладки
    var $treeResult = $('#treeResult') ;         // дерево  - результат определелния типа
    var $requestTypesPane = $('#requestTypes') ;  // панель вывода типов запроса
    var requestTypes ;                          // список типов - результат определения типа
    var resultNodes ;         // список узлов, полученный от разбора запроса
    var currentTreeResult  ;
    var currentRootId ;       // корневой результата
    var noActionStepsFlag = true ;  // выполнять без механизма actionSteps
    var scrollBackground= paramSet.scrollBackground ;
    var backgroundImg ;
    var requestGo ;           // объект RequestGo
    var _this = this ;
    //-----------------------------//
    this.init = function() {
        $buttonGo.button() ;
        $buttonGo.css('border-radius',20) ;
        $buttonGo.css('position','absolute') ;
        $buttonGo.position({
            my : "right center",
            at : "left+500 top+80",
            of : "#requestGoDialog"
        }) ;
        $buttonGo.on('click',requestTypeGo) ;


        //$buttonDebugEmpty.button() ;
        //$buttonDebugEmpty.css('border-radius',20) ;
        //$buttonDebugEmpty.css('position','absolute') ;
        //$buttonDebugEmpty.position({
        //    my : "right center",
        //    at : "left+500 top+120",
        //    of : "#requestGoDialog"
        //}) ;
        //$buttonDebugEmpty.on('click',function() {
        //    $('#dbError').empty() ;
        //    $('#resultBlockPhilosophy').empty() ;
        //    $('#centralCircle').empty() ;
        //}) ;




        $textLabel.css('position','absolute') ;
        $textLabel.position({
            my : "left top",
            at : "left+10 top+80",
            of : "#requestGoDialog"
        }) ;
        $requestText.css('position','absolute') ;
        $requestText.css('max-width',400) ;
        $requestText.css('max-height',100) ;
        $requestText.css('height',100) ;
        $requestText.position({
            my : "left top",
            at : "left+80 top+60",
            of : "#requestGoDialog"

        }) ;
        $requestTypesPane.css('position','absolute') ;
        $requestTypesPane.position({
            my : "left top",
            at : "left+10 top+170",
            of : "#requestGoDialog"

        }) ;
        $treeResult.css('position','absolute') ;
        $treeResult.position({
            my : "left top",
            at : "left+10 top+310",
            of : "#requestGoDialog"

        }) ;
        _this.buttonInit() ;
        treeInit() ;
        scrollBackground= paramSet.scrollBackground ;   // нужно потом для конкретных запросов
        scrollBackground.init() ;
        backgroundImg = paramSet.backgroundImage ;
        requestGo = paramSet.requestGo ;
        var philosophyForm = paramSet.philosophyForm ;
        philosophyForm.init() ;

    } ;
    this.buttonInit = function() {
        $('#searchSystemBt').on('click',function() {
            requestExe('searchSystem');
        }) ;
        $('#mainProjectsBt').on('click',function() {
            requestExe('mainProjects');
        }) ;
        $('#philosophyBt').on('click',function() {
            requestExe('philosophy');
        }) ;
        $('#searchSystemBt').button() ;
        $('#mainProjectsBt').button() ;
        $('#philosophyBt').button() ;

    } ;
    var requestExe = function(requestType) {
        requestTypeShow() ;
        $('#resultBlockPhilosophy').empty() ;
        $('#centralCircle').empty() ;
        $('#stamp').empty() ;
        $('#globalResult').removeAttr('hidden') ;
        backgroundImg.setCurrentSize() ;   // соответствие с тек размером экрана
        switch (requestType) {
            case 'searchSystem' :
                requestGo.searchSystemGo(noActionStepsFlag) ;
                break ;
            case 'mainProjects' :
                requestGo.mainProjectsGo(noActionStepsFlag) ;
                break ;
            case 'philosophy' :
                requestGo.philosophyGo(noActionStepsFlag) ;
                break ;

        }
    } ;
    var requestTypeGo = function() {
        resultNodes = {} ;
        requestGo.setRequestText($requestText.val());
        var auto = false;                  // отмена автоматического запуска запроса
        requestGo.requestExecute(auto,function(){
            resultNodes = requestGo.getResultNodes() ;
            requestTypes = requestGo.getRequestTypes() ;
            treeBuild() ;
            requestTypeShow() ;  // таблица типов
        }, noActionStepsFlag);
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
            var treeNodeId = currentTreeResult.create_node(currentRootNode,nodeKey) ; // разделы запроса
            for (var i = 0; i < resultNode.length; i++) {
                var concept = resultNode[i] ;      //    concepts[i] ;
                var conceptName = 'concept: '+concept['concept'] ;
                var path = (concept['conceptPath']).toString() ;
                var conceptPath = 'path: '+ path.replace(/,/g,'/') ;
                var synonym = 'synonym: '+concept['synonym'] ;
                var valid = 'valid: '+concept['valid'] ;
                var conceptId = currentTreeResult.create_node(treeNodeId,conceptName) ;
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
        var heightOffset = 300;
        var minHeightPx = $('#treeEditDialog').css('min-height');
        var minHeight_0 = minHeightPx.split('px')[0];
        var minHeight = minHeight_0 - heightOffset;
        var minNodes = 5;
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
    /**
     * определяет кнопки для выполнения запроса каждого типа
    */
    var requestTypeShow = function() {
        var $types = [
            {
                'type' : 'mainProjects',
                'inputField': 'mainProjectsType',
                'goButton' : 'mainProjectsBt'
            },
            {
                'type' : 'searchSystem',
                'inputField': 'searchSystemType',
                'goButton' : 'searchSystemBt'
            },
            {
                'type' : 'philosophy' ,
                'inputField': 'philosophyType',
                'goButton' : 'philosophyBt'
            }
        ] ;
        for (var i = 0; i < $types.length; i++ ) {
           var type = $types[i]['type'] ;
           var result =   requestTypes[type] ;
            $('#'+$types[i]['inputField']).val(result) ;
            var bt = $types[i]['goButton'] ;
            $('#'+bt).button( "option", "disabled", !result );
        }
    };
}
