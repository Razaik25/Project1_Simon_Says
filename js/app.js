
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

    rounds: 1,                      // no of rounds user plays
    score: 0,                       // keep the score of the current user
    genSeqArr: [],                  //array to generate sequence lighting/sounds pattern
    userSeqArr: [],                 // array to keep track of user's pattern
    playerTurn: '',                 // keep track if player 1 is playing or player 2
    move: 0,                        //current move of the user
    start: false,                   // to control when the displayPattern should be displayed  score: 0,                       //
    player1Score: 0,                // store player 1 score
    player2Score: 0,                // store player 2 score
    player1Time: 0,                 // store player 1 time
    player2TIme:0,                  // store player 2 time
    playerOne: 'Player1',           // Player 1
    playerTwo: 'Player2',           // Player 2

    startGame: function() {
      //Starts the game
      this.rounds = 1;
      this.addHandler();
      this.addHandlerCol();
      this.newGame();

    },

    newGame: function () {
      //called everytime a new game begins
      this.rounds = 1;
      this.newRound();

    },

    newRound: function () {
      // Resets the variables as new round begins
      this.genSeqArr =[];
      this.userSeqArr =[];
      if(this.start) {
        this.showRound();
        this.displayPattern();
        this.userScore();
        this.showScore();
      }
      // reset the current user move to zero
      this.move = 0;

    },

    init: function () {
      // initialize the game
      if (this.playerTurn === '') {
        this.playerTurn = this.playerOne;
      } else if (this.playerTurn === this.playerOne) {
        this.playerTurn = this.playerTwo;
      } else if (this.playerTurn === this.playerTwo) {
        this.playerTurn = this.playerOne;
      }
      this.showRound();
      this.showPlayer();
      this.userScore();
      this.displayTime();
      //$result.text('');
      $result.hide();
      $('#whowon').hide();
      $('#wholost').hide();
      $('#winner').hide();
      $('#loser').hide();
      //$('#whowon').hide();

    },

    showRound: function () {
      // shows the current round number
     $('#round').fadeOut(500);
     $('#round').text('Round: '+ this.rounds);
     $('#round').fadeIn(500);

    },

    showScore: function () {
    // shows the current round number
     $('#score').fadeOut(500);
     $('#score').text('Score: '+ this.score);
     $('#score').fadeIn(500);
     if (this.playerTurn === 'Player1'){
       $('#score').text('Player1 Score: '+ this.score);
     } else {
       $('#score').text('Player2 Score: '+ this.score);
     }

    },

    showPlayer: function () {
    // shows the current player
     $('#player').text('Player: '+ this.playerTurn);

    },

    clearParameter: function () {
    //clear player, round and timer
      $('#round').text('');
      $('#player').text('');
      $('#score').text('');
      stopTimer();

      time = stopTimer();
      // Updatedating player score
      if (this.playerTurn === this.playerOne) {
        this.player1Time = time;
      } else if (this.playerTurn === this.playerTwo) {
        this.player2TIme = time;
      }

      function stopTimer() {
        clearTimeout(myTime);
        $('#timer').text('');
        return myTime;
      }

    },

    addHandler: function () {
      // add click evnts on start buttons and col no1 to col no4
      // capturing the current instance of this
      var that = this;
      $start.on('click', function() {
        console.log('game start');
        //that.displayPattern();
        that.start = true;
        //console.log(simon_says.start);
        that.init();
        that.newGame();
        $('#start').hide();
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
      /*$('.col').off();
      //disablecols();*/

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
      that.whoWon();

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

    userScore: function () {
      // Calculating the score
      if(this.rounds === 1) {
        this.score = 1;
      } else {
        this.score = this.score * this.rounds;
      }

      if (this.playerTurn === this.playerOne) {
        this.player1Score = this.score;
      } else if (this.playerTurn === this.playerTwo) {
        this.player2Score = this.score;
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
     //To check if data attribute of value of the clicked column is same as the element in the genSeqArr
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

      // Give a 1 second delay until the start of the next round
      setTimeout(function(){
        that.newRound();
      },1000);
    }

  },

  whoWon: function () {
    // Determine who won out of two players
    if(this.playerTurn === 'Player2'){

      if(this.player1Score > this.player2Score){
        //player one won
        animateEnd();
        $('#whowon').text('Player one wins- '+'Score: '+ this.player1Score);
        $('#wholost').text('Player two Score: '+ this.player2Score);
        $('#whowon').show();
        $('#wholost').show();
        StartPosition2();

      } else if(this.player2Score > this.player1Score) {
        //player two won
        animateEnd();
        $('#whowon').text('Player two wins- '+'Score: '+ this.player2Score);
        $('#wholost').text('Player one Score: '+ this.player1Score);
        $('#whowon').show();
        $('#wholost').show();
        StartPosition2();

      } else { // if score is same check time
        if(this.player1Time > this.player2TIme) {
          // player  two won
          animateEnd();
          $('#whowon').text('Player two wins- '+'Score: '+ this.player2Score + ' Time: '+ this.player2TIme);
          $('#wholost').text('Player one Score: '+ this.player1Score + ' Time: '+ this.player1Time);
          $('#whowon').show();
          $('#wholost').show();
          StartPosition2();

        } else {
          // player one won
          animateEnd();
          $('#whowon').text('Player one wins- '+'Score: '+ this.player1Score + ' Time: '+ this.player1Time);
          $('#wholost').text('Player two Score: '+ this.player2Score + ' Time: '+ this.player2Time);
          $('#whowon').show();
          $('#wholost').show();
          StartPosition2();

        }
      }
    } else {
      // Have to change this to show which player turn and when to end
      $result.text(this.playerTwo +'\'s Turn');
      this.showScore();
      $result.show();
      StartPosition1();


    }
 }

};

$(document).ready(function(){
  console.log('script is linked');
  simon_says.startGame();

});

//controls animatation at the end of the game
function animateEnd() {

  $('#winner').animate({ left: "10%", top: "10%" }, 'slow').animate({
                 left: "819px", top: "191px", opacity: 1 }, 500 );
  $('#winner').show();

  $('#loser').animate({ left: "10%", top: "10%" }, 'slow').animate({
                 left: "822px", top: "306px", opacity: 1 }, 500 );
  $('#loser').show();

}


// Both the functions below control start button position.
function StartPosition1 () {
  $('#start').css({
              'position': 'absolute',
              'top': '319px',
              'left': '868px',
  });
  $('#start').text('Start');
  $('#start').show();

}

function StartPosition2 () {
  $('#start').css({
              'position': 'absolute',
              'top': '348px',
              'left': '868px',
              'width': '153px'
  });
  $('#start').text('Play Again???');
  $('#start').show();

}
