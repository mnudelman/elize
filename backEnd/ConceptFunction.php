<?php
/**
 *  класс - набор функций, определяющих понятия(concept) запроса
 */

class ConceptFunction
{
    private $functList = ['ru_names'];      // список определённых функций
    private $phraseWords = [];              // список слов запроса
    private $db;                     // объект для обращений к БД
    private $msg;                    // формирование сообщений

    //----------------------------//
    public function __construct()
    {
        $this->db = new RequestTree_db();
        $this->msg = Message::getInstace();
    }

    public function functionExecute($functName, $phraseWords)
    {
        $this->phraseWords = $phraseWords;
        $result = [];
        switch ($functName) {
            case 'ru_names' : {
                $result = $this->ru_names();
                break;
            }
            case 'one_word_noun' : {
                $result = $this->findNoun();
                break ;
            }
            case 'adjective_noun': {
                $result = $this->adjectivePlusNoun() ;
            }
        }
        return $result;
    }

    /**
     * поиск имён собственных в запросе
     */
    private function ru_names()
    {
        $result = ['find' => false, 'word' => ''];
        for ($i = 0; $i < count($this->phraseWords); $i++) {
            $word = $this->phraseWords[$i];
            $firstLetter = mb_strtoupper(mb_substr($word, 0, 1));
            $word = $firstLetter . mb_substr($word, 1);
            $result = $this->db->findRuNameSynonym($word);
            if (isset($result['find']) && $result['find']) {
                break;
            }

        }
        return $result;
    }

    /**
     * определить существительное.
     *  ru_names является более приоретентным
     * фраза соответсвует правилу, если состоит из единственного слова в именительном
     * падеже едиств числа
     * @return array
     */
    private function findNoun()
    {
        $result = ['find' => false, 'word' => ''];

        if (sizeof($this->phraseWords) !== 1) {
            return $result;
        }
        //--- проверить ru_names -- //
        $resNames = $this->ru_names();
        if ($resNames['find'] === true) {
            return $result;
        }
        $morphology = new MorphologyRu();
        $morphology->init();
        $morphology->setWords($this->phraseWords);


        $parseResult = $morphology->parsePhrase();
        // ищем сушествительное - в первом ( единственном слове)
        $pars = $parseResult[0]['pars'];
        $word = $parseResult[0]['word'];
        if (!is_array($pars)) {
            return $result;
        }
        foreach ($pars as $i => $item) {
            $parsItem = $item['pars'];
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
                $result = ['find' => true, 'word' => $word];
                break;
            }
        }

        return $result;
    }

    /**
     *  пара прилагательное+существительное именительного радежа
     */
    private function adjectivePlusNoun() {
        $result = ['find' => false, 'word' => ''];

        if (sizeof($this->phraseWords) !== 2) {
            return $result;
        }
        //--- проверить ru_names -- //
        $resNames = $this->ru_names();
        if ($resNames['find'] === true) {
            return $result;
        }
        $morphology = new MorphologyRu();
        $morphology->init();
        $morphology->setWords($this->phraseWords);


        $parseResult = $morphology->parsePhrase();
        $twoWords = ['noun' => false, 'adjective' => false] ;
        $twoWordsTotal = [] ;
        $twoWordsTotal[0] = $twoWords ;
        $twoWordsTotal[1] = $twoWords ;
        for ($i = 0 ; $i < 2 ; $i++) {
            $pars = $parseResult[$i]['pars'];

            if (!is_array($pars)) {     // не распознано
                break ;
            }

            foreach ($pars as $j => $item) {
                $parsItem = $item['pars'];
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
                    $twoWordsTotal[$i]['noun'] = true ;
//                    break;
                }
                if (
                    ($parsItem[0] === 'adjective' &&                // существительное
                        $parsItem[1] === 'only' &&                // единственное число
                        $parsItem[3] === 'nominative-ends'        // иминительный падеж
                    ) ||
                    ($parsItem[0] === 'adjective' &&                // существительное
                        $parsItem[1] === 'plural' &&               //допустим множ число
                        $parsItem[2] === 'nominative-ends'        // иминительный падеж
                    )
                ) {
                    $twoWordsTotal[$i]['adjective'] = true ;
//                    break;
                }

            }
         }
        // складываем
        $twoWords['noun'] = $twoWordsTotal[0]['noun'] || $twoWordsTotal[1]['noun'] ;
        $twoWords['adjective'] = $twoWordsTotal[0]['adjective'] || $twoWordsTotal[1]['adjective'] ;

        if ($twoWords['noun'] &&  $twoWords['adjective']) {
            $result = [
                'find' => true,
                'word' => implode(",", $this->phraseWords)] ;
        }


        return $result;

    }
}