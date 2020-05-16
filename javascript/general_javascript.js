var navSearchBarShowing = true;

$( document ).ready(function() {
     $(".searchbtn").click(function(){
     $(".searchform").slideToggle("500");
     });
 });


window.onscroll = function() {
	setHeaderLayout();

}

window.onload = function() {
	createHeaderNavBar();

}

/* Changes the layout of the NavBar and Footer based on scroll position */
function setHeaderLayout(){
	var header = document.getElementById("navBarId");
	var footer = document.getElementById("footer");

	if(window.pageYOffset > 0){
		header.classList.add("navBarScrolled");
		footer.classList.add("footerScroll");
		if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight-5) {
			footer.classList.add("footerBot");
			document.getElementById("footer").innerHTML = writeFooterBot();
		} else {
			footer.classList.remove("footerBot");
			footer.classList.add("footerScroll");
			document.getElementById("footer").innerHTML = writeFooterScroll();
		}
	} else {
		header.classList.remove("navBarScrolled");
		footer.classList.remove("footerScroll");
		footer.classList.remove("footerBot");
		document.getElementById("footer").innerHTML = "<p>&copy; 2020, Dynamic Developers</p>";
	}
}

function writeFooterScroll(){
	return "<p><a href=\"#\" class=\"fa fa-facebook\"></a><a href=\"#\" class=\"fa fa-twitter\"></a><a href=\"#\" class=\"fa fa-linkedin\"></a><a href=\"#\" class=\"fa fa-instagram\"></a></p>" + 
			"<p>&copy; 2020, Dynamic Developers</p>";
}

function writeFooterBot(){
	return 	"<div class=\"footerBotTopDiv\">" +
				"<div class=\"childDiv\"><h2>Stay Connected</h2><p>Subscribe for FREE to receive our company newsletters containing special promotions and discounts.</p><div style=\"display: flex; width: 95%;\"><input type=\"text\" id=\"footerSubscribeInput\" placeholder=\"Email Address\" /><button id=\"footerSubscribeButton\" onclick=\"handleSubscribe()\"> Sign Up!</button></div><p><a href=\"#\" class=\"fa fa-facebook\"></a><a href=\"#\" class=\"fa fa-twitter\"></a><a href=\"#\" class=\"fa fa-linkedin\"></a><a href=\"#\" class=\"fa fa-instagram\"></a></p>" +
				"</div>" + 
				"<div class=\"childDiv\"><h2>Company Committment</h2><p>D&D Beverages is commited to providing fast and reliable service. We strive to meet the tastes and varieties our customers crave. Through our retail relationships with partnering...</p>&emsp;<a class=\"footerA\" href=\"#\">More About Us &#9656;</a>" + 
				"</div>" + 
				"<div class=\"childDiv\"><h2>Navigate</h2>"+
					"<table class=\"footerTable\"><tr>" + 
						"<th><a class=\"footerA\" href=\"index.html#\">Home &#9656;</a></th><th><a class=\"footerA\" href=\"#\">Login &#9656;</a></th></tr><tr>" +
						"<th><a class=\"footerA\" href=\"products.html\">Shop Now &#9656;</a></th><th><a class=\"footerA\" href=\"#\">Register &#9656;</a></th></tr><tr>" +
						"<th><a class=\"footerA\" href=\"index.html#discoverAnchor\">How It Works &#9656;</a></th><th><a class=\"footerA\" onclick=\"showContactDiv()\">Contact Us &#9656;</a></th></tr><tr>" +
						"<th><a class=\"footerA\" href=\"#\">FAQ &#9656;</a></th></tr><tr>" +
						
					"</tr></table>" +
				"</div>" + 
			"</div>" +
			"<div class=\"footerBotMidDiv\">D&D Beverages &#9679; 801 Atherton Dr., Manteca CA, 95337 &#9679; <a class=\"footerA\" href=\"#\">Map</a> &#9679; Customer Support (800) 252-6465</div>" +
			"<div class=\"footerBotBotDiv\"><a class=\"footerA\" href=\"#\">Privacy Policy</a>&emsp;|&emsp;<a class=\"footerA\" href=\"#\">Sitemap</a>&emsp;|&emsp;&copy; 2020, Dynamic Developers</div>";
}



function menuAction(){
	
	var ele = document.getElementById("menuBar");

	if (ele.classList.contains("menuBarHiding")) {
		ele.classList.add("menuBarShowing");
		ele.classList.remove("menuBarHiding");
	} else {
		ele.classList.add("menuBarHiding");
		ele.classList.remove("menuBarShowing");
	}  
	/*
			"<p class=\"navItem\"><a class=\"footerA navItemColor\" href=\"index.html#\">Home &#9656;</a></p>" +
			"<p class=\"navItem\"><a class=\"footerA navItemColor\" href=\"index.html#discoverAnchor\">Discover &#9656;</a></p>" +
			"<p class=\"navItem\"><a class=\"footerA navItemColor\" href=\"products.html\">Shop Now &#9656;</a></p>" +
			"<p class=\"navItem\"><a class=\"footerA navItemColor\" href=\"#\">FAQ &#9656;</a></p>" +
			"<p class=\"navItem\"><a class=\"footerA navItemColor\" onclick=\"showContactDiv()\">Contact Us &#9656;</a></p>" +
	*/
}


function showCart(){
	var ele = document.getElementById("cartDisplayDiv");

	if (ele.classList.contains("cartDisplayHiding")) {
		ele.classList.add("cartDisplayShowing");
		ele.classList.remove("cartDisplayHiding");
	} else {
		ele.classList.add("cartDisplayHiding");
		ele.classList.remove("cartDisplayShowing");
	}  
	
	
}

/* Contact Form Functions */
var contactDivShowing = false;


function showContactDiv(){
	var element = document.getElementById("contactDivID");
	if(!contactDivShowing){
		element.innerHTML = writeContactLayout();
		contactDivShowing = true;
		element.focus();
	} else {
		element.innerHTML = "";
		contactDivShowing = false;
	}
}

function hideContactDiv(){
	var element = document.getElementById("contactDivID");
	element.innerHTML = "";
	contactDivShowing = false;
}

function writeContactLayout(){
	var html = "";
	var topDiv = "<div class=\"topContactDiv\"><h1>Have Some Questions?</div>";
	var emailInput = "<input id=\"contactEmailInput\" class=\"contactInput\" type=\"text\" placeholder=\"Enter Your Email\"></input>";
	var subjectInput = "<input id=\"contactSubjectInput\" class=\"contactInput\" type=\"text\" placeholder=\"Message Subject\"></input>";
	var messageInput = "<textarea id=\"contactMessageInput\" class=\"contactInput\" type=\"text\" placeholder=\"Message Content\"></textarea>";
	var submitButton = "<button id=\"contactSubmitButton\" class=\"contactInput\" onclick=\"submitContactMessage()\">SEND MESSAGE</button>";
	var midDiv = "<div class=\"midContactDiv\"><div class=\"midContactDivLeft\"></div><div class=\"midContactDivRight\"><form id=\"contactForm\">" + emailInput + subjectInput + messageInput + submitButton + "</form></div>";
	html = "<div class=\"contactDiv\"><div class=\"contactDivInner\">" +
		topDiv + midDiv + 
		"</div></div>";

	return html;
}

function submitContactMessage(){
	hideContactDiv();
}
/* End of Contact Form Functions */