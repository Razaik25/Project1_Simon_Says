//Declaring all the global variables
var $start = $('#start');
var $col1 = $('.one');
var $col2 = $('.two');
var $col3 = $('.three');
var $col4 = $('.four');

// Game Logic
// Declaring a object literal

var simon_says ={

    rounds: 0,              // no of rounds user plays
    //score: 0,               // current score of the user
    genSeqArr: [],          //array to generate sequence
    userSeqArr: [],         // array to keep track of user's pattern
    player: 1,              // Identify which player is playing
    start: false,
    move: 0,                // current move of the user


    startGame: function () {

      if(this.start === false) {
        this.addHandler();
        this.start = true;
      }
      this.showRound();
      this.newRound();
      this.rounds += 1;


    },

    initialize: function () {
      this.showRound();
      this.showPlayer();
      this.displayTime();
    },

    addHandler: function () {

      var that = this;

      // Add click event on start button
      $start.on('click', function() {
            console.log('game start');
            that.initialize();

      // Add click events to all four columns
            $col1.on('click', function () {
            that.light($col1,1,300);
            that.countClicks($col1.attr('value'));

            });

          $col2.on('click', function () {
            that.light($col2,1,300);
            that.countClicks($col2.attr('value'));

            });

          $col3.on('click', function () {
            that.light($col3,1,300);
            that.countClicks($col3.attr('value'));

            });

          $col4.on('click', function () {
            that.light($col4,1,300);
            that.countClicks($col4.attr('value'));

           });

        });

    },

    newRound: function () {

		this.genSeqArr.length=0;
		this.userSeqArr.length=0;
		this.move=0;
		this.start=true;
    this.displayPattern();


    },

    countClicks: function (id) {
      this.userSeqArr.push(id);
      this.matchPattern(id);

    },

    displayPattern: function () {
      //random number between 1 and 4 as there are 4 columns.
        var that = this;
        for (var i = 0; i < this.rounds; i++) {
            var randomNumber = Math.floor(1 + (Math.random()*4));
            that.genSeqArr.push(randomNumber);
        }
        console.log(that.genSeqArr);

        // $.each(that.genSeqArr, function (index,value) {
          // if(value === 1){
          //   var interval1 = setInterval(function () {
          //         that.lightSound($col1);
          //         count++;
          //         if (count >= that.genSeqArr.length) {
          //           clearInterval(interval1);
          //         }
          //       },600);
          // } else if (value === 2){
          //   var interval2 = setInterval(function () {
          //       that.lightSound($col2);
          //       count++;
          //       if (count >= that.genSeqArr.length) {
          //         clearInterval(interval2);
          //       }
          //     },600);
          //
          // } else if (value ===3){
          //   var interval3 = setInterval(function () {
          //        that.lightSound($col3);
          //        count++;
          //        if (count >= that.genSeqArr.length) {
          //          clearInterval(interval3);
          //        }
          //      },600);
          //
          // } else if (value ===4){
          //   var interval4 = setInterval(function () {
          //           that.lightSound($col4);
          //           count++;
          //           if (count >= that.genSeqArr.length) {
          //             clearInterval(interval4);
          //           }
          //         },600);
          // }
        //   switch (value) {
        //     case 1:
        //       var interva1l = setTimeout(function () {
        //       that.lightSound($col1);
        //       },800);
        //       count++;
        //       break;
        //
        //     case 2:
        //       var interval2 = setTimeout(function () {
        //       that.lightSound($col2);
        //       },800);
        //       count++;
        //       break;
        //
        //    case 3:
        //       var interval3 = setTimeout(function () {
        //       that.lightSound($col3);
        //        },800);
        //       count++;
        //       break;
        //
        //    case 4:
        //       var interval4 = setTimeout(function () {
        //         that.lightSound($col4);
        //        },800);
        //       count++;
        //       break;
        //
        //   default:
        // }

      // });

      for(var j = 0; j < that.genSeqArr.length; j++){
        switch (that.genSeqArr[j]) {
          case 1:
            setTimeout(getlight1,900 * (j + 1));
            // console.log(j);
            // console.log($col1);
          break;
          case 2:
            setTimeout(getlight2,900 * (j + 1));
              // console.log(j);
              // console.log($col2);
          break;
          case 3:
            setTimeout(getlight3,900 * (j + 1));
              // console.log(j);
              // console.log($col3);
          break;
          case 4:
            setTimeout(getlight4,900 * (j + 1));
              // console.log(j);
              // console.log($col4);
          break;
          default:

        }

      }

      function getlight1() {
        that.light($col1,1,400);
      }

      function getlight2() {
        that.light($col2,1,400);
      }

      function getlight3() {
        that.light($col3,1,400);
      }

      function getlight4() {
        that.light($col4,1,400);
      }

    },

    matchPattern: function (id) {

      if( id === this.genSeqArr[this.move]){
        this.move++;
      } else {
        // do something
      }
      var that = this;
      if(this.move === this.genSeqArr.length) {
        this.rounds++;
        this.showRound();
        setTimeout(function(){
				that.newRound();
			   },1000);
      }


    },

    endGame: function () {


    },

    showRound: function () {
      $('#score').text('Round: '+ this.rounds);

    },

    showPlayer: function () {
      $('#player').text('Player: '+ this.player);

    },

    displayTime: function () {
      counter = 0;
      //var i = 0;
      //$('#timer').text('');
      var timer = setInterval(gettime, 1000);
      function gettime(){
        counter++;
        //i++;
        $('#timer').text('Time: ' + counter);

      }

    },

    light: function (column,count,time) {
      var that = this; // storing the current instance of this i.e the game object

      // lights up and generates sounds for the clicked column
      // column takes in the value of the column clicked
      // count is no of times the column has to flash
      // time represents the time for which the column will flash
      // using animate() in jquery to implement the flashing for an interval
        if(count > 0) {
          that.sound(column);
          var start = {
            opacity: '1',
            duration: 50
          };
          var stop = {
            opacity: '0.6',
            duration: 300
          };
          column.stop().animate(start).animate(stop);
        }
        // call the light function again if the count is more than 0
        if(count >0) {
          setTimeout(function () {
            that.light(column,count,time);
          }, time);
          // reducing the count eveytime function is called
          count --;
        }
    },

  sound: function(column) {

    // plays the sound associated with the click column
    // Audio tags created dynamically but not appended as i added the autoplay option in the tag
    $('<audio autoplay src ="sounds/'+column.attr('class')+'.mp3"></audio>');

  }

};

$(document).ready(function(){
  console.log('script is linked');
  //simon_says.startGame()
    simon_says.displayPattern();

});
