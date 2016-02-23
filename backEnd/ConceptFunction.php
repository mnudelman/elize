<?php
/**
 *  класс - набор функций, определяющих понятия(concept) запроса
 */

class ConceptFunction
{
    private $functList = ['ru_names'];      // список определённых функций
    private $phraseWords =[] ;              // список слов запроса
    private $db ;                     // объект для обращений к БД
    private $msg ;                    // формирование сообщений

    //----------------------------//
    public function __construct() {
        $this->db= new RequestTree_db() ;
        $this->msg = Message::getInstace() ;
    }
    public function functionExecute($functName,$phraseWords)
    {
        $this->phraseWords = $phraseWords ;
        $result = [] ;
        switch ($functName) {
            case 'ru_names' : {
                $result = $this->ru_names();
                break;
            }
            case 'one_word_noun' : {
                $result = $this->findNoun() ;
            }
        }
        return $result ;
    }

    /**
     * поиск имён собственных в запросе
     */
    private function ru_names() {
        $result = ['find'=>false, 'word' => ''] ;
        for ($i = 0; $i < count($this->phraseWords); $i++){
            $word = $this->phraseWords[$i] ;
            $firstLetter = mb_strtoupper( mb_substr($word,0,1)) ;
            $word = $firstLetter.mb_substr($word,1) ;
            $result = $this->db->findRuNameSynonym($word) ;
            if (isset($result['find']) && $result['find']) {
                break ;
            }

        }
        return $result ;
    }

    /**
     * определить существительное.
     *  ru_names является более приоретентным
     * фраза соответсвует правилу, если состоит из единственного слова в именительном
     * падеже едиств числа
     * @return array
     */
    private function findNoun() {
        $result = ['find'=>false, 'word' => ''] ;

        if (sizeof($this->phraseWords) !== 1) {
            return $result ;
        }
        //--- проверить ru_names -- //
        $resNames = $this->ru_names() ;
        if ($resNames['find'] === true) {
            return $result ;
        }
        $morphology = new MorphologyRu() ;
        $morphology->init() ;
        $morphology->setWords($this->phraseWords) ;



        $parseResult = $morphology->parsePhrase() ;
        // ищем сушествительное - в первом ( единственном слове)
        $pars = $parseResult[0]['pars'] ;
        $word = $parseResult[0]['word'] ;
        if (!is_array($pars)) {
            return $result ;
        }
        foreach ($pars as $i => $item) {
            $parsItem = $item['pars'] ;
            if (
                ($parsItem[0] === 'noun' &&                // существительное
                $parsItem[1] === 'only' &&                // единственное число
                $parsItem[3] === 'nominative-ends'        // иминительный падеж
                ) ||
                ($parsItem[0] === 'noun' &&                // существительное
                $parsItem[1] === 'plural' &&               //допустим множ число
                $parsItem[2] === 'nominative-ends'        // иминительный падеж
                )
            ) {
                $result = ['find'=>true, 'word' => $word] ;
                break ;
            }
        }

        return $result ;
    }

}