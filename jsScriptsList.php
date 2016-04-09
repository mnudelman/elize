<?php
/**
 * список js скриптов для вставки в index.php
 */
// dirJs - папка JS скриптов

$jsList = [
    'ajax' => [                    // обмен данными с backend
        'AjaxExecutor.js',
        'AjaxRequest.js'
    ],
    'admin' => [                  // редактирование структуры запроса
        'RequestForm.js',
        'RequestGoForm.js',
        'NodeEditForm.js'
    ],
    'requests' => [               // выполнение запроса
        'RequestGo.js',
        'ResponseForm.js',
        'MainProjectsForm.js',
        'PhilosophyForm.js',
        'PhilosophyFormAttr.js',
        'AddSignalsTable.js',
        'GeoLocation.js',
        'AddSignalComment.js'

    ],
    'show' => [                      // отображение результатов
        'BackgroundImg.js',
        'ScrollBackground.js',
        'SmokeClouds.js',
        'CircularMotion.js',
        'MagicNormalPictures.js',
        'CentralCircleText.js',
        'Placeholder.js'
    ],
    'service' => [                   // вспомогательные объекты
        'Messages.js',
        'CallStack.js',
        'ActionSteps.js',
        'Logger.js',
        'CommonFunc.js'
    ],
    'controller' => [                // запуск и управление исполнением
        'UserInterface.js',
        'MainScript.js',
        'ParamSet.js',
        'start.js'

    ]
];
foreach ($jsList as $dirName => $scripts) {
    foreach ($scripts as $key => $scriptFile) {
        echo '<script language="javascript" src="' . $dirJs . '/' . $dirName . '/' . $scriptFile .
            '"></script>';
    }
}
