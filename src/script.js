// <!--  Author: Halil Emre Yildiz - </> by @JahnStar -->
var editMode;
function EditMode(){
	editMode = !editMode;
	if (editMode){
		$("#mode").attr('class', 'fa fa-eye');
		$('.EditMode').show();
		$('.ViewMode').hide();
	$("#edit input:text").first().focus();
	}
	else {
		$("#mode").attr('class', 'fa fa-pencil');
		$('.EditMode').hide();
		$('.ViewMode').show();
	}
	Save();
	Load();
}
function Load(){
	$("#title_").attr('value', data.title);
	$("#message_").html(data.message);
	$("#pictureUrl_").attr('value', data.pictureUrl);
	
	$("#title").html(data.title.replace(new RegExp("script>", "g"), ''));
	$("#message").html(data.message.replace(new RegExp("script>", "g"), '').replace(new RegExp("＜", "g"), '<'));
	$('#templates').val(data.template);
	$("#template").attr("src", "src/media/" + data.template + ".png");
	$("#picture").attr("src", data.pictureUrl);
	
	var mainColor = data.mainColor;
	var bgColor = data.bgColor;
	$("#mainColor_").attr('value', mainColor);
	$("#bgColor_").attr('value', bgColor);
	if (data.suprise) $("#suprise").attr("checked", "checked");
	else $(".suprise").hide();

	$("h1").css("color", mainColor);
	$("h1 input").css("color", mainColor);
	$(".changeMode .fa").css("background", mainColor);
	$("body").css("background", "radial-gradient(at center center, #fff -10%, " + mainColor + " 125%)");
	$(".button").css("border", mainColor);
	$(".button").css("background", mainColor);
	$(".circle").css("border", "5px solid" + mainColor);
	$(".circle").css("color", mainColor);
	$(".circle").css("background", bgColor);
	$(".card").css("border-top", "5px solid " + mainColor);
	$(".card").css("border-bottom", "5px solid " + mainColor);
	$(".card").css("background", bgColor);
	$("#alert").css("color", mainColor);
	$("#alert").css("background", bgColor);
}
function Save(stringData){
	if(stringData){	
		stringData = jQuery.parseJSON(stringData);
		data = stringData;
	}
	else {
		data.title = $("#title_").val();
		data.message = $("#message_").val();
		data.template = $("#templates").val();
		
		var imgUrl = $("#pictureUrl_").val();
		if (imgUrl.slice(-3) == "png" || imgUrl.slice(-3) == "jpg") {
			$('#picture').show();
			data.pictureUrl = imgUrl;
		}
		else $('#picture').hide();
		
		data.mainColor = $("#mainColor_").val();
		data.bgColor = $("#bgColor_").val();
		data.suprise = $("#suprise").is(':checked');
	}
}
function setLanguage(){
	var language = 1;
	if (navigator.language == "tr-TR" || navigator.language == "tr") language = 0;

	$("#alert").html($("#alert").html().split("$")[language]);
	$(".button.a2a_dd").html($(".button.a2a_dd").html().split("$")[language]);
	$("#templates option").each(function () {
        $(this).html($(this).html().split("$")[language]);
		$(this).parent().attr('label',$(this).parent().attr('label').split("$")[language]);
	});
	$("#templates-data option").each(function () {
        $(this).html($(this).html().split("$")[language]);
	});
}
function loadTemplate(){
	var template = $('#templates-data option').eq($("#templates")[0].selectedIndex);
	$("#title_").val(template.text().split('*')[0]);
	$("#message_").val(template.text().split('*')[1]);
	var colors = template.val().split('#');
	$("#mainColor_").val('#' + colors[0]);
	$("#bgColor_").val('#' + colors[1]);
}
function scrollToMiddle(id){

    var elem_position = $(id).offset().top;
    var window_height = $(window).height();
    var y = elem_position - window_height/2;

    window.scrollTo(0,y);
}
function copyToClipboard(text){
  var input = document.body.appendChild(document.createElement("input"));
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('copy');
  input.parentNode.removeChild(input);
}
function copyLink(share_data){
try{
	$(".a2a_full_footer").html("<h2> Hey eCard Maker: Create Free Online Card! <br><br> - <i class='fa fa-link' style='color:cyan;'></i> Copied! - </h2>");
	Save();
	Load();
	
	var dataHex = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
	dataHex = encodeURI(location.protocol + '//' + location.host + location.pathname + '?hey=' + dataHex);
	copyToClipboard(dataHex);
	
	// a2a_config.linkname = data.title;
	// a2a_config.linkurl = dataHex;
	// a2a.init('page');
	return { title: data.title, url: dataHex };
}
catch(e){
	$(".a2a_full_footer").html("<h2> -<i class='fa fa-exclamation-triangle' style='color:red;'></i> Failed! - </h2>");

	$("#mode").attr('class', 'fa fa-eye');
	$('.EditMode').show();
	$('.ViewMode').hide();
	$("#edit input:text").first().focus();
	}
}
function playMusic()
{
	var player = document.getElementById("player"); 
	if(player.currentTime > 0) 
	{
		player.pause();
		player.currentTime=0;
	}
	else player.play();
	setTimeout(function(){
	$('#alert').fadeOut(1000);
	}, 5000);
}
setTimeout(function(){
    $('#canvas').fadeOut(1000);
	$('#alert').fadeOut(1000);
}, 15000);
$(function(){
	setLanguage();
	var getData = decodeURI(window.location.href.split('?hey=')[1]);
	if (!getData || getData === 'undefined')
	{
		$("#suprise").attr("checked", "checked");
		loadTemplate();
		Save();
	}
	else Save(decodeURIComponent(escape(window.atob(getData))));
	Load();
	
	$("#templates").on('change', function(){
		loadTemplate();
		
		Save();
		Load();
	});
	
	document.querySelectorAll('input[type=color]').forEach(function(picker) {
	  picker.addEventListener('change', function() {
		$("#" + picker.id).attr("value", picker.value);
		
		Save();
		Load();
		});
	});
	
	$(".a2a_dd").click(copyLink);
});
var data = new Object();
window.addEventListener('load', function () {
})
