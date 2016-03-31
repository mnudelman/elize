<?php
heJQuery::init();
$script="/mn.city.popup.php";
?>
<script>
$(document).ready(function(){

	$(document.body).append($("<div id=\"is_it_your_city\" style=\"display:none\"></div>"));
	
	$('#is_it_your_city').on("click","a.yes",function(e){
		var now=new Date().valueOf();
		var expires=new Date(now+3600*24*30*1000).toGMTString();
		setCookie("user_cityid",$(this).attr("data-cityid"),expires,"/",".mnogonado.net");
		setCookie("user_cityid",$(this).attr("data-cityid"),expires,"/");
		$("#is_it_your_city a.yes").hide();
		$("#is_it_your_city a.go").css("display","inline-block");
		$("#is_it_your_city a.no").removeClass("no");
		e.preventDefault();
		return false;
	}) ;
	$('#is_it_your_city').on("click","a.no",function(e){
		var now=new Date().valueOf();
		var expires=new Date(now+3600*24*30*1000).toGMTString();
		setCookie("user_cityid",-1,expires,"/",".mnogonado.net");
		setCookie("user_cityid",-1,expires,"/");
		e.preventDefault();
		return false;
	});
	$('#is_it_your_city').on("click","a.cancel",function(e){
		$("#is_it_your_city").hide();
		e.preventDefault();
		return false;
	});
	
	var cityid, cityid_det;
	
	if(!(cityid=getCookie("user_cityid")) && !(cityid_det=getCookie("user_cityid_det")))
	{
		if(!cityid_det)
		{
			$.getScript("http://api-maps.yandex.ru/2.1/?lang=ru-RU", function(){
				ymaps.ready(function(){
					ymaps.geolocation.get({provider: 'yandex'}).then(function(result){
						var coord=result.geoObjects.get(0).properties.get('boundedBy');
						var lat=(coord[0][0]+coord[1][0])/2;
						var long=(coord[0][1]+coord[1][1])/2;
						$.get("<?php echo $script?>",{"lat":lat,"long":long},function(data, textStatus){
							var expires=new Date(now+3600*24*30*1000).toGMTString();
							setCookie("user_cityid_det",$(this).attr("data-cityid"),expires,"/",".mnogonado.net");
							setCookie("user_cityid_det",$(this).attr("data-cityid"),expires,"/");
						
							$('#is_it_your_city').html(data).show();
							$('#is_it_your_city').animate({"top":10});
						});
					});
				});
			});
		}
		else
		{
			$.get("<?php echo $script?>",{"cityid":cityid_det},function(data, textStatus){
				$('#is_it_your_city').html(data).show();
				$('#is_it_your_city').animate({"top":10});
			});
		}
	}
});
</script>
