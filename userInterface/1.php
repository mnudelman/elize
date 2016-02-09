<?php
$dirLib = './../../lib';
$dirJstree = $dirLib . '/jstree';
$dirJquery_ui = $dirLib . '/jquery-ui/jquery-ui-1.11.4';
$dirJs = './frontEnd/js';
$dirStyle = './../frontEnd/styles';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>req-edit</title>

    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/jquery-ui.css" type="text/css">
    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/theme.css" type="text/css">


    <link rel="stylesheet" href="<?= $dirJstree; ?>/themes/default/style.min.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/formStyle.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/style.css"/>
    <link rel="stylesheet" href="<?= $dirStyle; ?>/yandexStyles.css"/>

    <script language="javascript" src="<?= $dirLib; ?>/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?= $dirJquery_ui; ?>/jquery-ui.js"></script>
    <script type="text/javascript" src="<?= $dirJstree; ?>/jstree.js"></script>
    <script type="text/javascript" src="SmokeClouds.js"></script>
    <script type="text/javascript" src="ResultShow.js"></script>
    <style>
        html {
            margin: 0;
            padding: 0;
            font-size: 62.5%;
        }

        body {
            background-image: url("1.png");
            background-size: cover;
            background-repeat: no-repeat;
        }

        .roundInput {
            width: 250px;
            height: 250px;
            border: 2px solid green;
            border-radius: 250px;
        }

        .text {
            margin-top: 70px;
            margin-left: 20px;
            width: 210px;
            height: 100px;
            max-width: 210px;
            max-height: 100px;
            background-color: transparent;
            border-color: rgba(0, 0, 0, 0);
            color: white;
        }
        .result {
            background-image: url("table1.png") ;
            background-size: auto 100%;
            background-repeat: no-repeat;
        }
    </style>
    <script>
        $(document).ready(function () {
            var smoke = new SmokeClouds();
            var result = new ResultShow();
            result.init();
            $(document).click(function (e) {
                var Ymax = $(document).height();
                var Xmax = $(document).width();
                var d = 0.17 * Xmax;
                var x0 = Xmax / 2;
                var y0 = 0.57 * x0;
                var r = 0.95 * (d / 2);
                var r2 = r * r;
                var x = e.pageX;
                var y = e.pageY;
                var s = (x - x0) * (x - x0) + (y - y0) * (y - y0);
                if (s <= r2) {
                    alert('INside in textarea' + '\n' + 'documentWidth:' + Xmax);
                    var $totalBlock = $('#mainBlock');
                    var top = $totalBlock.css('margin-top');
                    var height = $totalBlock.css('height');
                    alert('INside in textarea' + '\n' + 'documentWidth:' + Xmax + '\n' +
                    'main-top:' + top + '\n' + 'main-height:' + height);
                    stop = true;
                } else {
                    var aDoc = 0.535;   // Ymax/Xmax
                    var Ymax = Xmax * aDoc;
                    var btYTop = 0.69 * Ymax;
                    var btWidth = 0.145 * Xmax;
                    var btXLeft = (Xmax - btWidth) / 2;
                    var btXRight = btXLeft + btWidth;
                    var btHeight = btWidth * 0.23;
                    var btYBottom = btYTop + btHeight;
                    if (x >= btXLeft && x <= btXRight && y >= btYTop && y <= btYBottom) {
                       result.showGo();
                    }

                }
            });


            smoke.init();
            smoke.smokeGo();
            $(window).on('resize', function() {
                smoke.smokeResize();
            });
        });
    </script>


</head>
<body>
<div id="'userInterface"></div>
<div id="total">
    <h2>Настрока формы области ввода</h2>

    <div id="mainBlock" style="width:100%;height:165px; margin-top:350px;border:0px solid red">
        <div id="smokeBlk1" style="display:inline-block;border:0px solid green;width:30%;height:50%;vertical-align:top">


            <div id="smokeBlk1_1" style="display:inline-block;border:0px solid green;width:68%;height:100%;">
                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px"></div>
            <div id="smokeBlk1_2" style="display:inline-block;border:0px solid green;width:30%;height:100%;">
                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px">
            </div>

        </div>
        <div id="smokeBlk2" style="display:inline-block;border:0px solid green;width:11%;height:98%;vertical-align:top">
            <div id="smokeBlk2_1" style="border:0px solid green;width:100%;height:40%;">
                <img src="dim1.png" id="imgDim2_1" style="width:25px; height:25px">
            </div>
            <div id="smokeBlk2_2" style="border:0px solid green;width:100%;height:55%;">
                <!--            <img src="dim1.png"  id="imgDim2_2" style="width:25px; height:25px" >-->
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
                <!--            <img src="dim1.png"  id="imgDim4_2" style="width:25px; height:25px" >-->
            </div>
        </div>

        <div id="smokeBlk5" style="display:inline-block;border:0px solid green;
                                    width:30%;height:50%;vertical-align:top">


            <div id="smokeBlk5_1" style="display:inline-block;border:0px solid green;width:30%;height:100%;">
                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px">
            </div>
            <div id="smokeBlk5_2" style="display:inline-block;border:0px solid green;width:68%;height:100%;">
                <img src="dim1.png" id="imgDim1" style="width:50px; height:50px">
            </div>


        </div>


    </div>
</div>
<div>
    <div id="resultBlock" class="result" >

    </div>
</div>

</body>

</html>