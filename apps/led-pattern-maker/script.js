(function() {

  /* Setup
    ---------------------------------------------- */

  var pixelCount = 48;

  var pixels = new Array(pixelCount); //create new array with 48 positions
  var colors = new Array(pixelCount);

  var numberRows = 6;
  var numberColumns = 8;

  var animating = null; //will be used to hold an interval reference (i.e. animation function)
  
  var loopSpeed = 500; //in milliseconds (speed of main loop)

  var sensorReading = 0;

  var selectedEffect = $('input:checked').val();

  $.each(pixels, function(i) { 
    pixels[i] = $('<div class="pixel"></div>'); //create the pixel elements
    pixels[i].appendTo('.wrapper'); //add them to the screen
  });

   /* Effects Selection
    ---------------------------------------------- */

  $('input').on('change', function() {
    selectedEffect = $(this).val();
    console.log("selected effect = " + selectedEffect);
  });

  /* Animation Loop
    ---------------------------------------------- */

  var loop = setInterval(function() { //simulate the arduino loop (always going!!)
 
    if(sensorReading > 0) { //if someone if front of sensor

      sparkle(sensorReading);

    } else {
      if(animating) {
        clearInterval(animating);
      }
    }

  }, loopSpeed);

  /* Main Show Function
    ---------------------------------------------- */

  function show() { //call show after updating colors
    $.each(colors, function(i) {
      pixels[i].css('background', colors[i]);
    });
  }

  /* Sensor Functions (Simulating Distance)
    ---------------------------------------------- */

  $('.sensor').mousemove(function(evt) {
    var offset = $(this).offset().top;
    var position = evt.pageY - offset;

    sensorReading = Math.floor(map(position, 0, 426, 0, 256));
  });

  $('.sensor').mouseleave(function(evt) {
    sensorReading = 0; //simulates no person standing in front of sensor
    //console.log("out of sensor view");
  });

  /* Animation Effects Functions
    ---------------------------------------------- */

  function sparkle(speed) {

    if(animating !== null) {
      clearInterval(animating);
      animating = null;
    }

    animating = setInterval(function() {
      setRandomPixels();
      show();
    }, speed);

  }

  function sweep(color) {

    var i = 0;

    //sweep forward

    // while(i < numberColumns) {
    //   console.log(i);
    //   $.each(colors, function(ix) {
    //     console.log(numberColumns
    //   });
    //   i++;
    // }

    // //then sweep back

    // while(i--) {
    //   console.log(i);
    //   $.each(colors, function(ix) {

    //   });
    // }
  }

  sweep('red');


  /* Color Setup Functions
    ---------------------------------------------- */

  function setRandomPixels() {
    $.each(colors, function(i) {
      colors[i] = 'rgb(' + getRandomNumber() + ',' + getRandomNumber() + ',' + getRandomNumber() + ')';
    });
  }

  /* Helper Functions (Utility Stuff)
    ---------------------------------------------- */

  function getRandomNumber() {
    var randomNumber = Math.floor(Math.random()*256); //get rand no in range of 0-255
    return randomNumber;
  }

  function map(value, in_min, in_max, out_min, out_max) {
    return (value-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;
  }


})();