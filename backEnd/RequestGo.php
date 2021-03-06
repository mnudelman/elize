<?php
/**
 * Исполнитель - это разбор запроса в соответствии с деревом описания $requestTree
 */

class RequestGo {
    private $sourcePhrase = '' ;          // исходная фраза

    private $phraseWords = [] ;           // разбитая на слова фраза
    private $clearPhrase = '' ;           // исходная фраза без лишних символов
    private $resultRequest = [] ;         // результат разбора
    //-------------------------------------------//
    private $msg ;                        // формирование списка сообщений
    private $requestTree = [] ;           // дерево запроса
    private $NODE_CONCEPT = 'concept' ;   // тип узла - понятие
    private $currentConcepts = [] ;       // список определённых понятий раздела запроса
    //-------------------------------//
    private $REGULAR_EXPRESSION_BRACKET = '/' ;  // скобка регулярного выражения
    private $conceptFunction ;                   // объект выполнения функций, определяющих понятие
    public function __construct($nodeRootName) {
        $this->msg = Message::getInstace() ;
        $taskPar = TaskParameters::getInstance() ;
        $nodeRootName = (false === $nodeRootName) ? 'requestRoot' : $nodeRootName ;
        $requestTree = new RequestTree() ;
        $requestTree->setNodeRoot($nodeRootName) ;      // имя корня
        $answ = $requestTree->uploadTree() ;
        $this->requestTree = $answ['nodes'] ;
        $this->conceptFunction = new ConceptFunction() ;

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
            'question' => [],          // раздел запроса - ВОПРОС
            'subject'  => [],          // раздел запроса - СУБЪЕКТ
            'action' => [],          // раздел запроса - ДЕЙСТВИЕ
            'object' => []         // раздел запроса - ОБЪЕКТ
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
     * убирает из запроса все лишние символы и разбивает на слова
     * @param $phrase
     */
    private function phraseWords() {
        $arr = [] ;
        $phrase = trim($this->sourcePhrase)   ;
        $phrase = preg_replace("/[\.,!?-]/",' ',$phrase) ;    //знаки припинания, -
        $phrase = trim($phrase) ;
        $phrase = preg_replace("/\s{1,}/",' ',$phrase) ;      // лишние пробелы
        $phrase = mb_strtolower($phrase) ;
        $phrase = trim($phrase) ;
        $this->clearPhrase = ' '.$phrase.' ' ;
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
        //    $this->resultRequest[$partName]['concepts'] = $this->currentConcepts;
            // переносим concept напрямую в раздел запроса
            for ($i=0; $i < count($this->currentConcepts); $i++) {
                $this->resultRequest[$partName][] = $this->currentConcepts[$i] ;
            }
        }
    }
    public function getResult() {
        return [
            'successful' => true,
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
     * @param $nodeId - ид текущего узла
     * @param array $path - путь от корня дерева до текущего узла
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
                    $concept['valid'] = $childNode['data']['valid'] ;
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
            $type = $synonymNode['type'] ;
            $firstSymb = mb_substr($synonymWord,0,1) ;
            $lastSymb = mb_substr($synonymWord,mb_strlen($synonymWord)-1,1) ;

            if ($firstSymb === $this->REGULAR_EXPRESSION_BRACKET &&
                $lastSymb == $this->REGULAR_EXPRESSION_BRACKET) {
                $type = 'regularExpression' ;
            }

            $result = ['find' => false,'synonym' => $synonymWord] ;


            switch ($type) {
                case 'synonym' : {
                    $findFlag = $this->synonymFind($synonymWord) ;
                    $findWord = $synonymWord ;
                    break ;
                }
                case 'function' : {
                    $result = $this->conceptFunction->
                                   functionExecute($functName = $synonymWord,$this->phraseWords) ;
                    $findFlag = $result['find'] ;
                    $findWord = $result['word'] ;
                    break ;
                }
                case 'regularExpression' : {
                    $findFlag = $this->regularExpressionFind($regExp = $synonymWord) ;
                    $findWord = $synonymWord ;
                    break ;
                }
            }
            if ($findFlag) {     // слово  найдено
                break ;
            }
        }
        return ['find' => $findFlag, 'synonym' => $findWord] ;
    }

    /**
     * поиск по регулярному выражению
     * при использовании функций mb_... обрамляющие символы из regExp надо убрать
     * @param $regExp
     * @return bool
     */
    private function regularExpressionFind($regExp) {
        $firstSymb = mb_substr($regExp,0,1) ;
        $lastSymb = mb_substr($regExp,mb_strlen($regExp)-1,1) ;
        if ($firstSymb === $this->REGULAR_EXPRESSION_BRACKET &&
            $lastSymb == $this->REGULAR_EXPRESSION_BRACKET) {
            $regExp = mb_substr($regExp,1,mb_strlen($regExp)-2) ;
        }
     //   $result = preg_match($regExp,$this->clearPhrase,$arr) ;
        $result = mb_ereg_match($regExp,$this->clearPhrase) ;
        return $result  ;
    }

    /**
     * Ищет конкретное слово
     * @param $synonymWord
     * @return array
     */
    private function synonymFind($synonymWord) {
        $findFlag = false ;
        if  (mb_strpos($synonymWord,',') > 0) {        // альтернативные значения
            $findFlag = $this->alternativeWordsFind($synonymWord) ;
        } else if (mb_strpos($synonymWord,' ') > 0) {     // несколько слов вместе
            $findFlag = $this->sequenceWordsFind($synonymWord) ;
        } else {                                    // единственное слово
            $findFlag = $this->simpleWordFind($synonymWord) ;
            $findFlag = (false === $findFlag ) ? false : true ;
        }
        return $findFlag ;
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