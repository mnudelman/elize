<?php
/**
 * раздел редактирование запросов (только для index_admin.php)
 */
echo '
<div id="inviteInfo">
    <strong>Вы можете редактировать структуру запроса и проверять его на примерах </strong>
</div>
<div id="tabs" style="width:700px">
    <ul>
        <li><a href="#treeEditDialog">edit</a></li>
        <li><a href="#requestGoDialog">GO</a></li>
        <li><a href="#requestEditAbout">about</a></li>
    </ul>
    <div id="treeEditDialog" class="dialogPane">
        <div id="commandSet">
            <button id="treeSave" title="сохранить дерево в БД">save</button>
        </div>
        <br>

        <div id="mytree"></div>

        <div id="nodeEditForm" style="border: 2px solid;border-radius:5px;background-color: #feeebd;">
            <label> <span class="label" id="nodeOperationLabel"> <strong> operation: </strong> </span>
                <input type="text" class="field" id="nodeOperation" readonly="readonly">
            </label> <br>
            <label> <span class="label" id="nodeParentLabel"> <strong> parent node </strong> </span>
                <input type="text" class="field" id="nodeParent" readonly="readonly">
            </label> <br><br>
            <label><span class="label" id="nodeLabel"> <strong> current node </strong> </span>
                <input type="text" class="field1" id="nodeCurrent" placeholder="имя узла">
            </label> <br>
            <label><span class="label" id="nodeCommentLabel"> <strong> comment</strong> </span>
                <input type="text" class="field1" id="nodeComment" placeholder="произвольный текст">
            </label> <br><br>

            <label for="nodeTypeSelect" class="label"><strong>node type:</strong></label>
            <select size="1" id="nodeTypeSelect">
                <option selected>Тип узла</option>
                <option>подраздел</option>
                <option>понятие</option>
                <option>синоним</option>
            </select> <br>
            <label><span class="label" id="validLabel"> <strong> valid node:</strong> </span>
                <input name="valid" type="radio" value="valid" checked="checked"> Yes
                <input name="valid" type="radio" value="noValid"> No
            </label><br><br>

            <div id="nodeCommand" style="margin-left: 20px; margin-bottom:5px;width:250px">
                <button id="nodeSave">oK!</button>
                <button id="nodeBreak">break</button>
            </div>


        </div>

    </div>


    <div id="requestGoDialog" class="dialogPane">
        <div id="goBlock">
            <label><span id="textGoLabel"> <strong>request</strong> </span>
            <textarea id="requestText" name="requestText" placeholder="текст запроса" rows="3" cols="60">
            </textarea>

            </label>
            <button id="requestGoBt">go</button>
<!--            <button id="debugEmptyBt">debugEmpty</button>-->
        </div>
        <br>

        <div id="requestTypes">
            <label> <span class="label" id="mainProjectsTypeLabel"> <strong> Основные проекты </strong> </span>
                <input type="text" class="field" id="mainProjectsType" readonly="readonly">
            </label>
            <button id="mainProjectsBt" disabled="disabled">go</button>
            <br><br>
            <label> <span class="label" id="searchSystemTypeLabel"> <strong> Поисковые системы </strong> </span>
                <input type="text" class="field" id="searchSystemType" readonly="readonly">
            </label>
            <button id="searchSystemBt" disabled="disabled">go</button>
            <br><br>
            <label> <span class="label" id="philosophyTypeLabel"> <strong> Философия </strong> </span>
                <input type="text" class="field" id="philosophyType" readonly="readonly">
            </label>
            <button id="philosophyBt" disabled="disabled">go</button>
            <br><br>

        </div>
        <div id="treeResult"></div>
    </div>


    <div id="requestEditAbout" class="dialogPane">
        <strong>Описание работы</strong>
    </div>

</div>
' ;