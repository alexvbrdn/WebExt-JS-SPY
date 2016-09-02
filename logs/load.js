var logs="";
getLogs();


function getLogs(){
	chrome.storage.local.get(null, function (result) {
		for (var k in result) {
			logs += "["+convertTimestamp(k)+"]"+result[k]+"\n";
		}
		var list = document.getElementById('list');
		list.innerHTML=logs;
	});
}

//Adapted from https://gist.github.com/kmaida/6045266
function convertTimestamp(timestamp) {
	var d = new Date(parseInt(timestamp,10)),
	yyyy = d.getFullYear(),
	mm = ('0' + (d.getMonth() + 1)).slice(-2),
	dd = ('0' + d.getDate()).slice(-2),
	hh = ('0' + d.getHours()).slice(-2),
	min = ('0' + d.getMinutes()).slice(-2),
	sec = ('0' + d.getSeconds()).slice(-2),
	time;
	time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ":" + sec;
		
	return time;
}

//Taken from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
document.getElementById('clear').addEventListener("click", function(e) {
	chrome.storage.local.clear(function() {
		var list = document.getElementById('list');
		list.innerHTML="";
	});
});
document.getElementById('dl').addEventListener("click", function(e) {
	download("JS-SPY_logs.txt", logs);
});
