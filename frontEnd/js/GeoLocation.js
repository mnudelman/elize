/**
 * Определение координат(широта, долгота) по ip-адресу
 * используется сервис api-maps.yandex
 */
function GeoLocation() {
    var ajax = new AjaxRequest() ;         // исполнитель работы с ajax
    var latitude ;        // широта
    var longitude ;       // долгота
    var city ;
    var _this = this ;
    //--------------------------//
    this.init = function() {
        city = cityDefault() ;
        calcLocation() ;
        var tmpTimer = setInterval(function () {
            var geoLoc = _this.getGeoLocation() ;
            if (geoLoc.lat !== undefined && geoLoc.long !== undefined) {
                clearInterval(tmpTimer);
                clcCity() ;
            }
        }, 300);
    } ;
    var calcLocation = function() {
        ymaps.ready(function(){
            ymaps.geolocation.get({
                provider: 'yandex'

            }).
                then(function(result){
                    var coord=result.geoObjects.get(0).properties.get('boundedBy');
                    latitude = (coord[0][0]+coord[1][0])/2;
                    longitude = (coord[0][1]+coord[1][1])/2;
                }) ;
        }) ;
    } ;
    this.getGeoLocation = function() {
        return {
            lat: latitude,
            long: longitude
        }
    };
    this.getCity = function() {
        return city ;
    } ;
    var clcCity = function() {

        var goVect = {
            'operation': 'geoLocation',
            'lat': latitude,
            'long': longitude,
            'successful': false,
            'cityId': 0,
            'regionId' :0 ,
            'cityName': '',
            'citySize': ''
        };
        ajax.setData(goVect);
        ajax.setRequestFunc(function (answ) {        // callback  при возврате ответа
            if (answ['successful'] == true) {
               var result = answ['result'] ;
                city = answ['city'] ;

            } else {
                var message = 'ERROR:geoLocation - определение ближайшего города' ;
                if (answ !== false) {
                    message = answ['message'];
                }
                ajax.errorMessage(message) ;
            }
        });
        ajax.go();
    } ;
    var cityDefault = function() {
        return {
            'cityId': 77,
            'regionId' :77 ,
            'cityName': 'Москва',
            'citySize': 'big'

        } ;
    } ;
}