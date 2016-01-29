<?php
/**
 * Created by PhpStorm.
 * User: michael
 * Date: 29.01.16
 * Time: 15:45
 */

class SympleYandex {
    private $currentQuery = 'оренбург' ;
    private $baseUrl = 'http://mnogonado.net/search/gki/?output=json&q=' ;
    private $content = false ;
    public function queryGo()
    {
// создание нового cURL ресурса
        $ch = curl_init();
        //    $url = $this->baseUrl.$this->currentQuery ;
        $url = 'http://www.mnogonado.net/search/gki/?q=test&output=json' ;
//        'yandexUser' => 'mnudelman',
//        'yandexKey' => '03.12134356:615ae2c82b1bf24625777b73068f63d1',
$url ='https://yandex.ru/search/xml?user=mnudelman&key=03.12134356:615ae2c82b1bf24625777b73068f63d1&query=оренбург' ;

$url = 'https://yandex.ru/search/xml?user=mnudelman&key=03.12134356:615ae2c82b1bf24625777b73068f63d1&query=%D0%BE%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3&l10n=ru&sortby=tm.order%3Dascending&filter=strict&groupby=attr%3D%22%22.mode%3Dflat.groups-on-page%3D10.docs-in-group%3D1' ;







// установка URL и других необходимых параметров
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// загрузка страницы
        $this->content = curl_exec($ch);
        echo 'content:<br>' ;
var_dump($this->content) ;
// завершение сеанса и освобождение ресурсов
        curl_close($ch);
    }
    public function setQuery($query) {
        $this->currentQuery = $query ;
    }
    public function getResult() {
        return [
            'successful' => true,
            'results' => json_decode($this->content)
        ];
    }

}