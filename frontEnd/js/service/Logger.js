/**
 * объект, поддерживающий отладку
 * организует вывод отладочной информации в специальный блок
 * вывод регулируется фильтром. Атрибуты фильтра:
 * имя - может задавать имя объекта+метод(функция)
 * уровень - {info | warning | debug | error}
 * уровень stop блокирует вывод сообщений
 */
function Logger() {
    var commonFunc ;    // общие функции
    var currentLevel = {} ;
    var message ;
    var $loggerDiv =$('#logger') ;
    var $loggerDataDiv = $('#loggerData');
    var $closeBt = $('#closeLoggerMessages') ;
    var $stopBt = $('#stopLoggerMessages') ;
    var $clearBt = $('#clearLoggerMessages') ;
    var targets = [] ;
    var messageLevels = {} ;
    var INFO_LEVEL = {name: 'info', lev:0 } ;
    var WARNING_LEVEL = {name: 'warning', lev:10 } ;
    var DEBUG_LEVEL = {name: 'debug', lev:20 } ;
    var ERROR_LEVEL = {name: 'error', lev:30} ;
    var STOP_LEVEL = {name:'stop', lev: 100 } ;  // блокирует все сообщения
    var _this = this ;
    //--------------------//
    this.init = function() {
        messageLevels = {
            i: INFO_LEVEL,
            w: WARNING_LEVEL,
            d: DEBUG_LEVEL,
            e: ERROR_LEVEL,
            s: STOP_LEVEL
        } ;
        currentLevel =  DEBUG_LEVEL ; //
        targets = [
           'ajaxExecutor'
//            'philosophy'
        ] ;
        loggerDivInit() ;
        commonFunc = paramSet.commonFunc ;
    } ;
    /**
     * блок вывода сообщений
     */
    var loggerDivInit = function() {
        $loggerDataDiv.empty();
        $loggerDataDiv.removeAttr('hidden');
        $closeBt.off('click');
        $closeBt.click(function () {
            $loggerDiv.attr('hidden', 'hidden');
        });
        $stopBt.off('click');
        $stopBt.click(function () {
            currentLevel = STOP_LEVEL ;
        });
        $clearBt.off('click');
        $clearBt.click(function () {
            _this.logClear() ;
        });
    } ;
    this.logClear = function() {
        $loggerDataDiv.empty() ;
    } ;
    /**
     * вывод сообщения
     * если сообщение-объект, то при выводе производится разбор
     * @param text
     * @param title
     * @param targetName
     * @param levelName
     */
    this.message = function(text,title,targetName,levelName) {
        if (logFilter(targetName,levelName)) {
            putMessage(text,title,targetName,levelName) ;
            if ($loggerDiv.attr('hidden') !== undefined) {
                $loggerDiv.removeAttr('hidden') ;
            }
        }
    } ;
    /**
     * фильтр вывода сообщений.
     * имя источника должно быть в списке источников &&
     * уровень сообщения должен быть >=  установленного уровня
     * @param targetName
     * @param levelName
     * @returns {boolean}
     */
    var logFilter = function(targetName,levelName) {
        if (currentLevel == STOP_LEVEL) {
            return false
        }
//        targetName = targetName.toLowerCase() ;
        var targetFlag =  (targets.indexOf(targetName) >= 0 ) ;
        var levelFlag= false ;
        var levLetter = (levelName.toLowerCase()).substr(0,1) ;
        if (messageLevels[levLetter] !== undefined) {
            var targetLev = messageLevels[levLetter] ;
            levelFlag = (targetLev.lev >= currentLevel.lev)
        }

        return targetFlag && levelFlag ;
    } ;
    /**
     * вывод в блок. Если сообщение-объект, то
     * выподняется разбор
     * @param text
     * @param title
     * @param targetName
     * @param levelName
     */
    var putMessage = function(text,title,targetName,levelName) {
        var space = '-------' ;
        if (typeof(title) == 'string') {
            var titleText = '<strong>' + title + '</strong>' ;
            $loggerDataDiv.append(titleText) ;
        }
        if (typeof(targetName) == 'string') {
            var targetText = space + '<strong>target:' + targetName + '</strong>' ;
            $loggerDataDiv.append(targetText) ;
        }
        if (typeof(levelName) == 'string') {
            var levelText = space + '<strong>level:' + levelName + '</strong>' ;
            $loggerDataDiv.append(levelText) ;
        }
        $loggerDataDiv.append('<br>') ;
        commonFunc.parseText($loggerDataDiv,text) ;
    };
 }
