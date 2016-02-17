<?php
/**
 * класс для обращений к основнымПроектам
 * mnogonado.net
 * Date: 27.01.16
 * Time: 18:18
 */

class MainProjects {
    private $currentQuery = 'test' ;
    private $baseUrl = 'http://mnogonado.net/search/gki/?output=json&q=' ;
    private $content = false ;
    public function queryGo()
    {
// создание нового cURL ресурса
        $ch = curl_init();
        $url = $this->baseUrl.$this->currentQuery ;
    //    $url = 'http://www.mnogonado.net/search/gki/?q=test&output=json' ;
    //    $url ='http://www.mnogonado.net/search/gki/?q=%D1%85%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA&output=json' ;
        $url = 'http://www.mnogonado.net/search/gki/?q='.$this->currentQuery.'&output=json' ;
// установка URL и других необходимых параметров
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// загрузка страницы
        $this->content = curl_exec($ch);

// завершение сеанса и освобождение ресурсов
        curl_close($ch);
    }
    public function setQuery($query) {
        $this->currentQuery = urlencode($query) ;
        //$this->currentQuery = 'холодильник' ;    // $query;
    }
    public function getResult() {
        return [
            'successful' => true,
            'results' => json_decode($this->content)
            ];
    }
}