//Declaring all the global variables
var $start = $('#start');
var $col1 = $('.one');
var $col2 = $('.two');
var $col3 = $('.three');
var $col4 = $('.four');


// Game Logic
// Declaring a object literal

var simon_says = {

    rounds: 1,       // no of rounds user plays
    score: 0,        // current score of the user
    genSeqArr: [],   //array to generate sequence lighting/sounds pattern
    userSeqArr: [],  // array to keep track of user's pattern
    player: 1,
    move: 0,
    start: false,


    startGame: function() {

      this.addHandler();  
      if(this.start === true){
        simon_says.displayPattern();
      }
      this.newRound();


    },

    addHandler: function () {

      // add click evnts on start buttons and col no1 to col no4
      $start.on('click', function() {
        console.log('game start');
        simon_says.start = true;
        simon_says.init();
        $col1.on('click', function () {
            console.log('1');
            simon_says.flash($col1,1,300);
            simon_says.countClicks($col1.attr('value'));
            simon_says.move++;

          });

          $col2.on('click', function () {
            console.log('2');
            simon_says.flash($col2,1,300);
            simon_says.countClicks($col2.attr('value'));
            simon_says.move++;

          });

          $col3.on('click', function () {
            console.log('3');
            simon_says.flash($col3,1,300);
            simon_says.countClicks($col3.attr('value'));
            simon_says.move++;

          });

          $col4.on('click', function () {
            console.log('4');
            simon_says.flash($col4,1,300);
            simon_says.countClicks($col4.attr('value'));
            simon_says.move++;

          });
        });

    },

    init: function () {
      // initialize the game
      this.showRound();
      this.showPlayer();
      this.displayTime();

    },

    showRound: function () {
     $('#score').text('Round: '+ this.rounds);

    },

    showPlayer: function () {
     $('#player').text('Player: '+ this.player);

    },

    newRound: function () {
      this.genSeqArr =[];
      this.userSeqArr =[];

    },

    endGame: function () {

    },

    flash: function (column,count,time) {
      // lights up the clicked column
      // using animate() in jquery to implement the flashing for an interval of 2 seconds.
      var that = this;
      if(count >0){

        // plays the sound associated with the click column
        // Audio tags created dynamically but not appended as i added the autoplay option in the tag
        $('<audio autoplay src ="sounds/'+column.attr('class')+'.mp3"></audio>');
        var start = {
          opacity: '1',
          duration: 200
        };
        var stop = {
          opacity: '0.7',
        };
        column.animate(start).animate(stop);
      }
      // call the flash function again if the count is more than 0
      if(count >0) {
          setTimeout(function () {
            that.flash(column,count,time);
          }, time);
          // reducing the count eveytime function is called
          count --;
        }
    },

    displayPattern: function() {
    //random number between 1 and 4 as there are 4 columns.
    var that = this;
     for (var i = 0; i < this.rounds; i++) {
         var randomNumber = Math.floor(1 + (Math.random()*4));
         that.genSeqArr.push(randomNumber);
     }
     console.log(that.genSeqArr);

     for(var j = 0; j < that.genSeqArr.length; j++){
       switch (that.genSeqArr[j]) {
         case 1:
          setTimeout(getlight1,900 * (j + 1));

          break;
          case 2:
          setTimeout(getlight2,900 * (j + 1));

          break;
          case 3:
          setTimeout(getlight3,900 * (j + 1));

          break;
          case 4:
          setTimeout(getlight4,900 * (j + 1));

          break;
          default:

        }

      }

      function getlight1() {
        that.flash($col1,1,400);
      }

      function getlight2() {
        that.flash($col2,1,400);
      }

      function getlight3() {
        that.flash($col3,1,400);
      }

      function getlight4() {
        that.flash($col4,1,400);
      }

    },

    displayTime: function () {
      counter = 0;
      //$('#timer').text('');
      var timer = setInterval(gettime, 1000);
      function gettime(){
        counter++;
        $('#timer').text('Time: ' + counter);

      }
    },

    countClicks: function(value) {
      this.userSeqArr.push(value);
      this.matchPattern(value);

    },

    matchPattern: function (value) {

    console.log(this.userSeqArr);
    if( value === this.genSeqArr[this.genSeqArr.length-1]) {
      this.move++;
      this.rounds++;
      this.newRound();

    } else {
      // if the user does not match the pattern
      this.endGame();
    }

   }

};

$(document).ready(function(){
  console.log('script is linked');
  simon_says.startGame();

});

function checkArrEqual(arr1,arr2) {
  if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
