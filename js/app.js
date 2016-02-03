
// Game Logic
// Declaring a object literal

var simon_say ={
    rounds: 1,       // no of rounds user plays
    score: 0,        // current score of the user
    genSeqArr: [],   //array to generate sequence to
    userSeqArr: [],

    addHandler: function () {
      // add click evnts on start buttons and col no1 to col no4
      $('#start').on('click', function() {
				console.log('game start');
			});
	

    },

    init: function (easy) {
      // initiate the game

    }

};

$(document).ready(function(){
  simon_say.addHandler();

});
