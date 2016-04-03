<?php
/**
 * определние города по координатам : широта, долгота
 */
session_start();
ini_set('display_errors', 1);
//error_reporting(E_ALL) ;
error_reporting(E_ALL ^ E_NOTICE);
header('Content-type: text/html; charset=utf-8');
include_once __DIR__ . '/local.php';
/////////////////////////////////////////////////////////////////////////////////////////
class GeoLocation_db  extends Db_base
{
    // --------------------------------- //
    private $errors = [];           // ошибки операций
    private $debug = [];            // отладка
    //-----------------------------------//
    public function __construct()
    {
        parent::__construct();
        $this->errors = [];
    }
    /**
     * получить список ошибок
     * @return array
     */
    public function getErrors()
    {
        return $this->errors;
    }

    public function getDebug()
    {
        return $this->debug;
    }
    public function getCity($lat,$long) {
        $cityId = $this->getCityId($lat,$long) ;
        if ($cityId == false) {
            return false ;
        }
        $sql = 'SELECT regionid,name,size
                FROM mlt_city
                WHERE id = :cityId' ;
        $subst = [
            'cityId' => $cityId
        ] ;
        $rows = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $rows || $rows[0] === null ) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        $row = $rows[0] ;
        if (false === $row || $row === null) {
            return false ;
        }
        return [
            'cityId' => $cityId,
            'cityName' => $row['name'],
            'citySize' => $row['size'],
            'regionId' => $row['regionid']
        ] ;

    }
    private function getCityId($lat,$long) {
        $sql ="SELECT cityid, (ABS(`long`- :long)+ABS(`lat`-:lat)) as dist
			FROM mlt_city_ll
			ORDER BY dist ASC
			LIMIT 1";
        $subst = [
            'long' => $long,
            'lat' => $lat
        ] ;
        $rows = $this->sqlExecute($sql, $subst, __METHOD__);
        if (false === $rows) {
            $this->errors[] = [
                'successful' => false,
                'sql' => $sql,
                'subst' => $subst,
                'message' => $this->msg->getMessages()];
            return false;
        }
        $cityId = $rows[0]['cityid'] ;
        return $cityId ;
    }
}