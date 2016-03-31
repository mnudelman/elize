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
    <script type="text/javascript" src="<?= $dirJs; ?>/CallStack.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/Placeholder.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/AddSignalComment.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/ActionSteps.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/GeoLocation.js"></script>

    <script language="javascript" src="<?= $dirJs; ?>/start.js"></script>
</head>
<body>
<div id="userInterfaceBlock"></div>
<div id="queryTextBlock" hidden="hidden" ></div>
<!--<div id="total"></div>-->

<!--<div>-->
<!--    <div id="resultBlock" class="data result" hidden="hidden">-->
<!--        <p id="resultBoxError"></p>-->
<!---->
<!--        <p id="totalHuman" ></p>-->
<!--        <ul  id="resultBoxDocs">-->
<!---->
<!--        </ul>-->
<!--<!--        <div id="resultCommands"></div>-->-->
<!--    </div>-->
<!--    <div id="resultBackground"  >-->
<!--          <div id="resultBlockNew"></div>-->
<!--    </div>-->
<!--</div>-->

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
        <!--        <div id="resultCommands"></div>-->
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