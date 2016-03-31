<?php
define("NO_STAT",1);
require_once(dirname(__FILE__)."/../configuration.php");

//$heConfig_encoding=array('html'=>"Windows-1251",'mysql'=>"cp1251");
$heConfig_encoding=array('html'=>"UTF-8",'mysql'=>"utf8");

require_once(dirname(__FILE__)."/../includes/begin.php");
//require_once(dirname(__FILE__)."/../includes/mime_mail.php");
//require_once(dirname(__FILE__)."/../includes/addons/heCaptcha.php");

componentStart();

$lat=floatval(mosGetParam($_GET,"lat",0));
$long=floatval(mosGetParam($_GET,"long",0));
$cityid=intval(mosGetParam($_GET,"cityid",0));

if($cityid>0)
{
	$query="SELECT id, 0 as dist
			FROM #__city
			WHERE id=".dbQuote($cityid)."
			LIMIT 1";
	$rdDb->setQuery($query);
	$o=$_cache['query']->call("rdDb->loadObjectList","","",$query);
}
else
{
	$query="SELECT cityid, (ABS(`long`-{$long})+ABS(`lat`-{$lat})) as dist
			FROM #__city_ll
			ORDER BY dist ASC
			LIMIT 1";
	$rdDb->setQuery($query);
	$o=$_cache['query']->call("rdDb->loadObjectList","","",$query);
}

$o=reset($o);

if($o->cityid && $o->dist<1)
{
	$city=heGeo::getCity($o->cityid,1);
	echo "<p>Ваш город ";
	echo "<strong>";
	echo $city->params['small_name_imen'];
	echo "</strong>?";
	echo "</p>";
	echo "<div id=\"mn_city_popup_buttons\">";
	echo "<a href=\"#\" class=\"btn btn_color yes\" data-cityid=\"{$o->cityid}\">Да</a>";
	echo "<a href=\"http://cp.mnogonado.net/c/?c=cityPopupChoose&d={$city->params['main_site']}\" class=\"btn btn_color go\">Перейти</a>";
	echo "<a href=\"#\" class=\"no cancel\" data-cityid=\"{$o->cityid}\">Нет</a>";
//	echo "<a href=\"#\" class=\"cancel\">Нет</a>";
	echo "</div>";
}
else
{
	mosRedirect("/",404);
}
sendOutput();
?>