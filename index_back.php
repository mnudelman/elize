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


    <textarea id="queryText"></textarea>
</div>

<div id="total">


    <div id="mainBlock" style="width:100%;height:165px; margin-top:350px;border:2px solid red">
        <div id="smokeBlk1" style="display:inline-block;border:1px solid blue;width:30%;height:70%;vertical-align:top">

            <div id="smokeBlk1_1" style="display:inline-block;border:0px solid green;width:68%;height:100%;">
                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px"></div>
            <div id="smokeBlk1_2"
                 style="display:inline-block;border:0px solid green;width:25%;height:80%;vertical-align: top">
                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px">
            </div>

        </div>
        <div id="smokeBlk2" style="display:inline-block;border:0px solid green;width:11%;height:98%;vertical-align:top">
            <div id="smokeBlk2_1" style="border:0px solid green;width:100%;height:40%;">
                <img src="dim1.png" id="imgDim2_1" style="width:25px; height:25px">
            </div>
            <div id="smokeBlk2_2" style="border:0px solid green;width:100%;height:55%;">
            </div>
        </div>
        <div id="smokeBlk3"
             style="display:inline-block;border:0px solid green;width:16.5%;height:75%;vertical-align: top">


            <div id="smokeBlk3_1" style="border:0px solid green;
               width:100%;height:85%;vertical-align: top">
                <img src="dim1.png" id="imgDim3" style="width:50px; height:50px;margin-left:50%">
            </div>
            <div id="smokeBlk3_2" style="border:0px solid green;
                                  width:100%;height:12%;vertical-align: top">
            </div>


        </div>

        <div id="smokeBlk4" style="display:inline-block;border:0px solid green;width:11%;height:98%;vertical-align:top">
            <div id="smokeBlk4_1" style="border:0px solid green;width:100%;height:40%;">
                <img src="dim1.png" id="imgDim4_1" style="width:25px; height:25px">
            </div>
            <div id="smokeBlk4_2" style="border:0px solid green;width:100%;height:55%;">
            </div>
        </div>

        <div id="smokeBlk5" style="display:inline-block;border:0px solid green;
                                    width:30%;height:50%;vertical-align:top">


            <div id="smokeBlk5_1" style="display:inline-block;border:0px solid green;width:30%;height:100%;">
                <!--                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px">-->
            </div>
            <div id="smokeBlk5_2" style="display:inline-block;border:0px solid green;width:68%;height:100%;">
                <!--                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px">-->
            </div>


        </div>


    </div>
</div>

<div>
    <div id="resultBlock" class="data">
        <p id="resultBoxError"></p>

        <p id="totalHuman"></p>
        <ol start="1" id="resultBoxDocs">

        </ol>
    </div>
</div>

<div>
    <div id="resultBlockPhilosophy" class="data">

    </div>
</div>

</body>

</html>