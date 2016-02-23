// запуск программы
// paramSet - объект для хранения общих параметров
var paramSet ;
$(document).ready(function(){
    paramSet = new ParamSet();
    paramSet.init() ;
    main = new MainScript() ;
    main.init() ;

} ) ;

