<?php
//$dirLib = './../../lib';
//$dirJstree = $dirLib . '/jstree';
//$dirJquery_ui = $dirLib . '/jquery-ui/jquery-ui-1.11.4';
//$dirJs = './frontEnd/js';
//$dirStyle = './../frontEnd/styles';
?>

<?php
$dirLib = './../lib';
$dirJstree = $dirLib . '/jstree';
$dirJquery_ui = $dirLib . '/jquery-ui/jquery-ui-1.11.4';
$dirMousewheel = $dirLib.'/jquery-mousewheel/mousewheel-3.1.13' ;
$dirAutoResize = $dirLib.'/textAreaAutoResize' ;
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
    <link rel="stylesheet" href="<?= $dirStyle; ?>/user.css"/>

    <script language="javascript" src="<?= $dirLib; ?>/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?= $dirJquery_ui; ?>/jquery-ui.js"></script>
    <script type="text/javascript" src="<?= $dirJstree; ?>/jstree.js"></script>
    <script type="text/javascript" src="<?= $dirMousewheel; ?>/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="<?= $dirAutoResize; ?>/autoResize.js"></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>

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
<div id="userInterfaceBlock"></div>
<div id="queryTextBlock" hidden="hidden" ></div>
<div>
    <div id="centralCircle">

    </div>
    <div id="centralCircleGlow">

    </div>

    <div id="centralCircleText">

    </div>
    <div id="resultBlockPhilosophy" >

    </div>

    <div id="smokeClouds"></div>
    <div id="stamp"></div>
</div>

<div>
    <div id="resultBlock" class="data result" hidden="hidden">
        <p id="resultBoxError"></p>

        <p id="totalHuman" ></p>
        <ul  id="resultBoxDocs">

        </ul>
    </div>
    <div id="resultBackground"  >
        <div id="resultBlockNew"></div>
    </div>
</div>


<div id="addSignalBlock">
    <div id="addSignalsTable"></div>
    <div id="addSignalsTotal"></div>
</div>
<div id="addSignalComment"></div>
<div id="messages"></div>
</body>

</html>