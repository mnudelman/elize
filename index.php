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

    <script language="javascript" src="<?= $dirJs; ?>/MainScript.js"></script> <script language="javascript" src="<?= $dirJs; ?>/ParamSet.js"></script> <script language="javascript" src="<?= $dirJs; ?>/AjaxExecutor.js"></script> <script language="javascript" src="<?= $dirJs; ?>/RequestForm.js"></script> <script language="javascript" src="<?= $dirJs; ?>/RequestGoForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/ResponseForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/MainProjectsForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/PhilosophyForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/PhilosophyFormAttr.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/NodeEditForm.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/BackgroundImg.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/ScrollBackground.js"></script>
    <script language="javascript" src="<?= $dirJs; ?>/testScrollBackground.js"></script>

    <script type="text/javascript" src="<?= $dirJs; ?>/SmokeClouds.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/CircularMotion.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/ResultShow.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/UserInterface.js"></script>
    <script type="text/javascript" src="<?= $dirJs; ?>/RequestGo.js"></script>

    <script language="javascript" src="<?= $dirJs; ?>/start.js"></script>






</head>
<body>
<div id="userInterfaceBlock">

</div>
<!--<div id="queryTextBlock" style="position:absolute;-->
<!--    top:200px;left:100px;background-color: grey">-->
    <div id="queryTextBlock" hidden="hidden" style="position:absolute;background-color: transparent;border:none">


<!--    <textarea id="queryText"></textarea>-->
</div>

<div id="total">


    <div id="mainBlock"
         style="position:relative;width:100%;height:165px; margin-top:350px;border:0px solid red">
    </div>
</div>

<div>
    <div id="resultBlock" class="data result" hidden="hidden">
        <p id="resultBoxError"></p>

        <p id="totalHuman" style="height:10%"></p>
        <ol start="1" id="resultBoxDocs">

        </ol>
        <div id="resultCommands">
<!--            <img src="images/cards/1.png" style="width:7%">-->
        </div>
    </div>
    <!--rgba(10,10,120,0.5) -->
    <div id="resultBackground" style="position:absolute;background-color:rgba(10,10,120,0.7);
                              width:100%;height:100%; top:0;left:0;" >
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

</body>

</html>