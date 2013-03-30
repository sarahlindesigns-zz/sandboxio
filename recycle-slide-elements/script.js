$(document).ready(function() {

  //elements

  var carousel = $('#carousel'); //container element dictates all the sizing characteristic
  var slide    = carousel.find('.slide');
  var items;

  var prev  = $('button:contains("PREV")'); //XXX: temp controls
  var next  = $('button:contains("NEXT")'); //XXX: temp controls

  //configuration

  var spacing   = 20;
  var itemWidth = 140;
  
  /*  [][][], [][][] <-Offleft | [inview] [inview] [inview]  | Offright-> [][][], [][][]  */

  var multiple  = 5; 

  var results = new Array(10); //XXX: for testing
  var img_path = '../img/';   //XXX: for testing

  var currentSet = 1;
  var itemViewWidth;
  var totalNoElements;
  var noItemsInView;
  var firstInViewIxl;
  var totalItemsInRange;
  var pixelSlideAmount;
  var totalSets;

  //TODO: create a custom carousel element in memory in the beginning of the script, 
  //      and then just clone it to produce the necessary amount for carousel's physical size

  /*
   *  Initialize the carousel
   */

  self.init = function () {

    //how many items fit into the view?
    noItemsInView = Math.floor(carousel.width() / (itemWidth+spacing));

    //see if we can squeeze one more, by subtracting the last right-margin and recalculating
    if( (noItemsInView * (itemWidth + spacing)) + itemWidth < carousel.width() ) {
      itemsWidth += itemWidth;
      noItemsInView++;
    }

    console.log('items in view => ' + noItemsInView);

    itemViewWidth = noItemsInView*(itemWidth+spacing)-spacing;
    totalNoElements = noItemsInView * multiple;

    firstInViewIx = noItemsInView*2;

    //generate total amount of elements up-front, based on screen real estate
    for(var i = 0; i < totalNoElements; i++) {
      slide.append('<li id="'+i+'" class="item" style="margin-right:'+spacing+'px"><img src=""></li>');
    }

    items = $('.item');

    totalItemsInRange = items.length;
    pixelSlideAmount  = items.outerWidth(true)*noItemsInView;

    totalSets = Math.ceil(results.length / noItemsInView);

    $('.output').html(currentSet + ' of ' + totalSets); //XXX: print out the set info

    slide.css('margin-left', -pixelSlideAmount*2); //set the intial slide position

    //updateCarouselData();
  }

  function goSlide(dir) {//slide the carousel by direction

    var nextSet = (dir) ? currentSet+1: currentSet-1; //indicate the new pagination set

    if(nextSet > 0 && nextSet <= totalSets) { //see if the new set would be within range

      slide.animate({ //animate the slide element, which moves our list items

        'margin-left': (dir) ? '-=' + pixelSlideAmount: '+=' + pixelSlideAmount

      }, 500, 'linear', function() { //when complete, update the dom/data, and make any necessary adjustments

        //get range of elements to chop off and move
        var range = (dir) ? items.slice(0, noItemsInView): items.slice(items.length-noItemsInView, items.length);
        
        //remove the selected range from the dom
        range.remove();

        //update the items array after the removal
        items = $('.item');

        //now append the chopped off items either before or after items array, depeding our direction
        if(dir) {
          range.insertAfter(items.last());
        } else {
          range.insertBefore(items.first());
        }

        //we also need to update the items array after the insertion
        items = $('.item');

        //since we altered the dom, we need to update the slide position by adjusting the left margin
        slide.css('margin-left', -pixelSlideAmount*2);

        //now we update our global pagination set
        currentSet = nextSet;

        //print and log the results for development
        $('.output').html(currentSet + ' of ' + totalSets);

        //finally, we update the displayed data within our item elements
        //updateCarouselData(dir);

      });
    }
  }

  function updateCarouselData(dir) {
    if(typeof(dir) !== 'undefined') {
      console.log(dir);
    } else {
      for(var j = 0; j < items.length; j++) {
        $(items[j + firstInViewIx]).find('img').attr('src', results[j]);
      }
    }
  }

  function getDataRange(set) {
    var startIx = set - 1,
        endIx   = startIx + noItemsInView-1;
    return {
      start: startIx,
      end  : endIx
    };
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

  self.init();

});