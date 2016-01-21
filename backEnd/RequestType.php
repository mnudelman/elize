<?php
/**
 * класс - определитель типа запроса
 * тип заппроса определяет адрес реализации
 * Основные проекты - это обращение к порталу  mnogonado
 * Поисковые системы - это обращение к yandex.ru
 * Фиолсофские - это запросы, не принадлежащие первым двум группам
 *
 */

class RequestType {
    private $typeRules = [] ;         // правила, определяющее тип запроса
    private $requestTypes = [] ;      // типы запросов
    //---------------------------//
    private $msg ;                   // объект для сообщений
    private $resultRequest = [] ;    // результат разбора запроса
    //--------------------------//
    public function __construct() {
        $this->msg = Message::getInstace() ;
    }

    /**
     * @param $resultReq - результат разбора запроса (см. RequestGo.php)
     */
    public function setResultRequest($resultReq) {
        $this->resultRequest = $resultReq ;
    }
    public function init() {
        $this->typesInit() ;
        $this->rulesInit() ;
    }

    /**
     * инициализация типов запросов
     */
    private function typesInit() {
        $this->requestTypes = [
            'mainProjects' => [
                'comment' => 'запрос к Основным проектам',
                'rule' => 'mainProjectsRule',
                'xmlYandex' => [],                   // атрибуты запроса https://yandex.ru/search/xml
                'result' => null
            ],
            'searchSystem' => [
                'comment' => 'запрос к Посковым системам',
                'rule' => 'searchSystemRule',
                'xmlYandex' => [],                   // атрибуты запроса https://yandex.ru/search/xml
                'result' => null
            ],
            'philosophy' => [
                'comment' => 'философский запрос',
                'rule' => 'philosophyRule',
                'result' => null
            ]
        ] ;
    }

    /**
     * инициализация правил определения типов запроса
     */
    private function rulesInit() {
       $this->typeRules = [
           // главныеПроекты, если в запросе есть "цена", "купить" и т.п.
           'mainProjectsRule' => [
             'operation' => ['OR'],
             'concepts' => [
                 'buy' => ['action','buy'],
                 'price' => ['object','price']
             ]
           ],
           // ПС, если один из вопросов (что, где,когда, .....)
           'searchSystemRule' => [
               'operation' => ['OR'],
               'concepts' => [
                   'questionToSearchSystem' => ['question','questionToSearchSystem'],
                   'price' => ['object','price']
               ]
           ] ,
           // запрос философский, если не определён никакой другой тип
           'philosophyRule' => [
                'default' => true
            ]

       ] ;
    }

    /**
     * вычисление правил определения типов
     */
    public function typeRulesClc() {
        foreach ($this->requestTypes as $requestName => $requestType ) {
            $ruleName = $requestType['rule'] ;
            $this->requestTypes[$requestName]['result'] = $this->ruleClc($requestName,$ruleName) ;
        }
    }
    public function getRequestTypes() {
        return $this->requestTypes ;
    }
    /**
     * правило по конкретному типу
     * @param $requestName   - тип запроса
     * @param $rulName       - имя правила
     * @return bool
     */
    private function ruleClc($requestName,$rulName) {
        $result =false ;
        $rule = $this->typeRules[$rulName] ;
        $operation = (isset($rule['operation'])) ? $rule['operation'] : ['OR'] ; // принимается ИЛИ
        if (isset($rule['concepts'])) {
            $result = $this->conceptsClc($operation,$rule['concepts']) ;
        }
        if (isset($rule['default']) && $rule['default'] ) {
            $result = $this->defaultClc($requestName) ;
        }

        return $result ;
    }

    /**
     * типЗапроса по умолчанию - выполняется только тогда, когда все остальные не выполнимы
     * (result = false)
     * @param $requestName
     * @return bool
     */
    private function defaultClc($requestName) {
        $result = true ;
        foreach ($this->requestTypes as $reqName => $requestType ) {
            if ($reqName === $requestName) {
                continue ;
            }
            $res_i = $this->requestTypes[$reqName]['result'] ;

            if (false !== $res_i) {
                $result = false ;
            }
        }
        return $result ;
    }

    /**
     * поиск в результатах разбора
     * @param $operation - способ объединения в результат (OR | AND)
     * можно будет добавить NOT
     * @param $concepts - ссылки на результат разбора запроса
     * @return bool
     */
    private function conceptsClc($operation,$concepts) {
        $currentOperation = $operation[0] ;
        $result = ($currentOperation == 'OR' ) ? false : true  ;
        foreach ($concepts as $conceptName => $conceptPath) {
            $resI = $this->conceptSearch($conceptPath) ;  // поиск в результате разбора
            if ($currentOperation == 'OR') {
                if ($resI) {
                    $result = true ;
                    break ;
                }
            }
            if ($currentOperation == 'AND') {
                if (!$resI) {
                    $result = false ;
                    break ;
                }
            }
        }
        return $result ;
    }

    /**
     * искать концепт в $resultRequest - результат разбора запроса(см RequestGo)
     * $resultRequest = [partName1 => part1,partName2 => part2,..]
     * part_i = ['concept' => <conceptName>, ......]
     * Достаточно наличие в конкретном разделе элемента 'concept' => <conceptName>
     * раздел = $conceptPath[0],  <conceptName> = $conceptPath[последний элемент]
     * @param $conceptPath
     * @return bool
     */
    private function conceptSearch($conceptPath) {
        $result = false ;
        $requestPartName = $conceptPath[0] ;     // раздел запроса
        $requestConceptName = $conceptPath[count($conceptPath) - 1] ;  // concept - имя
        $partConcepts = $this->resultRequest[$requestPartName] ;
        foreach ($partConcepts as $key => $concept) {
            if ($concept['concept'] === $requestConceptName) {
                $result = true ;
                break ;
            }
        }
        return $result ;
    }
}