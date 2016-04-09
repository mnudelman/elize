<?php
// Вариант index файла для работы администратора
// редактирование и отладка структуры запросов
include_once  __DIR__ . '/local.php' ;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>elize</title>
    <?php
    include_once __DIR__ . '/cssLinkList.php';
    cssLinkCreate($dirLocate,true) ;      // вариант администратора - редактирование структуры
    include_once __DIR__ . '/jsImportedScripts.php';
    include_once __DIR__ . '/jsScriptsList.php';
    ?>
</head>

<body>
<?php
include_once __DIR__ . '/loggerPart.php';    // div для вывода сообщений объекта logger
?>
<?php
include_once __DIR__ . '/requestEditPart.php';  // формы редактирования и проверки запросов
?>
<!--Вывод результатов-->
<!-- -->
<div id="globalResult" hidden="hidden" >
    <?php
    include_once __DIR__ . '/userResultPart.php' ;  // блоки для вывода результата
    ?>
</div>

</body>
</html>