/**
 * ОБщие параметры задачи
 */
function ParamSet() {
    //-----------------------------------------------------------------------------//
    this.winLocation ;           // относительный адрес директории запуска
    this.windowLocationHost ;    // http - адрес для доступа к php-модулям БД
    this.dirImages ;             // картинки задачи
    this.windowLocationHref ;
    //-------------------------------------------------------------------------------------//

    this.ajaxExecute ;   // исполнитель запросов ajax
    //-------------формы----------------------------- //
     this.requestForm ;        // редактирование запроса
     this.requestGoForm ;      // исполнение запроса
     this.responseForm ;       // запрос к поисковой системе
     this.mainProjectsForm ;   // запрос к основным проектам(mnogonado.net)
    this.philosophyForm ;      // абстрактный запрос
    this.userInterface ;       // объект-контроллер пользователя
    this.requestGo ;           // исполнение( определение типа запроса)
    this.backgroundImage;      // объект - основной фон и его элементы
    this.scrollBackground ;    //  объект  -фок результата запроса
    this.magicNormalPictures ; // вывод картинок при вводе запроса
    this.callStack ;           // стек вызовов
    this.placeholder ;         // объект-имитатор placeholder
    this.actionSteps ;         // отслеживание шагов действия
    this.geoLocation ;        // определение ближайшего города
    //-------------------------------------------------//
    this.user = {
        login : 'guest',
        password : '',
        status : 5 ,
        successfulEnter : false
    } ;
    /** статус определяет функциональные возможности */
    this.USER_STAT_ADMIN = 99;  // создание новых разделов, групповое добавление картинок
    this.USER_STAT_USER = 10;        // добавление картинок по одной
    this.USER_STAT_GUEST = 5;      // только просмотр

    this.currentForm = '' ;          // текущая активная форма
    //------------------------------------------ //
    var _this = this ;

    this.init = function() {
        // параметры варианта и уровня //
        var arr = window.location.pathname.split('/') ;
        var path = '' ;
        for (var i = 1; i < arr.length - 1; i++) {
            path += '/'+arr[i] ;
        }
        _this.winLocation = path ;
        _this.windowLocationHref = window.location.href ;
        _this.windowLocationHost = window.location.origin +  path ;     //     str.replace('/index.html','') ;
        var url = _this.windowLocationHost+'/backEnd' ;
        _this.ajaxExecute = new AjaxExecutor(url) ;

        _this.dirImages =  _this.windowLocationHost+'/images' ;
// ---Формы ---------

        _this.requestForm = new RequestForm()  ;
        _this.requestGoForm = new RequestGoForm() ;
        _this.responseForm = new ResponseForm() ;
        _this.mainProjectsForm = new MainProjectsForm() ;
        _this.philosophyForm = new PhilosophyForm() ;
        _this.userInterface = new UserInterface() ;
        _this.requestGo = new RequestGo() ;
        _this.backgroundImage = new BackgroundImg() ;
        _this.scrollBackground = new ScrollBackground();
        _this.magicNormalPictures = new MagicNormalPictures() ;
        _this.callStack = new CallStack() ;
        _this.placeholder = new Placeholder() ;
        _this.actionSteps = new ActionSteps() ;
        _this.geoLocation  = new GeoLocation() ;        // определение ближайшего города
//


    } ;
    this.setCurrentForm = function(form) {
        _this.currentForm = form ;
    } ;
    this.getCurrentForm = function() {
       return _this.currentForm ;
    }


}
