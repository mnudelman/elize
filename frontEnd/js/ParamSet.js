/**
 * Created by mnudelman@yandex.ru on 22.11.15.
 * ОБщие параметры задачи
 */
function ParamSet() {
    //-----------------------------------------------------------------------------//
    this.winLocation ;           // относительный адрес директории запуска
    this.windowLocationHost ;    // http - адрес для доступа к php-модулям БД
    this.dirImages ;
    this.windowLocationHref ;
    //-------------------------------------------------------------------------------------//

    this.ajaxExecute ;   // исполнитель запросов к БД
    //-------------формы----------------------------- //
     this.requestForm ;        // редактирование запроса
     this.requestGoForm ;
     this.responseForm ;
     this.mainProjectsForm ;
    this.philosophyForm ;
    this.userInterface ;
    this.requestGo ;
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

//    this.userProfile = {} ;
    //------ параметры языка отображения --------//
    //this.LANG_RU = 'RU' ;
    //this.LANG_EN = 'EN' ;
    //this.LANG_IMG_RU ;               // пиктограмма языка
    //this.LANG_IMG_EN ;
    //this.currentLang = 'RU' ;        // текущий язык(начальное значение)
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
        var str = window.location.href ;
        // в адресе страницы могут появляться лишние символы "#" или "/#" - это происходит
        // поэтому убираю эти символы
        str = str.replace('/#','') ;
        str = str.replace('#','') ;
        str = str.replace('/index.php','') ;
     //   str = str.replace('/frontEnd','') ;
        _this.windowLocationHost = str ;     //     str.replace('/index.html','') ;
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
//

    } ;


}
