<?php
/**
 * класс для обращений к основнымПроектам
 * mnogonado.net
 * Date: 27.01.16
 * Time: 18:18
 */

class MainProjects {
    private $currentQuery = 'test' ;
    private $cityId;
    private $cityName ;
    private $regionId ;
    private $totalContent = false ;  // соединённые результаты запросов к проектам
    private $projects = [] ;         // списсок адресов запросов
    private $totalResult = [] ;      // результирующий выход
    private $RESULT_MAX_SIZE = 10 ;   // число элементов результата
    //---------------------------------//
    public function __construct() {
        $this->projects = ['mnogonado','popret'] ;
    }

    /**
     * В запрос добавляем cityid=<cityid>&city=<cityName>
     * @param $projectName
     * @return bool|string
     */
    private function getUrl($projectName) {
        $url = false ;
        switch($projectName)  {
            case 'mnogonado' : {
                $url = 'http://www.mnogonado.net/search/gki/?q='.$this->currentQuery.
                    '&cityid='.$this->cityId.
                    '&city='.$this->cityName.
                    '&output=json' ;
                break ;
            }
            case 'popret' : {
                $url = 'http://popret.ru/ajax/json/test.php?q='.$this->currentQuery.
                    '&cityid='.$this->cityId.
                    '&city='.$this->cityName.
                    '&output=json' ;
                break ;
            }

        }
        return $url ;
    }

    /**
     * запрос по всем адресам, слияние в единый массив и сортировка по убыванию "priority"
     */
    public function projectsGo() {
        $this->totalContent = [] ;
        foreach ($this->projects as $key => $projectName) {
            if( false !== ($url = $this->getUrl($projectName))) {
                $result = $this->queryGo($url) ;
                if (false !== $result) {
                    $this->mergeResult($result) ;     // слияние результатов
                }
            }
        }
        usort($this->totalContent,function($item1,$item2){
            return $this->comparePriority($item1,$item2) ;
        } ) ;
        $this->totalResultPrepare() ;
    }
    private function comparePriority($item1,$item2) {
        $pr1  = $item1['priority'] ;
        $pr2  = $item2['priority'] ;
        if ($pr1 < $pr2 ) {
            return 1 ;
        }
        if ($pr1 > $pr2) {
            return -1 ;
        }else {
            return 0 ;
        }
    }

    /**
     * слияние запросов в единый массив $this->totalContent с пересчётом приоритета
     * priority = приоритетЗапроса * приоритетЭлемента
     * @param $result
     * @return bool
     */
    private function mergeResult($result) {
        $resultPriority = false ;
        $results = false ;
        if(isset($result['priority'])) {
            $resultPriority = $result['priority'] ;
        }
        if(isset($result['results']) && is_array($result['results'])) {
            $results = $result['results'] ;
        }
        if (false === $resultPriority || false == $results ) {
            return false ;
        }
        foreach ($results as $key => $itemResult) {
            if (isset($itemResult['priority'])) {
                $itemPriority = $resultPriority * $itemResult['priority'] ;
                $this->totalContent[] = [
                    'priority' => $itemPriority,
                    'data' => $itemResult
                ] ;
            }
        }
    }

    /**
     * забираем данные из totalContent
     */
    private function totalResultPrepare() {
        $iMax = min($this->RESULT_MAX_SIZE,count($this->totalContent)) ;
        $totalData = [] ;
        for ($i = 0 ; $i < $iMax; $i++) {
            $totalData[] = $this->totalContent[$i]['data'] ;
        }
        $this->totalResult = [
            'icon' => '',
            'from' => 0,
            'priority' => 1,
            'results' => $totalData
        ] ;
    }

    /**
     * выполнить запрос к конкретному url
     * @param $url
     * @return bool|mixed
     */
    public function queryGo($url)
    {
// создание нового cURL ресурса
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// загрузка страницы
        $result = curl_exec($ch);
// завершение сеанса и освобождение ресурсов
        curl_close($ch);
        $result = json_decode($result,true) ;   // в массив php
        if (json_last_error() === 0) {
            return $result ;
        }else {
            return false ;
        }

    }
    public function setCity($cityId,$cityName,$regionId) {
        $this->cityId = $cityId;
        $this->cityName = urlencode($cityName) ;
        $this->regionId = $regionId ;
    }
    public function setQuery($query) {
       $this->currentQuery = urlencode($this->clearQuery($query)) ;
    }
    public function getResult() {
        return [
            'successful' => true,
            'results' => $this->totalResult
            ];
    }
    /**
     * убирает из запроса все лишние символы и разбивает на слова
     * @param $phrase
     */
    private function clearQuery($text) {
        $arr = [] ;
        $phrase = trim($text)   ;
        $phrase = preg_replace("/[\.,!?-]/",' ',$phrase) ;    //знаки припинания, -
        $phrase = trim($phrase) ;
        $phrase = preg_replace("/\s{1,}/",' ',$phrase) ;      // лишние пробелы
        $phrase = mb_strtolower($phrase) ;
        $phrase = trim($phrase) ;
        //заменить пробелы на +
       return $phrase ;
    }
}