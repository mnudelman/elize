<?php
$dirLib = './../lib';
$dirJstree = $dirLib . '/jstree';
$dirJquery_ui = $dirLib . '/jquery-ui/jquery-ui-1.11.4';
$dirMousewheel = $dirLib.'/jquery-mousewheel/mousewheel-3.1.13' ;
$dirJs = './frontEnd/js';
$dirStyle = './frontEnd/styles';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>elize</title>

    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/jquery-ui.css" type="text/css">
    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/theme.css" type="text/css">


    <link rel="stylesheet" href="<?= $dirJstree; ?>/themes/default/style.min.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/formStyle.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/style.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/yandexStyles.css"/>
<!--    <link rel="stylesheet" href="--><?//= $dirStyle; ?><!--/user.css"/>-->

    <script language="javascript" src="<?= $dirLib; ?>/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?= $dirJquery_ui; ?>/jquery-ui.js"></script>
    <script type="text/javascript" src="<?= $dirJstree; ?>/jstree.js"></script>
    <script type="text/javascript" src="<?= $dirMousewheel; ?>/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="<?= $dirAutoResize; ?>/autoResize.js"></script>

    <script language="javascript" src="<?= $dirJs; ?>/MainScript.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/ParamSet.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/AjaxExecutor.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/RequestForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/RequestGoForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/ResponseForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/MainProjectsForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/PhilosophyForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/PhilosophyFormAttr.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/NodeEditForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/BackgroundImg.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/ScrollBackground.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/AddSignalsTable.js"></script>

    <script type="text/javascript" src="<?= $dirJs; ?>/SmokeClouds.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/CircularMotion.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/UserInterface.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/RequestGo.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/AjaxRequest.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/Messages.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/MagicNormalPictures.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/CentralCircleText.js"></script>

    <script language="javascript" src="<?= $dirJs; ?>/start.js"></script>
</head>

<body>
<div id="dbError" style="z-index:999;position:absolute;top:0;left:0;width:100%;htight:100%;background-color: #add8e6"></div>
<div id="inviteInfo">
    <strong>Вы можете редактировать структуру запроса и проверять его на примерах </strong>
</div>
<div id="tabs" >
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

<div id="mainBlock"
     style="position:relative;width:100%;height:165px; margin-top:350px;border:0px solid red">
</div>

<div>
    <div id="resultBlock" class="data result" hidden="hidden">
        <p id="resultBoxError"></p>

        <p id="totalHuman" ></p>
        <ol start="1" id="resultBoxDocs">

        </ol>
        <div id="resultCommands"></div>
    </div>
    <div id="resultBackground">
        <div id="resultBlockNew"></div>
    </div>
</div>

<div>
    <div id="resultBlockPhilosophy" >

    </div>
    <div id="centralCircle">

    </div>
    <div id="centralCircleText"></div>
    <div id="smokeClouds"></div>
</div>
<div id="messages"></div>
</body>
</html>