$("#welcomeBtn").on("click",function(){
  var divPosition = $('.infoSection').offset();
  $('html, body').animate({scrollTop: divPosition.top}, "slow");
});

var city = document.getElementById("city");
var language = document.getElementById("language");

function getValues() {
	sessionStorage.setItem("city", city.value);
	sessionStorage.setItem("language", language.value);
}

function setValues() {
	city.value = sessionStorage.getItem("city");
	language.value = sessionStorage.getItem("language");
}


// ACCOUNT MANAGEMENT

var index = $(".row").index(0);

$(".edit").on("click", function() {
	$("input").removeAttr("readonly");
	$("input").toggleClass("edit");
});

$(".password").on("click", function() {
	$(".pswd").toggleClass("hidden");
});


