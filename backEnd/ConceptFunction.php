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
               $result =  $this->ru_names();
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

}