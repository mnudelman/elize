<?php
/**
 * Исполнитель запроса
 */

class RequestGo {
    private $sourcePhrase = '' ;          // исходная фраза
    private $phraseWords = [] ;           // разбитая на слова фраза
    private $resultRequest = [] ;         // результат разбора
    //-------------------------------------------//
    private $msg ;                        // формирование списка сообщений
    private $requestTree = [] ;           // дерево запроса
    private $NODE_CONCEPT = 'concept' ;   // тип узла - понятие
    private $currentConcepts = [] ;       // список определённых понятий раздела запроса
    //-------------------------------//
    public function __construct($nodeRootName) {
        $this->msg = Message::getInstace() ;
        $taskPar = TaskParameters::getInstance() ;
//        $nodeRootName = $taskPar->getParameter('nodeRoot') ;
        $nodeRootName = (false === $nodeRootName) ? 'requestRoot' : $nodeRootName ;
        $requestTree = new RequestTree() ;
        $requestTree->setNodeRoot($nodeRootName) ;      // имя корня
        $answ = $requestTree->uploadTree() ;
        $this->requestTree = $answ['nodes'] ;
    }
    public  function getRequestTree() {
        return $this->requestTree ;
    }
    /**
     * возвращает пустой результат
     * @return array
     */
    private function getEmptyResult() {
        return [
            'question' => [          // раздел запроса - ВОПРОС
                'concepts' => []
            ],
            'subject'  => [          // раздел запроса - СУБЪЕКТ
                'concepts' => []
            ],
            'action' => [          // раздел запроса - ДЕЙСТВИЕ
                'concepts' => []
            ],
            'object' => [         // раздел запроса - ОБЪЕКТ
                'concepts' => []
            ]
        ] ;
    }

    /**
     * возвращает пустой concept
     * @return array
     */
    private function getEmptyConcept() {
        return ['conceptPath' => [],    // путь по дереву до уровня concept
            'concept' => '',            // понятие
            'synonym' => [] ,           // синоним, по которому определёно понятие
            'words' => [],              // слова запроса, совпавшие с синонимом
            'valid' => true
        ] ;
    }
    /**
     * Задать текст запроса
     * Убрать лишние прбелы, знаки припинания
     * @param $phrase
     */
    private function phraseWords() {
        $phrase = $this->sourcePhrase   ;
        $phrase = str_replace('.', ' ', $phrase);
        $phrase = str_replace(',', ' ', $phrase);
        $phrase = str_replace('?', ' ', $phrase);
        $phrase = str_replace('!', ' ', $phrase);
        $phrase = str_replace('-', ' ', $phrase);
        $phrase = trim($phrase) ;
        while (mb_strpos($phrase,'  ')) {
            $phrase = str_replace('  ', ' ', $phrase);
        }
        $phrase = mb_strtolower($phrase) ;
        $phrase = strtolower($phrase) ;
        $this->phraseWords = explode(' ',$phrase) ;
    }

    /**
     * Выполнить разбор запроса
     * @return array
     */
    public function parseDo($phrase)
    {
        $this->sourcePhrase = $phrase;

        $this->phraseWords();

        $this->resultRequest = $this->getEmptyResult();
        foreach ($this->resultRequest as $partName => $part) {
            $subTreeRootId = $this->getSubTreeRootId($partName);
            $this->currentConcepts = [];
            $this->parsePart($subTreeRootId, []);
            $this->resultRequest[$partName]['concepts'] = $this->currentConcepts;
        }

        //       $this->defaultParts() ;        // для пустых установить умолчание
//        return [
//            'successful' => true,
//            'requestText' => $this->sourcePhrase,
//            'result' => true                //     $this->resultRequest
//        ];
//        return ['result' => $this->resultRequest];
    }
    public function getResult() {
        return [
            'requestText' =>  $this->sourcePhrase,
            'result' => $this->resultRequest,                                 ///true
            'phraseWords' => $this->phraseWords
        ] ;
    }

    /**
     * построить поддерево от корня,
     * @param $rootNodeType - тип корневого узла для поддерева
     */
    private function getSubTreeRootId($rootNodeType) {
        $subTreeRootId = false ;
        foreach($this->requestTree as $nodeId => $node) {
            if ($node['type'] === $rootNodeType) {
                $subTreeRootId = $nodeId ;
                break ;
            }
        }
        return $subTreeRootId ;
    }
    /**
     * Установить умолчание для пустых разделов
     *
     */
    private function defaultParts() {
        if (count($this->resultRequest['subject']) == 0 ) {
            $this->resultRequest['subject']['path'] = ['user'] ;   // субъект всегда user
            $this->resultRequest['subject']['words'] = '' ;
            $this->resultRequest['subject']['default'] = true ;
        }
        if (count($this->resultRequest['action']) == 0 ) {
            $this->resultRequest['action']['path'] = ['look'] ;    // действие по умрлчанию - look - просмотр
            $this->resultRequest['action']['words'] = '' ;
            $this->resultRequest['action']['default'] = true ;
        }

    }
    /**
     * Разбор составной части запроса(субъект, действие, объект)
     * @param $partDescript
     * @param array $path
     */
    private function parsePart($nodeId,$path) {
        $currentNode = $this->requestTree[$nodeId] ;
        if (count($path) == 0 ) {              // первый вход
            $this->currentConcepts = [] ;
            $path[] = $currentNode['text'] ;
        }

        $childNodes = $currentNode['data']['dbChildId'] ;   // список дочерних узлов
        foreach ($childNodes as $key => $childNodeId) {
            $childNode = $this->requestTree[$childNodeId] ;
            $path[] = $childNode['text'] ;
            $type =  $childNode['type'] ;
            if ($type == $this->NODE_CONCEPT) {
                $findRes = $this->findConcept($childNodeId) ;
                if (isset($findRes['find']) && $findRes['find'] ) {
                    $concept = $this->getEmptyConcept() ;
                    $concept['conceptPath'] = $path ;
                    $concept['concept'] = $childNode['text'] ;
                    $concept['synonym'] = $findRes['synonym'] ;
 //                   $concept['words'] = $findRes['words'] ;
                    $this->currentConcepts[] = $concept ;
                }
            } else {
                $this->parsePart($childNodeId,$path) ;         // рекурсивный вызов
            }
            array_pop($path) ;
        }
        return true ;
    }

    /**
     * ищет совпадений в тексте запроса с синонимами Понятия
     * @param $nodeId - узел с типом == 'concept'
     */
    private function findConcept($nodeId) {
        $synonymIdList = $this->requestTree[$nodeId]['data']['dbChildId'] ;
        $findWord = '' ;
        $findFlag = false ;
        foreach ($synonymIdList as $key=> $synonymId) {
            $synonymNode = $this->requestTree[$synonymId] ;
            $synonymWord = $synonymNode['text'] ;
            if  (mb_strpos($synonymWord,',') > 0) {        // альтернативные значения
                $findFlag = $this->alternativeWordsFind($synonymWord) ;
            } else if (mb_strpos($synonymWord,' ') > 0) {     // несколько слов вместе
                $findFlag = $this->sequenceWordsFind($synonymWord) ;
            } else {                                    // единственное слово
                $findFlag = $this->simpleWordFind($synonymWord) ;
                $findFlag = (false === $findFlag ) ? false : true ;
            }
            if ($findFlag) {                 // поиск закончен
                $findWord = $synonymWord ;
                break ;
            }
        }
        return ['find' => $findFlag, 'synonym' => $findWord] ;
    }
    /**
     * поиск конкретного слова в запросе
     * @param $wordItem
     */
    private function simpleWordFind($wordItem) {
        return array_search($wordItem, $this->phraseWords);
    }

    /**
     * искать цепочку слов
     * @param $wordSequence - цепочка слов
     */
    private function sequenceWordsFind($wordSequence)
    {
        $wordIndex = -1;
        $result = true ;
        $words = explode(' ', $wordSequence);
        for ($i = 0; $i < count($words); $i++ ) {
            $ind = $this->simpleWordFind($words[$i]) ;
            if (false === $ind || $ind <= $wordIndex) {
                $result = false ;
                break ;
            }
            $wordIndex = (false === $ind) ? -1: $ind ;
        }
        return $result ;
    }

    /**
     * поиск слова одного из списка возможных значений
     * @param $wordList
     */
    private function alternativeWordsFind($wordList) {
        $ind = false ;
        $words = explode(',',$wordList) ;
        foreach ($words as $word) {
            $ind = $this->simpleWordFind($word) ;
            if ( false === $ind ) {
                continue ;
            }
            break ;
        }
        return $ind ;
    }

}