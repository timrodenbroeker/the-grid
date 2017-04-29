// THE GRID
// A TYPOGRAPHIC JAVASCRIPT-ADVENTURE BY TIM RODENBRÖKER
// www.timrodenbroeker.de


var chooseArticle;

function loadAPI(keyword){
	// Built by LucyBot. www.lucybot.com
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "f93f51e506ce414e8c5ef8b9afa5fb6d",
	  'q': keyword
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {

	var headline = result.response.docs[chooseArticle].headline.main;
	 
	injectString(headline);

	}).fail(function(err) {
	  throw err;
	});
}

// Initialize the variable for the interim states of the grid
var currentString;

// This is the string i want to inject into the grid, when app is launched
var sollString = "creative coding is a rising discipline, inspiring and connecting thousands of people worldwide. open source software tools lay the foundation for a new generation of artists and designers, using the internet to exchange, learn, teach, share, exhibit and connect, regardless of ethnicity, nationality, age, religion or gender. creative coding reveals completely new opportunities in many ways. and this is just the beginning of the story.";


// The dimension of the grid
var cols = 20;
var rows = 8;

// These are the characters that are possible to display
var possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890.,:!ˉ';

// convert string to an array
var possibleCharactersArray = possibleCharacters.split('');

// Create the HTML-Grid 
function createGrid(){
	
	var index = 0;
	var colIndex = 0;

	for (var y = 0; y < rows*cols; y++){

		$("#stage").append('<a>ˉ</a>');
		index++;
	}

}

function injectString(sollString){


	var istString = '';

	// Format the injected string
	for (var i = 0; i < sollString.length; i++){
		var sollArray = sollString.split(" ").join('ˉ').toUpperCase().replace(/[^\w\s.,]/gi,'ˉ');	
	
	} 

	var currentWord = 0;
	
	var singleWords = sollArray.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase().split('ˉ');

	// console.log(singleWords[currentWord]);

	// console.log(singleWords);

	// The istArray represents all interim states of the grid

	var word = [];

	var istArray = istString.split('');

	var countUp = 0;

	var possibleIndex = 0;

	var istIndex = 0;

	var sollIndex = 0;

	// Animate the GRID

	setInterval(function(){ 

	var boxid = istIndex+1;

		// Wenn istIndex kleiner ist als die Länge des Soll-Arrays

		if (istIndex < sollArray.length){

			// wenn der aktuelle Buchstabe nicht mit dem Soll-Buchstaben übereinstimmt

				// Falls das Ende des Grids erreicht ist
				if (istIndex >= cols*rows){
					istIndex = 0; 

				}

			if (istArray[istIndex] != sollArray[sollIndex]){

				istArray[istIndex] = possibleCharacters[possibleIndex];


					$( "#stage a:nth-child("+boxid+")" ).html(istArray[istIndex]);



					// Add Link to the <a> element 
					$( "#stage a:nth-child("+boxid+")" ).attr("title", singleWords[currentWord]);

					// $( document.getElementById(boxid)).html(istArray[istIndex]);

				possibleIndex++;

			} else {

			// Go to next letter
			possibleIndex = 0;
			istIndex++;
			sollIndex++;

				if (sollArray[sollIndex] == 'ˉ'){
					currentWord++;
				// console.log(singleWords[currentWord]);
				}
			}
		}
	
		// istString = istArray.join('');

		// console.log(istString);
	}, 10);		
}


// Creatie The Grid
createGrid();

// Inject The String
injectString(sollString);

// Load the API when word is clicked
$( "a" ).click(function() {
	chooseArticle = Math.floor(Math.random() * 10);
	var keyword = this.title;
	loadAPI(keyword);
});




// Beautify

// Alle Markierungen entfernen
function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}






