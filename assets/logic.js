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




