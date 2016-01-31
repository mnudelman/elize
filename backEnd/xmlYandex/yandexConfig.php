<?php
/**
 * константы подключения к yandex.ru/search/xml
 */
// аренда на адрес 31.170.164.28
// https://yandex.ru/search/xml?user=balaschov-l&key=03.285653075:36ad08680e1bd616c489106ee2539405
function yandexConfig()
{
    return [
        'yandexUser' => 'mnudelman',
        'yandexKey' => '03.12134356:615ae2c82b1bf24625777b73068f63d1',
        'yandexUrl' => 'https://yandex.ru/search/xml',
        'searchHost' => ''
    ];
//
//    $pi = pathinfo($_SERVER['PHP_SELF']) ;
//    $currentHtmlDir = $pi['dirname'] ; // относительный адрес для HTML-ссылок
//    if (mb_strpos($currentHtmlDir,'/projects') > 0 ) {
//        return [
//            'yandexUser' => 'mnudelman',
//            'yandexKey' => '03.12134356:615ae2c82b1bf24625777b73068f63d1',
//            'yandexUrl' => 'https://yandex.ru/search/xml',
//            'searchHost' => ''
//        ];
//    }else {
//    return [
//        'yandexUser' => 'balaschov-l',
//        'yandexKey' => '03.285653075:36ad08680e1bd616c489106ee2539405',
//        'yandexUrl' => 'https://yandex.ru/search/xml',
//        'searchHost' => ''
//    ];
 //   }


}
