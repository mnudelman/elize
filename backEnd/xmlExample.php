<?php
/**
*
  */
$q = 'WHERE';

$q = preg_replace("/[^а-яА-Я\d\w\s]/iu", "", $q);
$page = 0 ;

$ya_query = "http://xmlsearch.yandex.ru/xmlsearch" . "/?page=" . $page .
    "&query=" . urlencode($q . " << host=\"yoursite.ru\"");
$xml_data = file_get_contents($ya_query);
echo $ya_query  ;