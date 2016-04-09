<?php
// Вариант index файла для пользователя
include_once  __DIR__ . '/local.php' ;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>elize</title>
    <?php
    include_once __DIR__ . '/cssLinkList.php';
    cssLinkCreate($dirLocate,false) ;      // вариант пользователя
    include_once __DIR__ . '/jsImportedScripts.php';  // внешние JS скрипты
    include_once __DIR__ . '/jsScriptsList.php';      // собственные
    ?>
</head>

<body>
<!-- блок-индикатор запуска от имени пользователя -->
<div id="userInterfaceBlock"></div>
<?php
include_once __DIR__ . '/loggerPart.php';    // div для вывода сообщений объекта logger
?>
<?php
    include_once __DIR__ . '/userResultPart.php' ;  // блоки для вывода результата
?>
</body>
</html>