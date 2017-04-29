// Global variables

var chooseArticle;

var theAnimation;


// Load stuff from the New York Times API

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
	  injectString('Error. the new york times api is currently not available. Please try again later');
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

	// Prepare and format the injected string
	for (var i = 0; i < sollString.length; i++){
		var preparedString = sollString.split(" ").join('ˉ').toUpperCase().replace(/[^\w\s.,]/gi,'ˉ');	
	} 

	// // If preparedString is shorter than cols*rows. add dashes to fill up the grid
	// if (preparedString.length < cols*rows){

	// 	var preparedArray = preparedString.split('');


		
	// 	for (var i = 0; i < cols*rows - preparedString.length; i++){
	// 		preparedArray.push('ˉ');
	// 	}

	// 	var preparedString = preparedArray.join('');

	// }

	var currentWord = 0;
	
	var singleWords = preparedString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase().split('ˉ');

	// The istArray represents all interim states of the grid

	var word = [];

	var istArray = istString.split('');

	var countUp = 0;

	var possibleIndex = 0;

	var istIndex = 0;

	var sollIndex = 0;



	// Animate the GRID

	theAnimation = setInterval(function(){ 

	var boxid = istIndex+1;

		// Wenn istIndex kleiner ist als die Länge des Soll-Arrays

		if (istIndex < preparedString.length){

			// wenn der aktuelle Buchstabe nicht mit dem Soll-Buchstaben übereinstimmt

				// Falls das Ende des Grids erreicht ist
				if (istIndex >= cols*rows){
					istIndex = 0; 

				}

			// If the letter is not the right one yet
			if (istArray[istIndex] != preparedString[sollIndex]){

				// rotate the letter one more step

				istArray[istIndex] = possibleCharacters[possibleIndex];
					
				$( "#stage a:nth-child("+boxid+")" ).html(istArray[istIndex]);	

				// Add a title to the element, if it is part of a word
				if (preparedString[istIndex] != 'ˉ'){	
					$( "#stage a:nth-child("+boxid+")" ).attr("title", singleWords[currentWord]);
				}


				possibleIndex++;

			// If the letter is the right one

			} else {

			// Go to next letter
			possibleIndex = 0;
			istIndex++;
			sollIndex++;

				if (preparedString[sollIndex] == 'ˉ'){
					currentWord++;
				// console.log(singleWords[currentWord]);
				}
			}
		}
		
		// Just in case if i want to log the grid as a string
		// istString = istArray.join('');

	}, 10);		
}


// Create The Grid
createGrid();

// Inject The String
injectString(sollString);

// Fire the the API-loader, when a word is clicked
$( "a" ).click(function() {
	if ($(this).attr('title')){
		clearInterval(theAnimation);

		$( "#stage a" ).html('ˉ');

		chooseArticle = Math.floor(Math.random() * 10);
		var keyword = this.title;
		loadAPI(keyword);
	}
});



// mouse hover

$("a").hover(function(){
	if ($(this).attr('title')){
		var titleStr = $(this).attr("title");
		$("a[title=\""+titleStr+"\"]").addClass('active');
	}
}, function() {
 	if ($(this).attr('title')){
 		var titleStr = $(this).attr("title");
    	$("a[title=\""+titleStr+"\"]").removeClass('active');
    }
});







