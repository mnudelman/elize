<?php
$dirLib = './../../lib';
$dirJstree = $dirLib . '/jstree';
$dirJquery_ui = $dirLib . '/jquery-ui/jquery-ui-1.11.4';
$dirJs = './';
$dirStyle = './styles';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jstree basic demos</title>
    <style>
        html {
            margin: 0;
            padding: 0;
            font-size: 62.5%;
        }

        body {
            max-width: 800px;
            min-width: 300px;
            margin: 0 auto;
            padding: 20px 10px;
            font-size: 14px;
            font-size: 1.4em;
        }

        h1 {
            font-size: 1.8em;
        }

        .demo {
            overflow: auto;
            border: 1px solid silver;
            min-height: 100px;
        }

        .jstree-default-contextmenu {
            z-index: 110;
        }
    </style>


    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/jquery-ui.css" type="text/css">
    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/theme.css" type="text/css">


    <link rel="stylesheet" href="<?= $dirJstree; ?>/themes/default/style.min.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/formStyle.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/style.css"/>

    <script language="javascript" src="<?= $dirLib; ?>/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?= $dirJquery_ui; ?>/jquery-ui.js"></script>
    <script type="text/javascript" src="<?= $dirJstree; ?>/jstree.js"></script>

    <script language="javascript" src="js/MainScript.js"></script>
    <script language="javascript" src="js/ParamSet.js"></script>
    <script language="javascript" src="js/AjaxExecutor.js"></script>
    <script language="javascript" src="js/RequestForm.js"></script>
    <script language="javascript" src="js/NodeEditForm.js"></script>
    <script language="javascript" src="js/start.js"></script>

</head>
<body>
<div id="dbError"></div>
<div id="inviteInfo">
    <strong>Вы можете редактировать структуру запроса и проверять его на примерах </strong>
</div>
<div id="tabs">
    <ul>
        <li><a href="#treeeEditDialog">edit</a></li>
        <li><a href="#requestGoDialog">GO</a></li>
        <li><a href="#requestEditAbout">about</a></li>
    </ul>
    <div id="treeeEditDialog" style="min-height:400px">
        <div id="commandSet">
            <button id="treeSave" title="сохранить дерево в БД">save</button>
        </div> <br>

        <div id="mytree"> </div>

        <div id="nodeEditForm"  style="border: 2px solid;border-radius:5px;background-color: #feeebd;">
            <label> <span class="label" id="nodeOperationLabel"> <strong> operation: </strong> </span>
                <input type="text" class="field" id="nodeOperation" readonly="readonly">
            </label> <br>
            <label> <span class="label" id="nodeParentLabel"> <strong> parent node </strong> </span>
                <input type="text" class="field" id="nodeParent" readonly="readonly">
            </label> <br><br>
            <label><span class="label" id="nodeLabel"> <strong> current node </strong> </span>
                <input type="text" class="field" id="nodeCurrent" placeholder="имя узла">
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


    <div id="requestGoDialog">
        <label><span id="textGoLabel"> <strong> request </strong> </span>
            <input type="text" style="width:400px" id="requestText" placeholder="текст запроса">
        </label>
        <button id="requestGoBt">go</button>
    </div>


    <div id="requestEditAbout">
        <strong>Описание работы</strong>
    </div>

</div>

</body>
</html>