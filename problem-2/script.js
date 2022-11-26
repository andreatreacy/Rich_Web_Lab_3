// import from rxjs
const { Observable, fromEvent, interval} = rxjs;

// link to the start timer button in the html
let start = document.getElementById("startTimer");

// variables to keep track of whether the intervals have started
minIntervalStarted = false;
hourIntervalStarted = false;

// when the start timer button is clicked call the validateInput function
fromEvent(start, 'click').subscribe(() => validateInput());

// validate that the user input is in the range 23:59:59
function validateInput()
{
	// get the user input for hours, minutes, and seconds
	let hour = document.getElementById("hour");
	let min = document.getElementById("min");
	let sec = document.getElementById("sec");

	// link to the error message in the html
	let inputError = document.getElementById("error");
	
	// if the input is out of the range display the error message
	if(hour.value > 23 || min.value > 59 || sec.value > 59)
	{
		inputError.style.display = "block";
	}
	// if input is in the range
	else
	{
		// don't display the error message
		inputError.style.display = "none";
		
		// save the input values for hours, minutes and seconds
		
		let h = document.getElementById("h");
		h.innerText = hour.value;
		
		let m = document.getElementById("m");
		m.innerText = min.value;
		
		let s = document.getElementById("s");
		s.innerText = sec.value;
		
		// call the function to start the second interval
		startSecInterval(h,m,s);
	}
}


// start the second interval
function startSecInterval(h,m,s)
{
	// set the interval to every second
	const secObservable = interval(1000);
	
	// call the countDownSeconds function at every second interval
	secObservable.subscribe(() => countDownSeconds(h,m,s));
}

// start the minute interval
function startMinInterval(h,m,s)
{
	// set the interval to every minute
	const minObservable = interval(60000);
	
	// call the countDownMinutes function at every minute interval
	minObservable.subscribe(() => countDownMinutes(h,m,s));
	
	// record that the minute interval has started
	minIntervalStarted = true;
}

// start the hour interval
function startHourInterval(h,m,s)
{
	// set the interval to every hour
	const hourObservable = interval(3600000);
	
	// call the countDownHours function at every hour interval
	hourObservable.subscribe(() => countDownHours(h,m,s));
	
	// record that the hour interval has started
	hourIntervalStarted = true;
}



// this function will decrease the second value by 1
function countDownSeconds(h,m,s) {
	// get an integer value for s
	sec = +s.innerText;
	
	// if the seconds are at 0 set the second value on the page to 00
	if(sec == 0)
	{
		s.innerText = "00";
		
		// if the minute interval has not started yet call the countDownMinutes function
		if(minIntervalStarted == false)
		{
			countDownMinutes(h,m,s);
		}
	}
	else
	{
		// decrease the value of the seconds by 1
		newSec = sec - 1;
		
		// add a leading 0 to the number on the page if the seconds value is below 10
		if(newSec < 10)
		{
			s.innerText = "0" + newSec;
		}
		else
		{
			s.innerText = newSec;
		}
	}
	
	// link to the time is up message in the html
	let timeUpMessage = document.getElementById("message");

	// check if the timer is at 00:00:00
	if(h.innerText == "00" && m.innerText == "00" && s.innerText == "00")
	{
		// display the time is up message
		timeUpMessage.style.display = "block";
	}
}


/* this function will decrease the minute value by 1
this function will be called before the minute interval is started as the minute value needs to 
be decreased by 1 before the interval starts counting*/
function countDownMinutes(h,m,s) {
	// get an integer value for m
	min = +m.innerText;
	
	// decrease the minute by 1
	newMin = min - 1;
	
	// change the minute value on the page
	m.innerText = newMin;
	
	// if the minutes and seconds are at 00:00 start the hour interval
	if(newMin < 0)
	{
		// change the value of minutes to 00 on the page
		m.innerText = "00";
		
		if(s.innerText == "00")
		{
			// if hour interval has not been started call the countDownHours function
			if(hourIntervalStarted == false)
			{
				countDownHours(h,m,s);
			}
		}
	}
	else
	{
		// every time a minute is decreased the seconds are set to 59 on the page
		s.innerText = "59";
		
		// add a leading 0 to the number on the page if the minute value is below 10
		if(newMin < 10)
		{
			m.innerText = "0" + newMin;
		}
		else
		{
			m.innerText = newMin;
		}
	}
	
	// if minute interval has not been started, start it
	if(minIntervalStarted == false)
	{
		startMinInterval(h,m,s)
	}	
}


/* this function will decrease the hour value by 1
this function will be called before the hour interval is started as the hour value needs to 
be decreased by 1 before the interval starts counting*/
function countDownHours(h,m,s) {
	// get an integer value for h
	hour = +h.innerText;
	
	// decrease the hour by 1
	newHour = hour - 1;
	
	// change the hour value on the page
	h.innerText = newHour;
	
	// if the hour is at 0 set the hour value on the page to 00
	if(newHour < 0)
	{
		h.innerText = "00";
	}
	else
	{
		// every time an hour is decreased change the seconds and minutes to 59
		m.innerText = "59";
		s.innerText = "59";
		
		// add a leading 0 to the number on the page if the hour value is below 10
		if(newHour < 10)
		{
			h.innerText = "0" + newHour;
		}
		else
		{
			h.innerText = newHour;
		}
	}
	
	// if hour interval has not been started, start it 
	if(hourIntervalStarted == false)
	{
		startHourInterval(h,m,s)
	}	
}