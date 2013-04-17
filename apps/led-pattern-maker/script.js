(function() {

  /* Setup
    ---------------------------------------------- */

  var pixelCount     = 48;
  var pixels         = new Array(pixelCount); //create new array with 48 positions
  var colors         = new Array(pixelCount);
  var numberRows     = 6;
  var numberColumns  = 8;
  var animating;      //will be used to hold an interval reference (i.e. animation function)
  var loopSpeed      = 500; //in milliseconds (speed of main loop)
  var sensorReading  = 0;
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

      if(!animating) { //if we're not already in the middle of animating something
        //check to see which effect type we're using
        switch(selectedEffect) {
          case 'sparkles':
            sparkle(sensorReading);
            break;
          case 'sweep':
            sweep(sensorReading);
            break;
        }
      }
    } else {
      if(animating) {
        stopAnimating();
        hide();
      }
    }

  }, loopSpeed);

  /* Show and Hide Off Functions
    ---------------------------------------------- */

  function show() { //call show after updating colors
    $.each(colors, function(i) {
      pixels[i].css('background', colors[i]);
    });
  }

  function hide() { //turn off all pixels
    $.each(colors, function(ix) {
      colors[ix] = 'rgb(0,0,0)';
    });
    show();
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

    if(animating) {
      stopAnimating();
    }

    animating = setInterval(function() {
      setRandomPixels();
      show();
    }, speed);

  }

  function sweep(speed, column) {
    var i = (column) ? column: 0;

    animating = setTimeout(function() {
      hide();
      for(j = i; j < colors.length; j+=numberColumns) {
        colors[j] = 'rgb(255,0,0)';
      }
      show();
      i++;
      if(i <= numberColumns) {
        sweep(speed, i);
      } else {
        hide();
        if(animating) {
          stopAnimating();
        }
      }
    }, speed);
  }

  /* Color Setup Functions
    ---------------------------------------------- */

  function setRandomPixels() {
    $.each(colors, function(i) {
      colors[i] = 'rgb(' + getRandomNumber() + ',' + getRandomNumber() + ',' + getRandomNumber() + ')';
    });
  }

  /* Helper Functions (Utility Stuff)
    ---------------------------------------------- */

  function stopAnimating() {
    clearInterval(animating);
    animating = null;
  }

  function getRandomNumber() {
    var randomNumber = Math.floor(Math.random()*256); //get rand no in range of 0-255
    return randomNumber;
  }

  function map(value, in_min, in_max, out_min, out_max) {
    return (value-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;
  }


})();