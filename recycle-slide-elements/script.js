$(document).ready(function() {

  console.log("loaded");

  var slide = $('.slide');
  var prev  = $('button:contains("PREV")');
  var next  = $('button:contains("NEXT")');

  var spacing   = 20;
  var itemWidth = 140;
  
  var multiple  = 5; // <- *offscreen* *offscreen* [ *visible* ] *offscreen* *offscreen* ->

  var results = new Array(10);

  var img_path = '../img/';

  var container = $('#carousel');

  var currentSet = 1;

  var noItemsInView = Math.floor(container.width()/(itemWidth+spacing));
  var itemViewWidth = noItemsInView*(itemWidth+spacing)-spacing;
  var numberOfItems = noItemsInView * multiple;

  var firstInViewIx = noItemsInView*2;

  //generate total amount of elements up-front, based on screen real estate
  for(var i = 0; i < numberOfItems; i++) {
    slide.append('<li id="'+i+'" class="item" style="margin-right:'+spacing+'px"><img src=""></li>');
  }

  var items = $('.item');

  var totalItemsInRange = items.length;
  var pixelSlideAmount  = items.outerWidth(true)*noItemsInView;

  var totalSets = Math.ceil(results.length / noItemsInView);

  $('.output').html(currentSet + ' of ' + totalSets);

  slide.css('margin-left', -pixelSlideAmount*2);

  function goSlide(dir) {
    var nextSet = (dir) ? currentSet+1: currentSet-1;
    if(nextSet > 0 && nextSet <= totalSets) {
      slide.animate({
        'margin-left': (dir) ? '-=' + pixelSlideAmount: '+=' + pixelSlideAmount
      }, 500, 'linear', function() {
        var range = (dir) ? items.slice(0, noItemsInView): items.slice(items.length-noItemsInView, items.length);
        range.remove();
        items = $('.item');
          if(dir) {
            range.insertAfter(items.last());
          } else {
            range.insertBefore(items.first());
          }
          slide.css('margin-left', -pixelSlideAmount*2);
          currentSet = nextSet;

          $('.output').html(currentSet + ' of ' + totalSets);


          console.log("first in view => " + firstInViewIx);
      });
    }
  }

  function showRange() {
    var rangeStart = currentSet-1,
        rangeEnd   = rangeStart + noItemsInView-1;

        console.log(rangeStart);
        console.log(rangeEnd);

    // $.each(items, function(ix, item) {
    //   if(ix >= totalItemsInRange || ix > results.length) {
    //     console.log(ix);
    //     return;
    //   } else {
    //     $(item).find('img').attr('src', results[ix]);
    //   }
    // });
  }

  function getDataRange() {
    //totalItemsInRange*currentSet
  }

  //Controls

  prev.click(function() {
    goSlide(0);
  });

  next.click(function() {
    goSlide(1);
  });

  $.each(results, function(ix) {
    var path = img_path + 'art' + (ix+1) + '.png';
    results[ix] = path;
  });

  showRange();

});