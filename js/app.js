//Declaring all the global variables
var $start = $('#start');
var $col1 = $('.one');
var $col2 = $('.two');
var $col3 = $('.three');
var $col4 = $('.four');
var $sound1 = $('.sound1');
var $sound2 = $('.sound2');
var $sound3 = $('.sound3');
var $sound4 = $('.sound4');

// Game Logic
// Declaring a object literal

var simon_says ={

    rounds: 1,       // no of rounds user plays
    score: 0,        // current score of the user
    genSeqArr: [],   //array to generate sequence lighting/sounds pattern
    userSeqArr: [],  // array to keep track of user's pattern

    addHandler: function () {

      // add click evnts on start buttons and col no1 to col no4
      $start.on('click', function() {
        console.log('game start');
        $col1.on('click', function () {
            console.log('1');
            simon_says.flash($col1);

          });

          $col2.on('click', function () {
            console.log('2');
            simon_says.flash($col2);

          });

          $col3.on('click', function () {
            console.log('3');
            simon_says.flash($col3);

          });

          $col4.on('click', function () {
            console.log('4');
            simon_says.flash($col4);

          });
        });

    },

    init: function () {
      // initialize the game

    },

    newRound: function () {

    },

    endGame: function () {

    },

    flash: function (column) {
      // lights up the clicked column
      // using animate() in jquery to implement the flashing for an interval of 2 seconds.
        var start = {
          opacity: '1',
          duration: 200
        };
        var stop = {
          opacity: '0.7',
        };
        column.animate(start).animate(stop);

        // plays the sound associated with the click column
        // Audio tags created dynamically but not appended as i added the autoplay option in the tag
        $('<audio autoplay src ="sounds/'+column.attr('class')+'.mp3"></audio>');

    },

};

$(document).ready(function(){
  console.log('script is linked');
  simon_says.addHandler();

});
