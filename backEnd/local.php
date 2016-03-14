<?php
/**
* Привязка текущейДиректории к корневойПроекта
*/
?>
<?php
/**
 * @param $dir
 * @param $level
 * @return bool|string
 */
function subDir($dir,$level)
{
    $dir = trim($dir) ;
    $arr = explode(DIRECTORY_SEPARATOR, $dir);
    $n = count($arr) + $level;
    if ($level > 0 || $n <= 0  ) {
        return false ;
    }

    $subDir = ($dir[0] === DIRECTORY_SEPARATOR) ? '/':'';
    for ($i = 0; $i < $n; $i++) {
        $item = $arr[$i];
        $subDir .= ((strlen($subDir) === 0 || $subDir === '/') ? '' : '/') . $item;
    }

    return $subDir;
}

$currentDir = __DIR__ ;
// определяем верхний уровень
$topDir = realpath($currentDir) ;
$dirProject = subDir($topDir,-1) ;    // голова проекта
// -1 - убираем php - файл . -2 - ещё на уровень выше
$topHtmlDir = subDir($_SERVER['PHP_SELF'],-2) ;
$firstSymb = $topHtmlDir[0] ;
// подключаем класс TaskStore - общие параметры
$dirService = $topDir .'/service' ;
include_once $dirService . '/TaskStore.php' ;
include_once $dirService . '/DbConnector.php' ;
include_once $dirService . '/Message.php' ;
include_once $dirService . '/TaskParameters.php' ;
include_once __DIR__.'/setUp.php' ;
//------ подключение БД -------------//
$pdo = DbConnector::getConnect() ;
if (!DbConnector::$isSuccessful) {
    die('EXIT');
}


TaskStore::init($topDir,$topHtmlDir,$dirProject) ;

//  подключаем autoLoad  - авт подключение классов
include_once $dirService . '/autoload.php' ;
//-------------------------------------------//

