displayDuration = function(duration){
	var days = Math.floor(duration/ moment.duration({days: 1}).valueOf());
	duration = duration - (days * moment.duration({days: 1}).valueOf());
	var hours = Math.floor(duration/ moment.duration({hours: 1}).valueOf());
	duration = duration - (hours * moment.duration({hours: 1}).valueOf());
	var minutes = Math.floor(duration/ moment.duration({minutes: 1}).valueOf());
	duration = duration - (minutes * moment.duration({minutes: 1}).valueOf());
	var seconds = Math.floor(duration/ moment.duration({seconds: 1}).valueOf());
	if(days < 10){
		days = '0' + days;
	}
	if(hours < 10){
		hours = '0' + hours;
	}
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	//return ' Days: ' + days + ' Hours: ' + hours +' Minutes: ' + minutes + ' Seconds: ' + seconds;
	return 'Days: ' + days + ' Hrs: ' + hours +' Mins: ' + minutes + ' Secs: ' + seconds;
	//return days + ' days,  ' + hours +' hrs,  ' + minutes + ' mins,  ' + seconds + ' secs';
};

displayDurationCompact = function(duration){
	var hours = Math.floor(duration/ 3600000);
	duration = duration - (hours * 3600000);
	var minutes = Math.floor(duration/ 60000);
	duration = duration - (minutes * 60000);
	var seconds = Math.floor(duration/ 1000);
	if(hours < 10){
		hours = '0' + hours;
	}
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	return '' + hours +':' + minutes + ':' + seconds;
};