<?php
/**
 * Created by PhpStorm.
 * User: michael
 * Date: 31.03.16
 * Time: 10:44
 */

class GeoLocation {
    private $db ;
    private $msg ;
    private $city ;
    public function __construct() {
        $this->msg = Message::getInstace() ;
        $this->db = new GeoLocation_db() ;
        $this->city = [
            'cityId' => 77,
            'regionId' => 77,
            'cityName' => 'Москва',
            'citySize' => 'big'
        ] ;
    }
    public function selectCity($lat,$long) {
       $res = $this->db->getCity($lat,$long) ;
       if ($res !== false) {
           $this->city = $res ;
       }
    }
    public function getResult() {
        $errors = $this->db->getErrors() ;
        if (count($errors) > 0) {
            return [
                'successful' => false,
                'message' => $errors
            ] ;
        }else {
            return [
                'successful' => true,
                'city' => $this->city
            ] ;
        }

    }

}