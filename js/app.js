//Declaring all the global variables
var $start = $('#start');
var $col1 = $('.one');
var $col2 = $('.two');
var $col3 = $('.three');
var $col4 = $('.four');

// Game Logic
// Declaring a object literal

var simon_say ={
    rounds: 1,       // no of rounds user plays
    score: 0,        // current score of the user
    genSeqArr: [],   //array to generate sequence lighting/sounds pattern
    userSeqArr: [],  // array to keep track of user's pattern


    addHandler: function () {
      // add click evnts on start buttons and col no1 to col no4
       $start.on('click', function() {
				console.log('game start');
			   });

      $col1.on('click', function () {
        console.log('1');
        simon_say.lights($col1);
        });

      $col2.on('click', function () {
        console.log('2');
        simon_say.lights($col2);
        });

      $col3.on('click', function () {
        console.log('3');
        simon_say.lights($col3);
        });

      $col4.on('click', function () {
        console.log('4');
        simon_say.lights($col4);
        });

    },

    init: function () {
      // initialize the game

    },

    newRound: function () {

    },

    endGame: function () {

    },

    lights: function (column) {
      // lights up the clicked column, will take number as an argument
      // using setInterval to implement for an interval of 2 seconds.

        var start = {
          opacity: '1',
          duration: 200
        };

        var stop = {
          opacity: '0.7',
        };

        column.animate(start).animate(stop);


    },

    sound: function () {


    },

};

$(document).ready(function(){
  console.log('script is linked');
  simon_say.addHandler();



});
