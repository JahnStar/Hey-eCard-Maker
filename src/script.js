// <!--  Author: Halil Emre Yildiz - </> by @JahnStar -->
$(function(){ 
	$.getJSON('src/data.json', function(data){
		var index = -1;
		var name = window.location.href;
		if (name.includes("?name="))
		{
			name = decodeURI(name.split("?name=")[1]);
			$('.button').html(name);
			scrollToMiddle("#cake");
		}
		else if (name.includes("?id="))
		{
			index = decodeURI(name.split("?id=")[1]);
			
			var firstName = data[index].firstName;
			var lastName = data[index].lastName;
			var dobDate = data[index].dobDate;
			var pictureUrl = data[index].pictureUrl;
			var nat = data[index].nat;
			var message = data[index].message;
			var message1 = data[index].message1;
				
			name = firstName + " " + lastName;
			if (message1.includes("$age"))
			{
				dobDate = new Date(dobDate);
				var age = new Date(Date.now() - dobDate.getTime()); 
				age = Math.abs(age.getUTCFullYear() - 1970);
				
				message1 = message1.replace("$age", age);
			}
			var message2 = data[index].message2;
			var message3 = data[index].message3;
			
			$('#title').html(firstName + " " + lastName);
			$('#message').html(message);
			$('.button').html(message1);
			$(".circle").attr("src", pictureUrl);
		}
		
		if (index > -1)
		{
			var fontColor = data[index].fontColor;
			var bgColor = data[index].bgColor;
			
			$("h1").css("color", fontColor);
			$("body").css("background", "radial-gradient(ellipse at center, #fff -10%, " + fontColor + " 200%)");
			$(".circle").css("border", "5px solid" + fontColor);
			$(".button").css("background", fontColor);
			$(".button").css("border", fontColor);
			$(".card").css("border-top", "5px solid " + fontColor);
			$(".card").css("border-bottom", "5px solid " + fontColor);
			$(".card").css("background", bgColor);
		}
	});
});
function Notification() { alert("İyi Ki Doğdun " + name + " :)"); }
function scrollToMiddle(id) {

    var elem_position = $(id).offset().top;
    var window_height = $(window).height();
    var y = elem_position - window_height/2;

    window.scrollTo(0,y);
}
setTimeout(function() {
    $('#canvas').fadeOut(1000);
}, 12000);