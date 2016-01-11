/**
 * Объект - редактирование узла дерева запросов
 */
function NodeEditForm() {
    var nodeParent ;     // узел-родитель
    var node ;           // текущий узел
    var nodeTypes = {} ;     // допустимые типы узлов
    var currentTypes =[]  ;  // допустимые типы текущего узла
    var typesNames = {}   ;  // имена типов
    var operation = '' ; // операция
    var opIsCompleted = true ;     // завершение операции
    var parentType = '' ;  // type узла
    var currentTree ;    // дерево запроса
    //'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
    var OP_CREATE_NODE = 'create_node' ;
    var OP_RENAME_NODE = 'rename_node' ;
    var OP_DELETE_NODE = 'delete_node' ;
    var OP_COPY_NODE = 'copy_node' ;
    var OP_MOVE_NODE = 'move_node' ;
    //----------------------------------//
    var treeNodes = {} ;           // список узлов
    var $nodeEditForm = $('#nodeEditForm') ;
    var $nodeParent = $('#nodeParent') ;
    var $nodeCurrent = $('#nodeCurrent') ;
    var $nodeComment = $('#nodeComment') ;
    var $typeSelect = $('#nodeTypeSelect') ;
    var $validNode = $("input[type='radio'][name='valid'][value='valid']") ;
    var $noValidNode = $("input[type='radio'][name='valid'][value='noValid']") ;
    var $operation = $('#nodeOperation') ;
    var $okButton = $('#nodeSave') ;
    var $breakButton = $('#nodeBreak') ;
    var _this = this ;
   this.init = function(ndTypes,tpNames) {
       $nodeEditForm.attr('hidden','hidden') ;
       nodeTypes = ndTypes ;
       typesNames = tpNames ;
   } ;
    /**
     * текущеее дерево
      * @param currTree
     */
   this.setCurrentTree = function(currTree) {
       currentTree = currTree ;
   } ;
   this.setAttr = function(opCod,ndParent,nd) {
       operation = opCod ;
       node =  nd ;
       nodeParent = ndParent ;
       $nodeParent.val(ndParent.text) ;
       parentType = ndParent['type'] ;
       currentTypes = nodeTypes[parentType]['valid_children'] ;

     } ;
    this.newNode = function() {
        return {
            'text': '',
            'id': true,
            'type': '',
            'data': _this.newDataForNode()
        }
    } ;
    this.newDataForNode = function() {
        return {
            'valid': true,
            'default': false,
            'comment': '',
            'new': false,
            'delete' : false ,
            'rename' : false ,
            'move'   : false,
            'copy'   : false,
            'parentDbId' : false,
            'dbId' : false,
            'dbChildId' : []         // список ДБ id дочерних узлов
        }
    } ;


    /**
     * добвить новый узел в дерево
     * @param nodeParent  - родительский узел
     * @param node    - описание добавляемого узла
     * @returns {*}   - сформированный узел
     */
    this.addNode = function(nodeParent,node) {
        if (typeof(nodeParent) == 'string' && nodeParent === '#') {
            nodeParent = currentTree.get_node('#') ;
        }
        opIsCompleted = false ;
        var nodeData = node['data'] ;
        if (typeof(nodeData) !== 'object' || nodeData === null) {  // для нового добавляем 'data'
            node['data'] = this.newDataForNode() ;
            nodeData = node['data'] ;
        }
        var result = currentTree.create_node(nodeParent,node,'last',function(){ // result - это ид узла
            node['data'] = nodeData ;
            return true ;
        },true) ;
        if (result) {
            node = currentTree.get_node(result) ;
            treeNodes[result] = node ;   // узел хранится в списке с индексом == идентификатору узла
        }
        opIsCompleted = true ;
        return node ;
    } ;
    /**
     * возвращает список узлов дерева( например, перед сохранением в БД)
     * @returns {Array}
     */
    this.getTreeNodes = function() {
        return treeNodes ;
    } ;
    this.clearNewNode = function(downLoadNodes) {
        for (var treeId in treeNodes) {
            var treeNode = treeNodes[treeId] ;
            if (treeNode['data']['new']) {
                treeNode['data']['new'] = false;
                var dbId = downLoadNodes[treeId]['data']['dbId'] ;
                treeNode['data']['dbId'] = dbId ;
            }
        }
    } ;
    /**
     * редактировать форму
     */
    this.edit = function() {
        opIsCompleted = false ;       // завершение операции
        selectMenuPrepare() ;
        $operation.val(operation) ;
        $nodeEditForm.removeAttr('hidden') ;
    } ;
    this.operationIsComplete = function() {
       return opIsCompleted ;
    } ;
    /**
     * состояние - исполнение операций jstree
     * @param flag
     */
    this.setOperationIsComplete = function(flag) {
        opIsCompleted = flag ;
    } ;
    /**
     * скрыть форму, "освободить" кнопки
     */
    var formHidden = function() {
        $nodeEditForm.attr('hidden','hidden') ;
        $okButton.off('click') ;
        $breakButton.off('click') ;
        opIsCompleted = true ;
    } ;
    /**
     * формирует из  currentTypes jQuery-ui элемент selectmenu
     */
    var selectMenuPrepare = function() {
        var $option = $('<option>') ;
        $typeSelect.empty() ;

        var items = [] ;
        if (operation == OP_CREATE_NODE) {
            $nodeComment.val('');
            $nodeCurrent.val('');
        }else {
            $nodeCurrent.val(node.text);
            if (typeof(node['data']) == 'object' ) {      // есть раздел 'data'
                $nodeComment.val(node.data['comment']);
                if(node.data['valid']) {
                  $validNode.prop('checked',true) ;
                }else {
                    $noValidNode.prop('checked',true) ;
                }
            }else {
                $nodeComment.val('');
            }

        }
        var selectedFlag = false ;
        for (var tpKey in currentTypes ) {
            var type = currentTypes[tpKey];
            var item = $('<option>');
            item.attr('value', type);
            item.attr('id', 'input_append' + tpKey);
            item.text(type + ' : ' + typesNames[type]);
            if (type === node.type) {
                item.attr('selected', 'selected');
                selectedFlag = true ;
            }

            $typeSelect.append(item);
        }
        if (!selectedFlag) {                        // последний
            item.attr('selected', 'selected');
        }


        $okButton.button() ;
        $breakButton.button() ;
        $breakButton.on('click',function(){
            formHidden() ;
        } );
        $okButton.on('click',function(){
            var newName = $nodeCurrent.val() ;
            var type = $typeSelect.val() ;
            var comment = $nodeComment.val() ;
            var valid = $validNode.prop('checked') ;     // допустимый узел
            node['type'] = type ;
            node['text'] = newName ;
            var result = false;
          //.currentTree = $('#mytree').jstree(true) ;
            var newFlag = false ;
            var deleteFlag = false ;
            var renameFlag = false ;
            if (operation !== OP_CREATE_NODE) {
                newFlag = node.data['new'] ;
                deleteFlag = node.data['delete'] ;
                renameFlag = node.data['rename'] ;
            }
            switch (operation) {
                case OP_CREATE_NODE :
                    node = _this.addNode(nodeParent,node) ;
                    newFlag = true ;
                    result = true ;
                    break ;
                case OP_RENAME_NODE :
                    result = currentTree.rename_node(node,newName) ;

                    renameFlag = true ;
                    break ;
                case OP_DELETE_NODE :
                    deleteFlag = !deleteFlag ;            // можно отменить удаление
                    if (deleteFlag) {
                        currentTree.disable_node(node);
                    } else {
                        currentTree.enable_node(node);
                    }
                    //result = currentTree.delete_node(node) ;
                    result = true ;
                    deleteFlag = true ;
                    break ;
                case OP_COPY_NODE :
                    result = currentTree.copy_node(node,$nodeParent) ;
                    break ;
                case OP_MOVE_NODE :
                    result = currentTree.move_node(node,$nodeParent) ;
                    break ;

            }
            if (result === false) {
                return false ;
            }
            //node['data']= {'comment': comment,'valid' : valid, 'default' : false,
            //'new':newFlag, 'delete': deleteFlag,'rename' : renameFlag} ;
            node['data']['comment'] = comment ;
            node['data']['valid'] = valid ;
            node['data']['default'] = false ;
            node['data']['new'] = newFlag ;
            node['data']['delete'] = deleteFlag ;
            node['data']['rename'] = renameFlag ;
            formHidden() ;
            return false ;
        }) ;


   } ;

}
