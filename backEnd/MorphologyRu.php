<?php

/**
 * морфологический разбор на основе окончаний слов
 */

class MorphologyRu
{
    private $partsOfSpeech = [];       // части речи
    private $noun = [];       // существительное
    private $adjective = [];           // прилагательное
    private $verb = [];                // глагол
    private $pronaun = [];             // местоимение
    private $wordEnds = [];           // окончания слов
    private $currentPhrase = '' ;     // текущая  фраза
    private $parseResult = [] ;       // результат разбора
    private $words = [] ;             // последовательность слов, подлежащих разбору
    //-----------------------------------------//
    public function __construct() {
        $this->init() ;
    }
    public function init()
    {
        // declension of nouns - склонение
        // nominative case - именительный
        // genitive case - родительный
        // dative case   - дательный
        // accusative case - винительный
        // ablative case   - творительный
        // prepositional case - предложный

        $this->noun = [                           // СУЩЕСТВИТЕЛЬНОЕ
            'only' => [                           // единственное число
                'declension_1' => [               // 1 склонение
                //    'nominative-ends' => ['а', 'я', 'ия'],           // стран-а,земл-я, арм-ия
                    'nominative-ends' => ['ка','ия'],           // стран-а,земл-я, арм-ия
                    'genitive-ends' => ['ы', 'и', 'ии'],
                    'dative-ends' => ['е', 'е', 'ии'],
                    'accusative-ends' => ['у', 'ю', 'ию'],
                    'ablative-ends' => ['ой', 'ей,ёй' ],
                    'prepositional-ends' => ['е', 'е', 'ии']
                ],
                'declension_2' => [               // 2 склонение
                    'nominative-ends' => ['б,в,г,д,ж,к,л,м,н,п,р,с,т,ф,х,ч,ш', 'ий', 'о', 'ле', 'ие', 'ай'], // стол, гений, окно, поле, пение, чай
                    'genitive-ends' => ['а', 'я', 'а', 'я', 'я'],
                    'dative-ends' => ['у', 'ю', 'у', 'ю', 'ю'],
                    'accusative-ends' => ['б,в,г,д,ж,к,л,м,н,р,с,т', 'ия', 'о', 'ле', 'ие'],
                    'ablative-ends' => ['ом', 'ем', 'ом', 'ем', 'ем'],
                    'prepositional-ends' => ['е', 'и', 'е', 'е', 'и']
                ],
                'declension_3' => [               // 3 склонение
                    'nominative-ends' => ['чь,шь,сть,дь'], // ночь, мышь "сть"(жесть,месть - добавил
                    'genitive-ends' => ['чи,ши'],
                    'dative-ends' => ['чи,ши'],
                    'accusative-ends' => ['чь,шь'],
                    'ablative-ends' => ['ью'],
                    'prepositional-ends' => ['чи,ши']
                ],


            ],
            'plural' => [                         // множественное число
                'nominative-ends' => ['ы', 'и', 'а'],    //
                'genitive-ends' => ['ов', 'ей'],
                'dative-ends' => ['ам'],
                'accusative-ends' => ['ов', 'ей'],
                'ablative-ends' => ['ами'],
                'prepositional-ends' => ['ах']

            ]
        ];
        $this->adjective = [                            // ПРИЛАГАТЕЛЬНОЕ
            'only' => [  // единственное число
                'qualitative' => [                    // качественные
                    'nominative-ends' => ['ый', 'ий','ое','ая'],           // круглый, синий,пластиковое
                    'genitive-ends' => ['ого', 'его','вой'],
                    'dative-ends' => ['ому', 'ему','вой'],
                    'accusative-ends' => ['ый', 'ий','ую'],
                    'ablative-ends' => ['ым', 'им','ым','вой'],
                    'prepositional-ends' => ['ом', 'ем','вой']
                ],
                'relative' => [                        // относительное
                    'nominative-ends' => ['ый', 'ий', 'ой'],           // книжный, вчерашний, лесной, ежёвый, складской
                    'genitive-ends' => ['ого', 'его', 'ого'],
                    'dative-ends' => ['ому', 'ему', 'ому'],
                    'accusative-ends' => ['ый', 'ий', 'ой'],
                    'ablative-ends' => ['ым', 'им', 'ым'],
                    'prepositional-ends' => ['ом', 'ем', 'ом']
                ],
                'possessive' => [                        // притяжательное
                    'nominative-ends' => ['ин', 'ов', 'ий'],           // мамин, отцов, лисий
                    'genitive-ends' => ['ого', 'ова', 'его'],
                    'dative-ends' => ['ому', 'ову', 'ему'],
                    'accusative-ends' => ['ин', 'ов', 'ий'],
                    'ablative-ends' => ['иным', 'овым', 'им'],
                    'prepositional-ends' => ['ном', 'овом', 'ем']
                ],

            ],
            'plural' => [                         // множественное число
                'nominative-ends' => ['ые', 'ие', 'ины', 'овы'],           // круглый, синий,
                'genitive-ends' => ['ых', 'их', 'иных', 'овых'],
                'dative-ends' => ['ым', 'ним', 'ным', 'вым'],
                'accusative-ends' => ['ые', 'ие', 'ины', 'овы'],
                'ablative-ends' => ['ыми', 'ими', 'ными', 'выми'],
                'prepositional-ends' => ['ых', 'их', 'иных', 'овых']

            ]
        ];
        $this->pronaun = [                                                    // МЕСТОИМЕНИЕ
            'word' => true,                                                             // полное слово
            'personal' => [                                                              // личные
                'nominative-ends' => ['я', 'ты', 'он', 'она', 'мы', 'вы', 'они'],           //
                'genitive-ends' => ['меня', 'тебя', 'его', 'её,ее', 'нас', 'вас', 'их'],
                'dative-ends' => ['мне', 'тебе', 'ему', 'ей', 'нам', 'вам', 'им'],
                'accusative-ends' => ['меня', 'тебя', 'его', 'её,ее', 'нас', 'вас', 'их'],
                'ablative-ends' => ['мной', 'тобой', 'им', 'ей', 'нами', 'вами', 'ими'],
                'prepositional-ends' => ['мне', 'тебе', 'нём,нем', 'ней', 'нас', 'вас', 'них']

            ],
            'possessive' => [                        // притяжательные
                'nominative-ends' => ['мой,моя,моё,мое', 'твой,твоя,твоё,твое', 'его', 'её,ее', 'наш,наша,наше', 'ваш,ваша,ваше', 'их'],           //
                'genitive-ends' => ['моего,моей,моего', 'твего,твоей,твоего', 'его', 'её,ее', 'нашего', 'вашего', 'ихнего'],
                'dative-ends' => ['моему,моей,моему', 'твоему,твоей,твоему', 'его', 'её,ее', 'нашему', 'вашему', 'ихнему'],
                'accusative-ends' => ['мой,мою,моё,мое', 'твой,твою,твоё,твое', 'его', 'её,ее', 'наш,нашу,наше', 'ваш,вашу,ваше', 'их'],
                'ablative-ends' => ['моим,моей,моим', 'твоим,твоей,твоим', 'его', 'её,ее', 'нашим,нашей,нашим', 'вашим,вашей,вашим', 'их'],
                'prepositional-ends' => ['моём,моей,моём,моем', 'твоём,твоей,твоём,твоем', 'его', 'её,ее',
                    'нашим,нашей,нашим', 'вашим,вашей,вашим', 'их']

            ],
            'question-ends' => ['кто', 'что', 'где', 'когда','зачем','как','какой','каков',
                'сколько','который','кто','куда','откуда','почему','чей']                 // вопросительные(упрощено)
        ];
        $this->verb = [                                                // ГЛАГОЛ
            'infinitive-ends' => ['ть', 'ти', 'чь'],
            'praguerie' => [                                             // спрягаемые
                'firstPerson-ends' => ['у,ю', 'ем', 'у,ю', 'им'],
                'secondPerson-ends' => ['ешь', 'ете', 'ишь', 'ите'],
                'thirdPerson-ends' => ['ет', 'ут,ют', 'ит', 'ат,ят'],
            ],
            'pastTense-ends' => ['ал', 'али', 'ала']
        ];
        $this->partsOfSpeech = [
            'noun' => $this->noun,
            'adjective' => $this->adjective,
            'verb' => $this->verb,
            'pronaun' => $this->pronaun
        ];
        $this->defineWordEnds() ;
    }

    /**
     * по морфологическим описаниям строит список возможных окончаний слов вида
     * $wordEnds = [ 'ends' => [end1,end2,...], 'pars' => [par1,par2,..] 'word' => true ]
     * ends - это список окончаний. pars - это список узлов морфологического дерева, начиная сверху
     * word => true - надо указать, если речь идёт о целом слове
     * например, ['ends':['кто','что','где','когда'], 'pars' => ['pronaun','question'], 'word' => true ]
     */
    public function defineWordEnds()
    {
        $this->wordEnds = [];
        foreach ($this->partsOfSpeech as $partName => $partDescript) {
             $wordFlag = (isset($partDescript['word'])) ? $partDescript['word'] : false ;
             $this->wordEndsOfPart($partName, $partDescript,[$partName],$wordFlag);
        }
    }

    private function wordEndsOfPart($nodeName, $descript, $pars,$wordFlag)
    {
        foreach ($descript as $descriptName => $descriptValue) {
            if ($descriptName == 'word') {
                continue ;
            }
            $pars[] = $descriptName;
            if (mb_strpos($descriptName, '-ends') > 0) {
                $this->wordEnds[] = ['ends' => $descriptValue, 'pars' => $pars, 'word' => $wordFlag];
                array_pop($pars) ;
            } else {
                $this->wordEndsOfPart( $descriptName, $descriptValue, $pars,$wordFlag);
                array_pop($pars) ;
            }
        }
    }

    /**
     * на вход задаётся последовательность слов
     * @param $words
     */
    public function setWords($words){
        if (!is_array($words)) {
            $tmp = $words ;
            $words = [] ;
            $words[] = $tmp ;
        }
        $this->words = $words;
        $this->currentPhrase = implode(' ', $this->words);
    }
    public function parsePhrase() {
        $this->parseResult = [] ;
        foreach ($this->words as $i => $word ) {
            $this->parseResult[$i]['word'] = $word ;
            foreach ($this->wordEnds as $j => $endDescript) {
                if ($this->wordHasEnd($word,$endDescript) ) {
                    $this->parseResult[$i]['pars'][''+$j]['wholeWord'] = $endDescript['word'] ;
                    $this->parseResult[$i]['pars'][''+$j]['pars'] =  $endDescript['pars'] ;
               }
            }
        }
        return $this->parseResult ;
    }
    private function wordHasEnd($word,$endDescript) {
        $wordFlag = (isset($endDescript['word'])) ? $endDescript['word'] : false ;   // слово целиком
        $ends = $endDescript['ends'] ;
        $wordLen = mb_strlen($word) ;
        $result = false ;
        foreach ($ends as $end) {
            if (mb_strpos($end,',') > 0 ) {       // список окончаний
                $subEnds = explode(',',$end) ;
                foreach ($subEnds as $subEnd) {
                    $result = $this->wordHasSimpleEnd($word,$subEnd,$wordFlag) ;
                    if ($result) {
                        break ;
                    }
                }
            }else {
                $result = $this->wordHasSimpleEnd($word,$end,$wordFlag) ;
            }
            if ($result) {
                break ;
            }
        }
        return $result ;

    }
    private function wordHasSimpleEnd($word,$simpleEnd,$wordFlag) {
        $wordLen = mb_strlen($word) ;
        $endLen =  mb_strlen($simpleEnd) ;
        $result = false ;
        if ($wordFlag) {
            $result = ($word === $simpleEnd) ;
        }else {
            $result = (mb_strrpos($word,$simpleEnd) == $wordLen - $endLen ) ;
        }
        return $result ;
    }
    public function getParseResult() {
        return $this->parseResult ;
    }
}