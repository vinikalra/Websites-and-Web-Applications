//window.onunload = function() {
//                window.location.href = "http://jadran.sdsu.edu/jadrn017/logout.html";
 //           };


	window.onpopstate = function() {window.location.href="http://jadran.sdsu.edu/jadrn017/logout.html";
};

history.pushState({},'');
	