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
    <title>yandex-geo</title>

    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/jquery-ui.css" type="text/css">
    <link rel="Stylesheet" href="<?= $dirJquery_ui; ?>/sunny/theme.css" type="text/css">



    <script language="javascript" src="<?= $dirLib; ?>/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?= $dirJquery_ui; ?>/jquery-ui.js"></script>
    <script type="text/javascript" src="<?= $dirJstree; ?>/jstree.js"></script>
    <script type="text/javascript" src="<?= $dirMousewheel; ?>/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="<?= $dirAutoResize; ?>/autoResize.js"></script>

    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>


</head>
<body>
<script>
    ymaps.ready(function(){
        ymaps.geolocation.get({
            provider: 'yandex'

        }).then(function(result){
            var coord=result.geoObjects.get(0).properties.get('boundedBy');
            var lat=(coord[0][0]+coord[1][0])/2;
            var long=(coord[0][1]+coord[1][1])/2;
            $('#lat').append('широта: ' + lat) ;
            $('#long').append('долгота: ' + long) ;
        }) ;
    }) ;
</script>
<div id="lat"></div>
<div id="long"></div>
</body>

</html>