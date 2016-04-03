<?php
/**
 * класс - контроллер обращений с запросами к xml.yandex
 * Time: 16:37
 */
include_once __DIR__.'/yandexConfig.php' ;       // констатнты подключения
class YandexController {
    private $Yandex ;
    private $user ;
    private $key;
    private $url ;
    private $host ;
    private $query ;
    private $page;
    private $taskpPar ;     // обращение к списку параметров
    private $msg ;
    //--------------------------//
    public function __construct() {
        $this->taskpPar = TaskParameters::getInstance() ;
        $this->msg = Message::getInstace() ;
        $config = yandexConfig() ;
        $this->user = $config['yandexUser'] ;
        $this->url  = $config['yandexUrl'] ;
        $this->key  = $config['yandexKey'] ;
        $this->host = $config['searchHost'] ;
        //----------------------------------//
        $this->Yandex = new Yandex($this->user, $this->key,$this->url);
    }
    public function setQuery($query) {
        $this->query = $query ;
    }
    public function setPage($page) {
        $this->page = $page ;
    }
    public function queryGo()
    {
        //$Yandex = new Yandex($this->user, $this->key,$this->url);
        $query = $this->query;
        $host = $this->host;
        $page = $this->page;
        $geo = '';
        $cat = '';
        $theme = '';
        // Set Query
        $this->Yandex->query($query)
            ->host($host)// set one host or multihost
            ->page($page)// set current page
            ->limit(10)// set page limit
            ->geo($geo)// set geo region - http://search.yaca.yandex.ru/geo.c2n
            ->cat($cat)// set category - http://search.yaca.yandex.ru/cat.c2n
            ->theme($theme)// set theme - http://help.yandex.ru/site/?id=1111797
            ->sortby(Yandex::SORT_RLV)
            ->groupby(Yandex::GROUP_DEFAULT)
            ->set('max-title-length', 160)// set some options
            ->set('max-passage-length', 200)
            ->request()                        // send request
        ;

    }
    public function getError() {
        return $this->Yandex->error ;
    }
    public function getResults() {
       $error = $this->Yandex->error ;
        $error = (is_null($error) || empty($error)) ? false : $error ;
        $res = $this->Yandex->results() ;
        return [
            'successful' => true ,
            'totalHuman' => $this->Yandex->totalHuman(), //  'total Human',
            'pageStart' => $this->Yandex->getLimit()*$this->Yandex->getPage() + 1,
            'results' => $res ,
            'error' => $error
        ] ;
            /*
            $result is Object with next properties:
                ->url
                ->domain
                ->title
                ->headline
                ->passages // array
                ->sitelinks // array
            */
    }

    /**
     * преобразовать для вывода
     */
    public function getResultsForShow() {
        $error = $this->Yandex->error ;
        $error = (is_null($error) || empty($error)) ? false : $error ;
        $resultForShow = [];
        $totalHuman = '' ;
        if (false === $error ) {
            $totalHuman = $this->Yandex->totalHuman();
            $totalHuman = Yandex::getHighlight($totalHuman);
            $res = $this->Yandex->results();

            foreach ($res as $result) {
                $result_i = [];
                $url = (isset($result->url) && !is_null($result->url)) ? Yandex::getHighlight($result->url) : '';
                $result_i['url'] = $url;
                $headline = (isset($result->headline) && !is_null($result->headline)) ? Yandex::getHighlight($result->headline) : '';
                $result_i['headline'] = $headline;
                $domain = (isset($result->domain) && !is_null($result->domain)) ? Yandex::getHighlight($result->domain) : '';
                $result_i['domain'] = $domain;
                $title = (isset($result->title) && !is_null($result->title)) ? Yandex::getHighlight($result->title) : '';
                $result_i['title'] = $title;
                $result_i['passages'] = [];
                if (isset($result->passages) && !is_null($result->passages)) {
                    if ($result->passages) {
                        foreach ($result->passages as $passage) {
                            $pass = Yandex::getHighlight($passage);
                            $result_i['passages'][] = $pass;
                        }
                    }
                }

                $resultForShow[] = $result_i;
            }
        }

        return [
            'successful' => !$error ,
            'totalHuman' => $totalHuman, //  'total Human',
            'pageStart' => $this->Yandex->getLimit()*$this->Yandex->getPage() + 1,
            'results' => $resultForShow ,
            'error' => $error,
            'message' => $error
        ] ;
    }
}