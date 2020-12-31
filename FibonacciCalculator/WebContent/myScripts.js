var fibOutputStr;
var fibSequence = new Array();
var tableNums;
var timeInterval = null;
var q = 0;
var playing = false;

var btn = document.getElementById("control-btn");

// submit button was clicked
document.getElementById("submitQuery").addEventListener("click", function() {
	// get value of input text box
	var num = document.getElementById("inputText").value;

	// reset fibTable
	document.getElementById("fibTable").innerHTML = "";

	// reset table fib teaching
	if(timeInterval != null) {
		stopTeaching();
		q = 0;
	}

	var btns = document.querySelectorAll(".table-btn");
	btn.innerHTML = "Pause";

	// validate input
	if(inputValidation(num)) { // if valid, show result of input, create table
		fibOutputStr = "The result of f(" + num + ") is " + doFibonacci(Number(num));

		createTable();

		// show table control buttons
		for(let i = 0; i < btns.length; i++) {
			btns[i].classList.remove("hide");
		}
		
		document.getElementById("table-h2").classList.remove("hide");

		teachTable();
	} else {
		// hide table control buttons
		for(let i = 0; i < btns.length; i++) {
			btns[i].classList.add("hide");
		}

		document.getElementById("table-h2").classList.add("hide");
	}

	document.getElementById("output").innerHTML = fibOutputStr;
});

/**
 * input validation for text form
 * 
 * @param {*} val
 * @return {boolean}
 */
function inputValidation(val) {
	var isValidInt = true;

	if(val < 0) { // check if val is a negative
		fibOutputStr = "Invalid Input: negative number";
		return false;
	} else if(val === "") { // check if val is an empty string
		fibOutputStr = "Invalid Input: empty field";
	 	return false;
	} else if(isNaN(Number(val))) { // check if val is not a number
		fibOutputStr = "Invalid Input: not a number";
		return false;
	} else if(val % 1 != 0) { // check if val is a decimal
		fibOutputStr = "Invalid Input: decimal number";
		return false;
	}

	return isValidInt;
}

/**
 * calculates the fibonnaci result of user input
 * 
 * @param {number} num
 * @return {number}
 */
function doFibonacci(num) {
	fibSequence = [];
	fibSequence.push(0);

	// check if num is 0 or 1
	if(num === 0) {
		return 0;
	} else if(num === 1) {
		fibSequence.push(1);

		return 1;
	}

	var num1 = 0;
	var num2 = 1;
	var temp;

	fibSequence.push(1);
	fibSequence.push(1);

	// perform fibonacci sequence and save each iteration
	for(var i = 3; i <= num; i++) {
		temp = num1;
		num1 = num2;
		num2 += temp;

		fibSequence.push(num1 + num2);
	}

	// result
	return (num1 + num2);
}

/**
 * creates the html table with the created fib sequence
 */
function createTable() {
	//start of table
	var tableStr = "<div class=\"results\" style=\"overflow-x:auto;\"><table border = 1px><tr>";

	// table headers
	for(var i = 0; i < fibSequence.length; i++) {
		tableStr += "<th>f(" + i + ")</th>";
	}

	// end table header row and start next row
	tableStr += "</tr><tr class=\"numbers\">";

	for(var i = 0; i < fibSequence.length; i++) {
		tableStr += "<td>" + fibSequence[i] + "</td>";
	}

	// end of table	
	tableStr += "</tr></table></div>";

	// insert table html
	document.getElementById("fibTable").innerHTML = tableStr;

	tableNums = document.querySelectorAll(".numbers td");
}

/**
 * iterate through tableNums sequence
 */
function teachTable() {
	playing = true;

	timeInterval = setInterval(function() {
		tableNums[q].classList.toggle("highlightOutput"); // red

		if(q == 2) {
			tableNums[q - 1].classList.toggle("highlightOutput"); // red
			tableNums[q - 2].classList.toggle("highlightOutput"); // red

			tableNums[q - 1].classList.toggle("highlightNumbers"); // blue
			tableNums[q - 2].classList.toggle("highlightNumbers"); // blue
		}

		if(q > 2) {
			tableNums[q - 1].classList.toggle("highlightOutput"); // red
			tableNums[q - 1].classList.toggle("highlightNumbers"); // blue
		}
		
		// remove class from current last number
		if((q - 3) >= 0) {
			tableNums[q - 3].classList.toggle("highlightNumbers"); // blue
		}

		q++;
		
		// end of table has been reached
		if(q >= tableNums.length) {
			stopTeaching(timeInterval);
		}
	}, 1000);
}

/**
 * halts current iteration, and restarts and beginning
 */
function restart() {
	stopTeaching();

	// remove highlight classes from table
	for(let i = 0; i < tableNums.length; i++) {
		tableNums[i].classList.remove("highlightOutput");
		tableNums[i].classList.remove("highlightNumbers");
	}

	// reset index
	q = 0;

	// reset control button
	btn.innerHTML = "Pause";

	// restart teachTable function
	teachTable();
}

// control button text
btn.addEventListener("click", function() {
    if(playing) {
		this.innerHTML = "Play";
		stopTeaching();
    } else {
		this.innerHTML = "Pause";
		teachTable();
    }
});

function stopTeaching() {
	clearInterval(timeInterval);

	playing = false;
}