<?php
/**
 * Разбор запроса
 * Реализуется модель запроса: Субъект - действие - объект
 * Субъект - всегда пользователь
 * Действие - это что-то из списка: купить, узнать, посмотреть, получить, .....
 * Объект - то на чтонаправлено действие: цена товара, сам товар, услуга, ....
 * Исходный запрос разбивается на отдельные слова. По совпадению ключевых слов
 * заполняются составные части запроса.
 * По заполненности частей запроса и наличию(отсутствию) компонентов принимается решение о
 * допустимости запроса.
 * Для явного указания на недопустимость компоненты запроса служит атрибут 'valid' (при отсутствии true,
 * при необходимости можно задать 'valid' => false
 * Это текст - прототип для отладки механизма выделения частей запроса.
 * Далее методы findWord и связанные с ним заменить на обращения к БД.
 */

class RequestParse {
    private $sourcePhrase = '' ;          // исходная фраза
    private $phraseWords = [] ;           // разбитая на слова фраза
    private $resultRequest = [] ;         // результат разбора
    private $baseSubjects = [] ;           // субъект запроса
    private $baseObjects = [] ;           // базовые объекты
    private $baseActions = [] ;           // базовые действия
    private $baseRequest = [] ;           // базовые запросы
    private $baseQuestions = [] ;         // вопросительные местоимения
    //-------------------------------------------//
    private $SUFFIX_SIN = '-sin' ;        // окончание имени описателя, указывающего на список слов
    private $currentParseVect = [] ;      // текущий поиск компоненты запроса
    //------------------------------------------//

    public function init() {
        $this->baseSubjects = [
            'user'.$this->SUFFIX_SIN => ['хочу','хотелось бы','покажите']
        ] ;
        $this->baseActions = [
            'buy'.$this->SUFFIX_SIN => ['купить','приобрести','получить'],
            'look'.$this->SUFFIX_SIN => ['узнать','посмотреть','ознакомиться','покажите мне'],
            'order'.$this->SUFFIX_SIN => ['заказать','заказывать','сделать заказ']
        ] ;
        $this->baseObjects = [
            'price'.$this->SUFFIX_SIN => ['цена,цены,ценами','по цене','по какой цене','сколько стоит','стоимость'],
            'repairman'.$this->SUFFIX_SIN => ['мастер по ремонту','специалист по ремонту','электрик','сантехник'],
            'product' => [
                'fridge'.$this->SUFFIX_SIN => ['холодильник','морозильник'],
                'tvset'.$this->SUFFIX_SIN => ['телевизор,телевизоры,телевизоров,телевизора','плазма,плазмы'],
                'washer'.$this->SUFFIX_SIN => ['стиральная машина','стиральную машину'],
                'computer'.$this->SUFFIX_SIN => ['компьютер,компьютеры','комп','планшет','ноутбук'],
            ],
            'place' => [
                'validplace' => [
                    'list'.$this->SUFFIX_SIN => ['Оренбург,оренбурге','Челябинск,челябинске']
                ],
                'novalidplace' => [
                    'valid' => false,
                    'list'.$this->SUFFIX_SIN => ['Москва,москве','сочи']
                ]
            ],
            'service'.$this->SUFFIX_SIN => ['репититор,репититора','преподаватель,преподавателя','учитель,учителя']

        ] ;
        $this->baseQuestions = [
            'place'.$this->SUFFIX_SIN => ['где','куда','откуда'],
            'what'.$this->SUFFIX_SIN  => ['что','какой','каков','который',],
            'why'.$this->SUFFIX_SIN => ['почему','зачем','как']
        ] ;

        $this->baseRequest = [
            'question' => [
                'type' =>'what',
                'words' => []
            ],
            'subject'  => [
                'type' => 'user',
                'words' => []
            ],
            'action' => [
                'type' => 'look',
                'words' => []
            ],
            'object' => []
        ] ;
    }

    /**
     * Задать текст запроса
     * Убрать лишние прбелы, знаки припинания
     * @param $phrase
     */
    public function setPhrase($phrase) {
        $phrase = str_replace('.', ' ', $phrase);
        $phrase = str_replace(',', ' ', $phrase);
        $phrase = str_replace('?', ' ', $phrase);
        $phrase = str_replace('!', ' ', $phrase);
        $phrase = str_replace('-', ' ', $phrase);
        $phrase = trim($phrase) ;
        while (mb_strpos($phrase,'  ')) {
            $phrase = str_replace('  ', ' ', $phrase);
        }
        $this->sourcePhrase = mb_strtolower($phrase) ;

        $this->phraseWords = explode(' ',$this->sourcePhrase) ;
    }

    /**
     * Выполнить разбор запроса
     * @return array
     */
    public function parseDo() {
        $this->resultRequest = $this->baseRequest ;
        $question = $this->parsePart($this->baseQuestions) ;
        $this->resultRequest['question'] = $this->currentParseVect ;
        $subject = $this->parsePart($this->baseSubjects) ;
        $this->resultRequest['subject'] = $this->currentParseVect ;

        $action = $this->parsePart($this->baseActions) ;
        $this->resultRequest['action'] = $this->currentParseVect ;

        $object = $this->parsePart($this->baseObjects) ;
        $this->resultRequest['object'] = $this->currentParseVect ;
        $this->defaultParts() ;        // для пустых установить умолчание
        return $this->resultRequest ;
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
    private function parsePart($partDescript,$path=[]) {
        if (count($path) == 0 ) {              // первый вход
            $this->currentParseVect = [] ;
        }
        $suffLen = mb_strlen($this->SUFFIX_SIN) ;
        foreach ($partDescript as $descriptName => $descriptValue) {
            if (!is_array($descriptValue)) {
                continue ;
            }
            $path[] = $descriptName ;
            if (mb_strrpos($descriptName,$this->SUFFIX_SIN) === mb_strlen($descriptName) - $suffLen ) {
                $findRes = $this->findWord($descriptValue) ;
                if (isset($findRes['find']) && $findRes['find'] ) {
                    $findFlag = true ;
                    $this->currentParseVect[] = [
                        'path' => $path,
                        'words' => $findRes['words']
                    ] ;
                }

            }else {
                $this->parsePart($descriptValue,$path) ;   // рекурсивный вызов
            }
            array_pop($path) ;
        }

    }

    /**
     * Поиск среди слов запроса хотя бы одно, совпадающее с word_i  из списка $wordList
     * @param $wordList  - массив слов [word1,word2,..]
     * @return array   - ['find' => true | false, 'word' => слово из запроса]
     */
    private function findWord($wordList) {
        $findFlag = false ;
        $findWord = '' ;
        foreach ($wordList as $wordItem) {
            $wordItem = trim($wordItem) ;
            if  (mb_strpos($wordItem,',') > 0) {        // альтернативные значения
                $findFlag = $this->alternativeWordsFind($wordItem) ;
            } else if (mb_strpos($wordItem,' ') > 0) {     // несколько слов вместе
                   $findFlag = $this->sequenceWordsFind($wordItem) ;
            } else {                                    // единственное слово
                $findFlag = $this->simpleWordFind($wordItem) ;
                $findFlag = (false === $findFlag ) ? false : true ;
            }
            if ($findFlag) {                 // поиск закончен
                $findWord = $wordItem ;
                break ;
            }
        }
        return ['find' => $findFlag, 'words' => $findWord] ;
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