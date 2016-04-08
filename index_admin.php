<?php
$dirLib = './../lib';
$dirJstree = $dirLib . '/jstree';
$dirJquery_ui = $dirLib . '/jquery-ui/jquery-ui-1.11.4';
$dirMousewheel = $dirLib . '/jquery-mousewheel/mousewheel-3.1.13';
$dirAutoResize = $dirLib . '/textAreaAutoResize';
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
    <link rel="stylesheet" href="<?= $dirStyle; ?>/admin.css"/>

    <script language="javascript" src="<?= $dirLib; ?>/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?= $dirJquery_ui; ?>/jquery-ui.js"></script>
    <script type="text/javascript" src="<?= $dirJstree; ?>/jstree.js"></script>
    <script type="text/javascript" src="<?= $dirMousewheel; ?>/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="<?= $dirAutoResize; ?>/autoResize.js"></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>

    <?php
    include_once __DIR__ . '/jsScripts.php';
    ?>

<!-- ajax - Взаимодействие с БД-->
    <script language="javascript" src="<?= $dirJs; ?>/ajax/AjaxExecutor.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/ajax/AjaxRequest.js"></script>
<!--admin - редактирование структуры запроса -->
    <script language="javascript" src="<?= $dirJs; ?>/admin/RequestForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/admin/RequestGoForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/admin/NodeEditForm.js"></script>
<!-requests - объекты выполнения запросов -->
    <script type="text/javascript" src="<?= $dirJs; ?>/requests/RequestGo.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/requests/ResponseForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/requests/MainProjectsForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/requests/PhilosophyForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/requests/PhilosophyFormAttr.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/requests/AddSignalsTable.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/requests/GeoLocation.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/requests/AddSignalComment.js"></script>

<!--show - вывод изображения -->
    <script language="javascript" src="<?= $dirJs; ?>/show/BackgroundImg.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/show/ScrollBackground.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/show/SmokeClouds.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/show/CircularMotion.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/show/MagicNormalPictures.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/show/CentralCircleText.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/show/Placeholder.js"></script>

<!--service - технологические объекты -->
    <script type="text/javascript" src="<?= $dirJs; ?>/service/Messages.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/service/CallStack.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/service/ActionSteps.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/service/Logger.js"></script>

<!--controller - запуск и контроллер -->
    <script type="text/javascript" src="<?= $dirJs; ?>/controller/UserInterface.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/controller/MainScript.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/controller/ParamSet.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/controller/start.js"></script>
</head>

<body>
<div id="logger" hidden="hidden" class="logger">
    <button id="closeLoggerMessages">закрыть</button> &nbsp;&nbsp;&nbsp;
    <button id="stopLoggerMessages">прервать вывод</button> &nbsp;&nbsp;&nbsp;
    <button id="clearLoggerMessages">очистить вывод</button>
    <div id="loggerData"></div>
</div>
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

<div id="mainBlock"
     style="position:relative;width:100%;height:165px; margin-top:350px;border:0px solid red">
</div>
<!--Вывод результатов-->
<div id="globalResult" hidden="hidden"
     style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5)">
    <button id="closeErrorMessages">закрыть</button>
    <div>
        <div id="resultBlock" class="data result" hidden="hidden">
            <p id="resultBoxError"></p>

            <p id="totalHuman"></p>
            <ol start="1" id="resultBoxDocs">

            </ol>
            <div id="resultCommands"></div>
        </div>
<!--        <div id="resultBackground" hidden="hidden">-->
            <div id="resultBlockNew"></div>
<!--        </div>-->
    </div>

    <div>
        <div id="resultBlockPhilosophy">

        </div>
        <div id="centralCircle">

        </div>
        <div id="centralCircleText"></div>
        <div id="smokeClouds"></div>
    </div>
    <div id="messages"></div>


    <div>
        <div id="centralCircle">

        </div>
        <div id="centralCircleGlow">

        </div>

        <div id="centralCircleText">

        </div>
        <div id="resultBlockPhilosophy">

        </div>

        <div id="smokeClouds"></div>
        <div id="stamp"></div>
    </div>

    <div>
        <div id="resultBlock" class="data result" hidden="hidden">
            <p id="resultBoxError"></p>

            <p id="totalHuman"></p>
            <ul id="resultBoxDocs">

            </ul>
        </div>
        <div id="resultBackground">
            <div id="resultBlockNew"></div>
        </div>
    </div>


    <div id="addSignalBlock">
        <div id="addSignalsTable"></div>
        <div id="addSignalsTotal"></div>
    </div>


</div>


</body>
</html>