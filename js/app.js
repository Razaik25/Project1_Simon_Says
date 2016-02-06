
//Declaring all the global variables
var $start = $('#start');
var $col1 = $('.one');
var $col2 = $('.two');
var $col3 = $('.three');
var $col4 = $('.four');
var myTime;
var $result = $('#result');

// Game Logic
// Declaring a object literal
var simon_says = {

    rounds: 1,       // no of rounds user plays
    score: 0,        // current score of the user
    genSeqArr: [],   //array to generate sequence lighting/sounds pattern
    userSeqArr: [],  // array to keep track of user's pattern
    player: 1,
    move: 0,          //current move of the user
    start: false,     // to control when the displayPattern should be displayed


    startGame: function() {

      //Starts the game
      this.rounds = 1;
      this.addHandler();
      this.addHandlerCol();
      this.newRound();
      $result.text('');

    },

    newRound: function () {

      // Resets the variables as new round begins
      this.genSeqArr =[];
      this.userSeqArr =[];
      if(this.start) {
        this.showRound();
        //this.showPlayer();
        this.displayPattern();
      }
      // reset the current user move to zero
      this.move = 0;
    },

    init: function () {

      // initialize the game
      this.showRound();
      this.showPlayer();
      this.displayTime();

    },

    showRound: function () {

      // shows the current round number
     $('#round').fadeOut(500);
     $('#round').text('Round: '+ this.rounds);
     $('#round').fadeIn(500);

    },

    showPlayer: function () {

      // shows the current player
     $('#player').text('Player: '+ this.player);

    },

    clearParameter: function () {
      //clear player, round and timer
      $('#round').text('');
      $('#player').text('');
      stopTimer();

      function stopTimer() {
        clearTimeout(myTime);
        $('#timer').text('');
      }
      $result.text('Game Ends! Nice Try!');

    },

    addHandler: function () {

      // add click evnts on start buttons and col no1 to col no4
      // capturing the current instance of this
      var that = this;
      $start.on('click', function() {
        console.log('game start');
        that.displayPattern();
        that.start = true;
        //console.log(simon_says.start);
        that.init();
        });

    },

    addHandlerCol: function () {

      // Add click event handlers for all the four columns
      var that = this;
      $col1.on('click', function () {

          that.flash($col1,1,300);
          that.countClicks($col1.attr('value'));


        });

        $col2.on('click', function () {

          that.flash($col2,1,300);
          that.countClicks($col2.attr('value'));

        });

        $col3.on('click', function () {

          that.flash($col3,1,300);
          that.countClicks($col3.attr('value'));

        });

        $col4.on('click', function () {

          that.flash($col4,1,300);
          that.countClicks($col4.attr('value'));

        });

    },

    endGame: function () {

      //turn event hadlers off of all the columns off
      var that = this;
      $('.col').off();

      // get the column that was supposed to be clicked
      var $correctCol = this.genSeqArr[this.move];
      switch ($correctCol) {
        case 1:
          $correctCol = $col1;
          break;

       case 2:
          $correctCol = $col2;
          break;
      case 3:
          $correctCol = $col3;
          break;
      case 4:
          $correctCol = $col4;
          break;

        default:

      }

      //flash the column that should have been pressed 3 times
      setTimeout(function(){
			     that.flash($correctCol ,3,300);
		       },500);

      that.clearParameter();

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
          opacity: '0.6',
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
    var that = this; // catching the current instance of this
     for (var i = 0; i < this.rounds; i++) {
         var randomNumber = Math.floor(1 + (Math.random()*4));
         that.genSeqArr.push(randomNumber);
     }

     // Calling the flash function foe each of the elements of generated sequence array
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

        // Display the seconds when the user clicks on start button
        counter = 0;
        myTime = setInterval(gettime, 1000);
        function gettime(){
          counter++;
          $('#timer').text('Time: ' + counter);
        }

    },

    countClicks: function (value) {

      //Gets the value of the column that was clicked and pushs it into userSeqArr Array
      this.userSeqArr.push(parseInt(value));
      // Call the match pattern function to compare the generated sequence with user clicks
      this.matchPattern(parseInt(value));

    },

    matchPattern: function (value) {

      // function that checks if the elements in genSeqArr are same as userSeqArr
     var  that = this;
     //if data attribute of value of the clicked column is same as the element in the genSeqArr
     //if it is not
     if(value !== this.genSeqArr[parseInt(that.move)]){

        that.endGame();

      }else{

        //increment the current user move
        this.move++;

      }

    // if all user has completed the whole  generated sequence
    if(this.move === this.genSeqArr.length){

      // increment the round
      this.rounds++;
      //increment level, display it, disable the pads wait 1 second and then reset the game
      //this.displayLevel();
      //this.active=false;

      // Give a 1 second delay until the start of the next round
      setTimeout(function(){
        that.newRound();
      },1000);
    }

  },

};

$(document).ready(function(){
  console.log('script is linked');
  simon_says.startGame();
});
